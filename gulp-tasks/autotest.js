/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var templateCache = require('./build-templatecache')(gulp, plugins, config, args);
    var startTests = require('./util/startTests');

    // Test
    return function(done) {
        // Si se modifica, crea o borran templates se genera de nuevo la cache de templates
        plugins.watch('src/client/app/**/*.html', {events: ['add', 'change', 'unlink', 'unlinkDir']}, templateCache);
        startTests(false /*singleRun*/, args.debug, done);
    };
};
