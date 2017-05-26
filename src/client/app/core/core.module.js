(function () {
    'use strict';

    angular
        .module('app.core', [
            'app.login',
            'ionic',
            'pascalprecht.translate',
            'ngSanitize',
            'ngCordova',
            'ngMessages',
            'ngAnimate',
            'ngStorage',
            'toastr',
            'app.sharedservices',
            'angular-toArrayFilter',
            'angularMoment',
            'ngInputModified',
            'angular-jwt',
            'angular-autogrow',
            'blocks.logger',
        ])
        .run(runBlock);

    /* @ngInject */
    function runBlock(ionicService) {
        ionicService.initialize();
    }
})();
