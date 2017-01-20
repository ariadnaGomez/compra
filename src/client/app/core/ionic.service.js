/* global ionic */
(function() {
    'use strict';

    angular
    .module('app.core')
    .factory('ionicService', ionicService);

    /* @ngInject */
    function ionicService($ionicPlatform, $state, statesService) {
        var service = {
            initialize: initialize
        };
        var STATES = statesService;
        return service;

        function initialize() {
            $state.go(STATES.LOGIN.INDEX);
            $ionicPlatform.ready(function() {

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    cordova.plugins.Keyboard.disableScroll(true);
                }

                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                if (screen.lockOrientation) {
                    screen.lockOrientation('portrait');
                }
            });

            ionic.Platform.isFullScreen = true;

        }
    }

})();
