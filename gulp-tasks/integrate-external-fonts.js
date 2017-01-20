/**
 * Copy fonts
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log'),
        path = require('path');

    return function() {

        log('Copying fonts...');

        gulp.src(config.path.fonts.packageFonts.ionic)
            .pipe(gulp.dest(path.join(config.path.fonts.fontsSource, 'ionic')));
        log('Ionic fonts copied.');

        gulp.src(path.join(config.path.fonts.fontsSource, 'sanitasicons-icomoon', 'style.css'))
            .pipe(plugins.rename('_fonts-sanitasicons.scss'))
            .pipe(gulp.dest(config.path.sassSources));
        log('Styles file for sanitasicons copied.');

    };
};
