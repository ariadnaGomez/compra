/**
 * vet the code and create coverage report
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');

    return function () {
        log('Analyzing source with JSHint and JSCS');

        return gulp.src(config.path.alljs)
            .pipe(plugins.if(args.verbose, plugins.print()))
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(plugins.jshint.reporter('fail'))
            .pipe(plugins.jscs());
    };
};
