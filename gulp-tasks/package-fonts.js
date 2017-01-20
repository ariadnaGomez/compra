/**
 * Copia imagenes al directorio de empaquetado
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Packaging fonts');

        return gulp.src(config.path.fonts.fontsDest + '**/*', {base: './src/client'})
            .pipe(gulp.dest(config.path.build));
    };
};
