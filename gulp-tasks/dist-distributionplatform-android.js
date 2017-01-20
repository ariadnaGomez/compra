/**
 * Upload ipa/apk to Testfairy
 */
module.exports = function (gulp, plugins, config, args) {
    'use strict';

    var uploadToTestFairy = require('./util/testfairy');

    var filePathBase = './dist/' + args.appPackage + '.' + args.appVersion;
    var filePathAndroid = filePathBase + config.dist.extension('android');

    return function () {
        uploadToTestFairy(config, filePathAndroid);
    };


};
