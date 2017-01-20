/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
module.exports = function sendMessageToSlack(config, args, message, platform) {
    var log = require('./util/log');

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
        function (err, httpRespnse, body) {
            log('response slack: ' + body);
        }
    );
};
