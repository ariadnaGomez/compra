module.exports = function(config) {
    'use strict';

    config.dist = {};

    config.dist.cordova = {
        dev: {appNamespace: 'dev.app-ionic'},
        pre: {appNamespace: 'pre.app-ionic'},
        prod: {appNamespace: 'prod.app-ionic'}
    };

    config.dist.ensure = {
        environment: function (env, debugmode) {
            if (debugmode) {return 'dev';}

            if (env !== null && env !== undefined) {return env.toLowerCase();}
            else {return 'dev';}
        },
        platform: function (platform) {
            if (platform !== undefined && platform !== null) {
                platform = platform.toLowerCase();
            } else {
                throw 'a platform must be supplied with --platform=ios/android';
            }
            return platform;
        },
        services : function(svc, env) {
            var servicesEnvironment = env;
            if (svc) {
                servicesEnvironment = svc.toLowerCase();
            }
            return servicesEnvironment;
        }
    };

    config.dist.extension = function (platform) {
        var extension = '.zip';
        if (platform === 'android') {
            extension = '.apk';
        }
        else if (platform === 'ios') {
            extension = '.ipa';
        }
        return extension;
    };

    config.dist.testfairy = {
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        api_key: '',
        video: 'wifi',
        'auto-update': 'on'
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    };

    config.dist.slack = {
        token: ''
    };

    return config;

};
