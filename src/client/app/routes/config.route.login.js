(function() {
    'use strict';

    angular
        .module('app')
        .config(moduleConfig);

    moduleConfig.$inject = ['$stateProvider', 'statesServiceProvider'];

    function moduleConfig($stateProvider, statesService) {
        var STATES = statesService.$get();

        $stateProvider
            .state(STATES.LOGIN.INDEX, {
                url: '/login',
                cache: false,
                views: {
                    'mainApp': {
                        templateUrl: 'app/features/login/login.html',
                        controller: 'LoginController as vm'
                    }
                }
            });
    }
})();
