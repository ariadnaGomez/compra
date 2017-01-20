/**
 * Compress images
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Copying images');

        return gulp
            .src(config.path.img + '**/*')
            .pipe(gulp.dest(config.path.build + 'img'));
    };
};
