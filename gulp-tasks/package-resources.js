/**
 * Compress images
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Copying resources');

        return gulp
            .src('resources/**/*', {base: '.', dot: true})
            .pipe(gulp.dest(config.path.build));
    };
};
