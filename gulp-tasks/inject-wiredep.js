/**
 * Wire-up the bower dependencies
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');

    return function () {
        log('Wiring the bower dependencies into the html');

        var wiredep = require('wiredep').stream;
        var options = config.getWiredepDefaultOptions();

        return gulp
            .src(config.path.indexTpl)
            .pipe(wiredep(options))
            .pipe(plugins.if(args.verbose, plugins.print()))
            .pipe(plugins.rename(config.path.index))
            .pipe(gulp.dest('.'));
    };
};
