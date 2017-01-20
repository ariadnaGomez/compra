(function() {
    'use strict';

    var args = require('yargs').argv;
    var config = require('./gulp.config')();
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')({
        lazy: true
    });
    var gulpsync = require('gulp-sync')(gulp);

    function getTask(task) {
        return require('./gulp-tasks/' + task)(gulp, plugins, config, args);
    }

    gulp
        .task('default', ['help'])
        .task('help', plugins.taskListing)
        .task('vet', getTask('vet'))
        .task('jscs-fix', getTask('jscs-fix'))
        .task('plato', getTask('plato'))
        .task('test', ['vet', 'build-templatecache'], getTask('test'))
        .task('test-alone', getTask('test'))
        .task('autotest', ['build-templatecache'], getTask('autotest'))
        .task('build-des', gulpsync.sync(['build-i18n', 'build-inject', 'build-fonts',
            'build-html-templates', 'config', 'build-templatecache'
        ]), getTask('build')).task('build', gulpsync.sync(['clean', 'test', 'build-i18n', 'build-inject', 'build-fonts',
            'build-html-templates', 'config', 'build-templatecache'
        ]), getTask('build'))
        .task('build-i18n', getTask('build-i18n'))
        .task('build-styles', ['clean-styles'], getTask('build-styles'))
        .task('build-fonts', ['clean-fonts'], getTask('build-fonts'))
        .task('build-sanitas-icons-font', getTask('build-sanitas-icons-font'))
        .task('integrate-external-fonts', getTask('integrate-external-fonts'))
        .task('build-templatecache', getTask('build-templatecache'))
        .task('build-inject', gulpsync.sync(['inject-wiredep', 'inject-jsAppDep', 'inject-styles', 'config-tealium', 'config-testfairy']))
        .task('build-html-templates', getTask('build-html-templates'))
        .task('inject-wiredep', getTask('inject-wiredep'))
        .task('inject-jsAppDep', getTask('inject-jsAppDep'))
        .task('inject-styles', ['build-styles'], getTask('inject-styles'))
        .task('package', ['package-optimize', 'config'], getTask('package'))
        .task('package-fonts', getTask('package-fonts'))
        .task('package-images', ['package-resources'], getTask('package-images'))
        .task('package-resources', getTask('package-resources'))
        .task('package-optimize',
            gulpsync.sync(['clean', 'test', 'build-i18n', 'build-inject', 'build-fonts',
                'build-html-templates', 'package-fonts', 'package-images'
            ]),
            getTask('package-optimize'))
        .task('dist', gulpsync.sync(['package', 'dist-zip', 'dist-upload']))
        .task('dist-zip', getTask('dist-zip'))
        .task('dist-upload', getTask('dist-upload'))
        .task('dist-distributionplatform', getTask('dist-distributionplatform'))
        .task('watch', getTask('watch'))
        .task('clean', getTask('clean'))
        .task('clean-fonts', getTask('clean-fonts'))
        .task('clean-styles', getTask('clean-styles'))
        .task('e2e', args.standalone ? ['package'] : null, getTask('e2e'))
        .task('config', getTask('config'))
        .task('config-tealium', getTask('config-tealium'))
        .task('config-testfairy', getTask('config-testfairy'));

})();
