/**
 * Corrige los errores detectados por jscs
 */
module.exports = function (gulp, plugins) {
    'use strict';
    return function() {
        plugins.run('jscs src/client/app gulpfile.js  --fix').exec()
          .on('error', function() {
        });
    };
};
