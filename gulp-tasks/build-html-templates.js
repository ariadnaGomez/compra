/**
 * Copy html-templates
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Copying html-templates');

        return gulp
            .src(config.path.client + '/html-views/**/*')
            .pipe(gulp.dest(config.path.build + '/html-views'));
    };
};
