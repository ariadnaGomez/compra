/**
 * Setting tealium parameters
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');
    var env = args.env ? args.env : 'development';

    return function() {
        log('Configuring tealium parameters ');
        return gulp.src(config.path.index)
            //Las variables de tealium no estan se han borrado por seguridad para este arquetipo, se deberán de poner en el caso de que se use tealium.
            //En el archivo ENV.CONFIG en la carpeta gulp-task
            .pipe(plugins.replace('%tealiumAccount%', config.environment[env].tealiumAccount))
            .pipe(plugins.replace('%tealiumProfile%', config.environment[env].tealiumProfile))
            .pipe(plugins.replace('%tealiumEnvironment%', config.environment[env].tealiumEnvironment))
            .pipe(plugins.replace('%tealiumDisableHTTPS%', config.environment[env].tealiumDisableHTTPS))
            .pipe(plugins.replace('%tealiumSuppressLogs%', config.environment[env].tealiumSuppressLogs))
            .pipe(plugins.replace('%tealiumSuppressErrors%', config.environment[env].tealiumSuppressErrors))
            .pipe(gulp.dest(config.path.client));
    };

};
