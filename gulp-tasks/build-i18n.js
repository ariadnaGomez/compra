/**
 * Copy fonts
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Copying locales...');

        return gulp
            .src(config.path.i18n + '**/*', {base: config.path.app})
            .pipe(gulp.dest(config.path.build));
    };
};
