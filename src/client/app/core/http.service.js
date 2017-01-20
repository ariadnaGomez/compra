(function() {
    'use strict';
    angular
        .module('app.core')
        .factory('myHttpInterceptor', function($q, $rootScope, $timeout, END_POINT_PUB, CONSUMER_KEY, $injector, $translate) {

            return {
                'request': function(config) {
                    config.timeout = $timeout(function() {
                        config.isTimeout = true;
                    }, 120000);
                    config.requestTimestamp = new Date().getTime();

                    var isPublicEndpoint = config.url.indexOf(END_POINT_PUB) === 0;
                    if (isPublicEndpoint) {
                        var apiKey = 'apikey ' + CONSUMER_KEY;
                        config.headers['Authentication'] = apiKey;
                    }
                    return config;
                },

                'requestError': function(rejection) {
                    return $q.reject(rejection);
                },

                'response': function(response) {
                    function isError(response) {
                        return response.data != null &&
                            (response.data.estado === 'ERROR' || response.data.error === 'ERROR_SERVICIO_BRAVO');
                    }

                    if (isError(response)) {
                        sendErrorMsg(response);
                        return $q.reject(response);
                    }
                    return response;
                },

                'responseError': function(rejection) {
                    sendErrorMsg(rejection);
                    console.log(rejection);
                    return $q.reject(rejection);
                }
            };

            /**
             * Envia el evento de error en llamada HTTP
             * @param rejection
             */
            function sendErrorMsg(rejection) {
                var unauthorized = 401;
                var status = rejection.status;

                if (status === unauthorized) {
                    $injector.get('$state').transitionTo('login');
                    showSesionExpiredPopUp();
                }

            }

            function showSesionExpiredPopUp() {
                $injector.get('$ionicPopup').alert({
                    title: $translate.instant('SESSION-EXPIRED-TITLE')
                });
            }
        });

})();
