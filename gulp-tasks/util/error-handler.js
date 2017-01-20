/**
*  Common implementation for an error handler of a Gulp plugin
*/
module.exports = function(title) {
    'use strict';

    return function(err) {
        var util = require('gulp-util');
        util.log(util.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
