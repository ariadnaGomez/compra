/**
 * Setting envoriment constants
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');
    var env = args.env ? args.env : 'development';
    return function(src, dest) {
        log('Setting constants ');
        gulp.src([config.path.build + src])
            .pipe(plugins.replace('%END_POINT_PUB%', config.environment[env].sanitasPublicApi))
            .pipe(plugins.replace('%END_POINT%', config.environment[env].sanitasPrivateApi))
            .pipe(plugins.replace('%CONSUMER_KEY%', config.environment[env].consumerKey))

            .pipe(gulp.dest(config.path.build + dest));
    };

};
