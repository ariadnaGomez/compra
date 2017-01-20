module.exports = function (gulp, plugins) {
    'use strict';

    return inject;

    /**
     * Inject files in a sorted sequence at a specified inject label
     * @param   {Array} src   glob pattern for source files
     * @param   {String} label   The label name
     * @param   {Array} order   glob pattern for sort order of the files
     * @returns {Stream}   The stream
     */
    function inject(src, label, order) {
        var options = {read: false, relative: true};
        if (label) {
            options.name = 'inject:' + label;
        }

        return plugins.inject(orderSrc(src, order), options);
    }

    /**
     * Order a stream
     * @param   {Stream} src   The gulp.src stream
     * @param   {Array} order Glob array pattern
     * @returns {Stream} The ordered stream
     */
    function orderSrc (src, order) {
        return gulp
            .src(src)
            .pipe(plugins.if(order, plugins.order(order)));
    }
};
