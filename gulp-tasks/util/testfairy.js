/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
module.exports = function uploadToTestFairy(config, filePath) {
    var log = require('log');
    var slack = require('slack');
    var fs = require('fs');
    var request = require('request');

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
            if (err != null) {
                log('Ha ocurrido un error:' + err);
            } else {
                log('uploades to testfairy: ' + filePath);
                body = JSON.parse(body.replace(/\\/g, ''));
                log('testfairy response: ' + JSON.stringify(body));
                var platform = /^.*\.apk$/.test(body['instrumented_url']) ? 'android' : 'ios';
                var message = 'A new version is available of *' + body['app_name'] +
                    '* (' + body['app_version'] + '): ' + '<' + body['instrumented_url'] +
                    '|Click here> to download it!';
                slack(message, platform);
            }
        }
    );
};
