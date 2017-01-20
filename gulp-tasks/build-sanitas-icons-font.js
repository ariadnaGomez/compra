/**
 * Create sanitas' font
 */
module.exports = function (gulp, plugins, config) {
'use strict';

    var log  = require('./util/log'),
        path = require('path');

    return function() {

        log('Building icon font');

        var cfg = {
            fontName:        'sanitasicons',
            fontFileName:    'sanitasicons.css',
            fontFormats:     ['ttf', 'eot', 'woff', 'woff2'],
            fontClassName:   'san',
            fontPath:        'fonts/',
            fontDate:        new Date().getTime(),
            iconsPath:       path.join(config.path.client, 'fonts-source', 'sanitasicons', 'icons', '*.svg'),
            cssTemplatePath: path.join(config.path.client, 'fonts-source', 'utils', 'icons.css'),
            htmlTemplateSrc: path.join(config.path.client, 'fonts-source', 'utils', 'preview.html'),
            outputPath:      path.join(config.path.client, 'fonts-source', 'sanitasicons', 'dist')
        };

        gulp.src(cfg.iconsPath)
             .pipe(plugins.svgo())
             .pipe(plugins.iconfont({
                 fontName: cfg.fontName,
                 formats: cfg.fontFormats,
                 appendCodepoints: true,
                 appendUnicode: false,
                 normalize: true,
                 fontHeight: 1000,
                 centerHorizontally: true
             }))
             .on('glyphs', function (glyphs, options) {
                 gulp.src(cfg.cssTemplatePath)
                     .pipe(plugins.consolidate('lodash', {
                         glyphs: glyphs,
                         fontName: cfg.fontName,
                         className: cfg.fontClassName,
                         fontPath: cfg.fontPath,
                         fontDate: cfg.fontDate
                     }))
                     .pipe(plugins.rename(cfg.fontFileName))
                     .pipe(gulp.dest(cfg.outputPath));

                 gulp.src(cfg.htmlTemplateSrc)
                     .pipe(plugins.consolidate('lodash', {
                         glyphs: glyphs,
                         fontName: cfg.fontName,
                         className: cfg.fontClassName,
                         fontPath: cfg.fontPath,
                         fontDate: cfg.fontDate
                     }))
                     .pipe(gulp.dest(cfg.outputPath));
             })
             .pipe(gulp.dest(path.join(cfg.outputPath, cfg.fontPath)));

    };
};
