module.exports = function(config) {
    'use strict';

    var path = config.path;

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: path.bower.json,
            directory: path.bower.directory,
            ignorePath: path.bower.ignorePath
        };
        return options;
    };

    return config;

};
