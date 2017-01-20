/**
 * Upload ipa/apk to Testfairy
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');
    var fs = require('fs');
    var request = require('request');
    var filePathBase = './dist/' + args.appPackage + '.' + args.appVersion;
    var filePathIOS = filePathBase + config.dist.extension('ios');
    var filePathAndroid = filePathBase + config.dist.extension('android');
    var bothPlatforms = args.bothPlatforms ? args.bothPlatforms : true;

    //config testfairy api_key
    config.dist.testfairy.api_key = args.apiKeyTestfairy ? args.apiKeyTestfairy : config.dist.testfairy.api_key;
    
    return function () {
        log('Subiendo a Testfairy con api_key: ' + config.dist.testfairy.api_key);
        if (bothPlatforms) {
            uploadIOSToTestFairy();
        } else {
            uploadAPKToTestFairy();
        }
    };

    function uploadIOSToTestFairy() {
        // TestFairy config
        var configTestFairy = config.dist.testfairy;
        configTestFairy.file = fs.createReadStream(filePathIOS);

        var form = configTestFairy;
        var endpoint = 'https://app.testfairy.com/api/upload/';

        request.post(
            {
                url: endpoint,
                formData: form
            },
            function (err, httpResponse, body) {
                if (err != null) {
                    log('Ha ocurrido un error al subir el IPA:' + err);
                } else {
                    log('uploaded to testfairy: ' + filePathIOS);
                    body = JSON.parse(body.replace(/\\/g, ''));
                    log('testfairy response: ' + JSON.stringify(body));
                    var platform = /^.*\.apk$/.test(body['instrumented_url']) ? 'android' : 'ios';
                    var message = 'A new version is available of *' + body['app_name'] +
                        '* (' + body['app_version'] + '): ' + '<' + body['instrumented_url'] +
                        '|Click here> to download it!';
                    sendMessageToSlack(message, platform);
                }
                uploadAPKToTestFairy();
            }
        );
    }

    function uploadAPKToTestFairy() {
        // TestFairy config
        var configTestFairy = config.dist.testfairy;
        configTestFairy.file = fs.createReadStream(filePathAndroid);

        var form = configTestFairy;
        var endpoint = 'https://app.testfairy.com/api/upload/';

        request.post(
            {
                url: endpoint,
                formData: form
            },
            function (err, httpResponse, body) {
                if (err != null) {
                    log('Ha ocurrido un error:' + err);
                } else {
                    log('uploades to testfairy: ' + filePathAndroid);
                    body = JSON.parse(body.replace(/\\/g, ''));
                    log('testfairy response: ' + JSON.stringify(body));
                    var platform = /^.*\.apk$/.test(body['instrumented_url']) ? 'android' : 'ios';
                    var message = 'A new version is available of *' + body['app_name'] +
                        '* (' + body['app_version'] + '): ' + '<' + body['instrumented_url'] +
                        '|Click here> to download it!';
                    sendMessageToSlack(message, platform);
                }
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
