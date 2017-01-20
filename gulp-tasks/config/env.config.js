module.exports = function(config) {
    'use strict';

    config.environment = {
        production: {
            sanitasPrivateApi: 'https://api.sanitas.es/',
            sanitasPublicApi: 'https://api.sanitas.es/',
            consumerKey: 'key',

        },
        preproduction: {
            sanitasPrivateApi: 'https://bupanp-sanitas-pre.apigee.net/',
            sanitasPublicApi: 'https://bupanp-sanitas-pre.apigee.net/',
            consumerKey: 'key',
        },
        development: {
            sanitasPrivateApi: 'https://bupadev-sanitas-dev.apigee.net/mayores',
            sanitasPublicApi: 'https://bupadev-sanitas-dev.apigee.net/',
            consumerKey: 'key',

        }
    };

    return config;
};
