/**
 * Build in PhoneGap Build and upload ipa/apk to Testfairy
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');
    var pgBuild = require('phonegap-build-api');
    var fs = require('fs');
    var request = require('request');
    var waiting = 15000;

    return function () {
        var appId = args.phoneGapBuildAppId ? args.phoneGapBuildAppId : config.dist.phoneGapBuild.appId;
        var endpoint = '/apps/' + appId;
        var env = config.dist.ensure.environment(args.env, args.debugmode);

        var pgbPlatformAndroid = args.pgbPlatformAndroid ? true : false;
        var pgbPlatformiOS = args.pgbPlatformiOS ? true : false;
        var platforms = [];
        if (pgbPlatformAndroid) {
            platforms.push('android');
        }
        if (pgbPlatformiOS) {
            platforms.push('ios');
        }
        if (!pgbPlatformAndroid && !pgbPlatformiOS) {
            platforms.push('android');
            platforms.push('ios');
        }

        pgBuild.auth({token: config.dist.phoneGapBuild.authToken}, function (e, api) {
            // Using tap plugin to get absolute path of zipped package file
            gulp.src(config.path.dist + '*.zip').pipe(plugins.tap(function (file, t) {
                // Options to call to PhoneGap Build API
                var options = {
                    form: {
                        data: {
                            debug: config.dist.phoneGapBuild.debug[env],
                            keys: config.dist.phoneGapBuild.keys[env]
                        },
                        file: file.path
                    }
                };
                // Upload distribution app to PhoneGap Build
                api.put(endpoint, options, function() {
                    log('upload to PhoneGap Build done');
                    // Build android and ios platforms and upload to TestFairy
                    buildAndUploadAllToTestingPlatform(api, endpoint, platforms, waiting);
                });
                return t;
            }));
        }
      );
    };

    /**
     * Upload artefacts (apk, ipa) to testing platform
     */
    function buildAndUploadAllToTestingPlatform(api, endpoint, platforms, waiting) {
        // Ask PhoneGap Build service to build all platform
        api.post(endpoint + '/build', function() {
            // Polling to downdload artefacts (apk, ipa)
            for (var i = 0; i < platforms.length; i++) {
                uploadToTestingPlatform(api, endpoint, platforms[i], waiting);
            }
        });
    }

    /**
     * Download last artefact (apk, ipa) built in PhoneGap Build and upload to TestFairy
     */
    function uploadToTestingPlatform(api, endpoint, platform, waiting) {
        // Polling until is built the last platform artefact
        var polling = true;
        var download = setInterval(function() {
            api.get(endpoint, function (ee, data) {
                var status = !ee && data ? data.status[platform] : null;
                // If is available last platform build download it and upload to TestFairy
                log('status ' + platform + ' : ' + status);
                if (status === 'complete' && polling) {
                    polling = false;
                    clearInterval(download);
                    var filePath = config.path.dist + data.package + '.' + data.version +
                        config.dist.extension(platform);
                    var write = api.get(endpoint + '/' + platform).pipe(fs.createWriteStream(filePath));
                    // When finish download to local the platform artefact, then upload it to TestFairy
                    write.on('finish', function () {
                        uploadToTestFairy(fs, filePath);
                    });
                }
                else {
                    log('Cannnot download application[' + platform + ']: ' + status);
                    log('Waiting for ' + String(waiting / 1000) + ' seconds...');
                }
            });
        }, waiting);
    }

    function uploadToTestFairy(fs, filePath) {
        // TestFairy config
        var configTestFairy = config.dist.testfairy;
        configTestFairy.file = fs.createReadStream(filePath);

        var form = configTestFairy;
        var endpoint = 'https://app.testfairy.com/api/upload/';

        request.post(
            {
                url: endpoint,
                formData: form
            },
            function (err, httpResponse, body) {
                log('upload to testfairy: ' + filePath);
                body = JSON.parse(body.replace(/\\/g, ''));
                log('testfairy response: ' + JSON.stringify(body));
                var platform = /^.*\.apk$/.test(body['instrumented_url']) ? 'android' : 'ios';
                var message = 'A new version is available of *' + body['app_name'] +
                    '* (' + body['app_version'] + '): ' + '<' + body['instrumented_url'] +
                    '|Click here> to download it!';
                sendMessageToSlack(message, platform);
            }
        );
    }

    function sendMessageToSlack(message, platform) {
        log('sending message to slack...');

        var payload = {};
        payload.text = message;
        payload.username = platform;
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        payload.icon_url = 'https://slack.com/img/icons/app-57.png';
        payload.icon_emoji = platform === 'android' ? ':android:' : ':ios:';
        log('platform: ' + platform);
        log('icon_emoji: ' + payload.icon_emoji);
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

        var form = {
            'payload': JSON.stringify(payload)
        };

        var slackToken = args.slackToken ? args.slackToken : config.dist.slack.token;
        var endpoint = 'https://hooks.slack.com/services/' + slackToken;
        request.post(
            {
                url: endpoint,
                formData: form
            },
            function (err, httpResponse, body) {
                log('response slack: ' + body);
            }
        );
    }

};
