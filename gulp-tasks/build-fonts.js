/**
 * Copy fonts
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log'),
        path = require('path');

    return function() {

        log('Copying fonts');

        return gulp.src([
                    path.join(config.path.fonts.fontsSource, 'ionic', '*'),
                    path.join(config.path.fonts.fontsSource, 'montserrat', '*'),
                    path.join(config.path.fonts.fontsSource, 'sanitasicons-icomoon', 'fonts', '*'),
                ])
                .pipe(plugins.rename({dirname: ''}))
                .pipe(gulp.dest(config.path.fonts.fontsDest));

    };
};
