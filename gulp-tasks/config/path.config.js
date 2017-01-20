module.exports = function(config) {
    'use strict';

    var client = './src/client/',
        clientApp = client + 'app/';

    var bower = {
        json: require('./../../bower.json'),
        directory: './src/client/lib/',
        ignorePath: '../..'
    };

    var path = require('path');

    config.path = {
        // all javascript that we want to vet
        alljs: [
            './src/client/app/**/*.js',
            './src/client/test/**/*.js',
            './src/client/mocks/**/*.js',
            './*.js',
        ],
        build: './www/',
        dist: './dist/',
        client: client,
        app: clientApp,
        test: client + 'test/',
        css: client + 'css/',
        sassSources: client + 'scss/',
        html: client + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        img: client + 'img/',
        mocks: client + 'mocks/',
        indexTpl: client + 'index.tpl.html',
        index: client + 'index.html',
        i18n: clientApp + 'locales/',
        fonts: {
            fontsDest: path.join(client, 'css/fonts/'),
            fontsSource: path.join(client, 'fonts-source/'),
            packageFonts: {
                ionic: path.join(bower.directory, 'ionic/fonts/*.*')
            }
        },
        // app js, with no specs
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
        ],
        jsOrder: [
            '**/app.module.js',
            '**/app.mocks.module.js',
            '**/*.module.js',
            '**/ng-map.js',
            '**/*.js'
        ],
        sass: client + 'scss/**/*.scss',
        sassMainFile: client + 'scss/styles.scss',
        cache: client + 'cache/',
        report: './reports/',
        source: 'src/',
        mocksjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            client + 'mocks/**/*.js'
        ],

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * plato
         */
        plato: {
            js: clientApp + '**/*.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                root: 'app/',
                standalone: false
            }
        },

        /**
         * Bower and NPM files
         */
        bower: bower,
        packages: [
            './package.json',
            './bower.json'
        ]
    };

    return config;

};
