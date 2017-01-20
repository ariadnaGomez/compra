/**
* Compile sass to css
*/
module.exports = function (gulp, plugins, config) {
    'use strict';

    var log = require('./util/log');
    var errorHandler = require('./util/error-handler');

    return function() {
        log('Compiling Sass --> CSS');

        var sassOptions = {
             style: 'expanded',
             sourceComments: 'normal',
             errLogToConsole: true
         };

        var injectFiles = gulp.src([
             './src/client/app/**/*.scss',
             '!' + config.path.sass
         ], {read: false});

        var injectOptions = {
             transform: function(filePath) {
                 filePath.replace('src/client/app/', '../app/');
                 return '@import "' + filePath + '";';
             },
             starttag: '// injector',
             endtag: '// endinjector',
             addRootSlash: false
         };

        return gulp.src(config.path.sassMainFile)
            .pipe(plugins.inject(injectFiles, injectOptions))
            .pipe(plugins.sass(sassOptions)).on('error', errorHandler('Sass'))
            .pipe(plugins.autoprefixer()).on('error', errorHandler('Autoprefixer'))
            .pipe(gulp.dest(config.path.css));
    };
};
