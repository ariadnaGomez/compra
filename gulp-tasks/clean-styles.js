/**
 * Remove all styles from the client folder
 */
module.exports = function (gulp, plugins, config) {
    'use strict';

    var del = require('del');

    return function(done) {
        del(config.path.css + '**/*.css', done);
    };
};
