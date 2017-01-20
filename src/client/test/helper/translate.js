'use strict';

jasmine.getEnv().beforeEach(function() {
    module('app', function ($translateProvider) {
        $translateProvider.translations('es', {});
    });
});
