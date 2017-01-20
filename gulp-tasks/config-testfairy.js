/**
 * Setting testfairy parameters
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');

    var appTokenTestfairy = args.appTokenTestfairy ? args.appTokenTestfairy : '';

    return function() {
        log('Configuring testfairy APP Token: ' + appTokenTestfairy);
        return gulp.src(config.path.index)
            .pipe(plugins.replace('%appTokenTestfairy%', appTokenTestfairy))
            .pipe(gulp.dest(config.path.client));
    };

};
