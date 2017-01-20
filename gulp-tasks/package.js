/**
 * Optimized build
 */
module.exports = function () {
    'use strict';

    var log = require('./util/log');

    return function(done) {
        log('Packaging everything');

        var msg = {
            title: 'gulp package',
            subtitle: 'Deployed to the build folder',
            message: 'Running `ionic serve`, `ionic emulate` ...'
        };

        log(msg);
        done();
    };
};
