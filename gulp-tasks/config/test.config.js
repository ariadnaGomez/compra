module.exports = function(config) {
    'use strict';

    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var path = config.path;

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                path.app + '**/*.module.js',
                path.app + '**/*.js',
                path.app + '**/*.html',
                path.test + 'helper/translate.js',
                path.cache + path.templateCache.file
            ),
            exclude: [],
            coverage: {
                dir: path.report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            ngHtml2JsPreprocessor:  {
                stripPrefix: path.client,
                moduleName: 'ngTemplates'
            },
            preprocessors: {}
        };
        options.preprocessors[path.app + '**/!(*.spec)+(.js)'] = ['coverage'];
        options.preprocessors[path.app + '**/*.html'] = ['ng-html2js'];
        return options;
    }
};
