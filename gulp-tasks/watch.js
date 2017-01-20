/**
 * Realiza un build y pasa a observar cambios para re-build
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var vinylPaths = require('vinyl-paths');
    var del = require('del');
    var templateCache = require('./build-templatecache')(gulp, plugins, config, args);
    var injectJsAppDep = require('./inject-jsAppDep')(gulp, plugins, config, args);
    var buildStyles = require('./build-styles')(gulp, plugins, config, args);
    var buildi18n = require('./build-i18n')(gulp, plugins, config, args);
    var copyHtmlTemplates = require('./build-html-templates')(gulp, plugins, config, args);

    return function() {
        // Si se incluye --build=false no se contruye la aplicación en www
        if (args.build === undefined || args.build === 'true') {
            gulp.start('build');
        }

        // Se crea un filtro para incluir todos los ficheros que son añadidos o modificados
        // Es decir, todos menos aquellos que son borrados ('unlink')
        var notDeletedFilter = plugins.filter(
            function(file) {
                return file.event !== 'unlink' && file.event !== 'unlinkDir';
            },
            {restore: true}
        );

        // El método restore obtiene los ficheros que no cumplen el filtro, es decir, los que
        // han sido borrados ('unlink') del origen, se pasan al pipe destino y se borran
        notDeletedFilter.restore
            .pipe(gulp.dest('www'))
            .pipe(vinylPaths(function(file, cb) {
                del(file, cb);
            }));

        // Si se modifica el fichero sass se generan de nuevos los css
        plugins.watch(['./src/client/**/*.scss'], buildStyles);

        // Si se modifica el fichero sass se generan de nuevos los css
        plugins.watch(['./src/client/app/locales/**/*.json'], {events: ['add', 'change', 'unlink', 'unlinkDir']}, buildi18n);

        // Si se modifica, crea o borran templates se genera de nuevo la cache de templates
        plugins.watch('src/client/app/**/*.html', {events: ['add', 'change', 'unlink', 'unlinkDir']}, templateCache);

        // Si se modifican, crean o borran js se realiza de nuevo la inyección en index.html
        var source = [].concat('src/client/app/**/*.js', 'src/client/mocks/**/*.js');
        plugins.watch(source, {events: ['add', 'change', 'unlink', 'unlinkDir']}, injectJsAppDep);

        // Si se modifica un html template se copian de nuevo
        plugins.watch('./src/client/html-views/**/*', copyHtmlTemplates);

        var buildPaths = [].concat(
            config.path.app + '**/*',
            config.path.cache + '**/*',
            config.path.css + '**/*',
            config.path.img + '**/*',
            config.path.bower.directory + '**/*',
            config.path.mocks + '**/*',
            config.path.i18n + '**/*',
            config.path.index
        );
        console.log('---------------------------- ' + buildPaths);

        // Se observan todos los ficheros de src/client y se copian a la carpeta build aquellos que
        // son modificados o añadidos para mantenerla sincronizada
        plugins.watch(buildPaths, {events: ['add', 'change', 'unlink', 'unlinkDir'], base: './src/client'})
            .pipe(notDeletedFilter)
            .pipe(gulp.dest(config.path.build));
    };
};
