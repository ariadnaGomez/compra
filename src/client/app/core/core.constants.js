
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('END_POINT', '%END_POINT%')
        .constant('END_POINT_PUB', '%END_POINT_PUB%')
        .constant('CONSUMER_KEY', '%CONSUMER_KEY%')
        .constant('$ionicLoadingConfig', {
            template:'<ion-spinner icon="android"></ion-spinner>'
        });
})();
