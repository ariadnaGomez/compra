/**
 * Build everything in config.build directory
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');

    return function() {
        log('Building everything');

        var buildPaths = [].concat(
            config.path.app + '**/*',
            config.path.css + '**/*',
            config.path.img + '**/*',
            config.path.bower.directory + '**/*',
            config.path.cache + '**/*',
            config.path.mocks + '**/*',
            config.path.index
        );

        gulp.src(buildPaths, {base: './src/client'})
            .pipe(gulp.dest(config.path.build))
            .on('end',function() {
                require('./config-constants')(gulp, plugins, config, args)('app/core/core.constants.js', 'app/core');
            }
        );

        var msg = {
            title: 'gulp build',
            subtitle: 'Deployed to the build folder',
            message: 'Running `ionic serve`, `ionic emulate` ...'
        };

        log(msg);
    };
};
