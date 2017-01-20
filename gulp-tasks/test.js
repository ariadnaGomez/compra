/**
 * Run specs once and exit
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var startTests = require('./util/startTests');

    return function(done) {
        startTests(true /*singleRun*/, args.debug, done);
    };
};
