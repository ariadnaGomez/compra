(function () {
    'use strict';

    angular
        .module('app.sharedservices')
        .factory('statesService', statesService);

    function statesService() {

        var service = {
            LOGIN : {
                INDEX : 'login'
            },
        };

        return service;
    }
})();
