exports.config = {
    specs: ['src/client/test/e2e/*.js'],
    baseUrl: 'http://localhost:8100?ionicplatform=android',
    multiCapabilities: [{
        browserName: 'chrome'
    }],
    framework: 'jasmine2',
    directConnect: true
};
