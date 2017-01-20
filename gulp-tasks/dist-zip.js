/**
 * Comprime el paquete de la aplicación en dist
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var moment = require('moment');

    return function() {
        var packagePaths = [].concat(
            config.path.build + '/**/*',
            './config.xml'
        );

        var env = config.dist.ensure.environment(args.env, args.debugmode);
        var timestamp = moment().format('YYYYMMDDhhmmss');
        var archiveName = config.dist.cordova[env].appNamespace + '_' + timestamp + '.zip';

        return gulp.src(packagePaths, {base: './', dot: true})
            .pipe(plugins.zip(archiveName))
            .pipe(gulp.dest(config.path.dist));
    };
};
