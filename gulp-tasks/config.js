module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var log = require('./util/log');
    var exec = require('child_process').exec;

    return function (done) {
        var appPackage = args.appPackage ? args.appPackage : config.app.package;
        var appVersion = args.appVersion ? args.appVersion : config.app.version;
        var appName =  args.appName ? args.appName : config.app.name;
        var appDescription = args.appDescription ? args.appDescription : config.app.description;
        var pgbCrossWalkPlugin = args.pgbCrossWalkPlugin ? '<gap:plugin name=\'org.crosswalk.engine\' version=\'1.3.0\' source=\'pgb\'/>' : '';
        var pgbPlatformAndroid = args.pgbPlatformAndroid ? '<gap:platform name="android" />' : '';
        var pgbPlatformiOS = args.pgbPlatformiOS ? '<gap:platform name="ios" />' : '';
        var minSdkVersion = args.minSdkVersion ? args.minSdkVersion : config.app.minSdkVersion; // Default 5.0.0 (Android)
        // minSdkVersion + SCREEN SUPPORT (12) + appVersion
        var versionCode = '' + minSdkVersion + '12' +  appVersion.replace(/\./g,'');

        var pluginsNPM = [
            "cordova-plugin-device",
            "cordova-plugin-console",
            "cordova-plugin-whitelist",
            "cordova-plugin-camera",
            "cordova-plugin-splashscreen",
            "ionic-plugin-keyboard",
        ];

        if (args.repoSan === 'true') {
            log('NPM registry Sanitas');
            exec('npm config set registry http://srurchin.sanitas.dom:8081/nexus/content/groups/sanitas-npm', function (err, stdout, stderr) {
              console.log(stdout);
              console.log(stderr);
            });
        } else {
            log('No NPM registry Sanitas');
            exec('npm config set registry https://registry.npmjs.org/', function (err, stdout, stderr) {
              console.log(stdout);
              console.log(stderr);
            });

        }
        // var repo = args.repo ? args.repo : 'externalRepo';
        // var pluginsToUse = pluginsNPM[repo];
        pluginsNPM = JSON.stringify(pluginsNPM);

        log('appPackage: ' + appPackage);
        log('appVersion: ' + appVersion);
        log('appName: ' + appName);
        log('appDescription: ' + appDescription);
        log('minSdkVersion: ' + minSdkVersion);
        log('versionCode: ' + versionCode);

        gulp.src(['./config.tpl.xml'])
          .pipe(plugins.replace('%APP_NAME%', appName))
          .pipe(plugins.replace('%APP_VERSION%', appVersion))
          .pipe(plugins.replace('%APP_PACKAGE%', appPackage))
          .pipe(plugins.replace('%GAP_CROSSWALK_PLUGIN%', pgbCrossWalkPlugin))
          .pipe(plugins.replace('%GAP_PLATFORM_ANDROID%', pgbPlatformAndroid))
          .pipe(plugins.replace('%GAP_PLATFORM_IOS%', pgbPlatformiOS))
          .pipe(plugins.replace('%MIN_SDK_VERSION%', minSdkVersion))
          .pipe(plugins.replace('%APP_VERSIONCODE%', versionCode))
          .pipe(plugins.rename('config.xml'))
          .pipe(gulp.dest('.'));


          gulp.src(['./package.tpl.json'])
            .pipe(plugins.replace('%PLUGINS%', pluginsNPM))
            .pipe(plugins.rename('package.json'))
            .pipe(gulp.dest('.'));

        gulp.src(['./sonar.tpl.properties'])
            .pipe(plugins.replace('%APP_NAME%', appName))
            .pipe(plugins.replace('%APP_DESCRIPTION%', appDescription))
            .pipe(plugins.replace('%VERSION%', appVersion))
            .pipe(plugins.rename('sonar-project.properties'))
          .pipe(gulp.dest('.'))
          .on('end', done);
    };
};
