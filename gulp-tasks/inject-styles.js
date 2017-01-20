/**
 * Wire-up the styles app dependencies
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');
    var inject = require('./util/inject')(gulp, plugins);

    return function() {
        log('Wire up css into the html, after files are ready');

        return gulp
            .src(config.path.index)
            .pipe(inject(config.path.css + '**/*.css'))
            .pipe(gulp.dest(config.path.client));
    };
};
