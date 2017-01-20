(function() {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appTitle: 'app-ionic',
        appErrorPrefix: '[app-ionic Error] ',
        version: '1.0.0'
    };

    core.value('config', config);
    core.config(configure);
    core.config(configureButtonBack);
    core.config(configureTranslations);
    core.config(sanitizeImgSrc);
    core.config(jsScrolling);
    core.config(configNavBar);
    core.run(angularMoment);
    core.run(routerStateChange);
    core.run(initApp);

    /* @ngInject */
    function configure($logProvider, $httpProvider, jwtInterceptorProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        jwtInterceptorProvider.tokenGetter = tokenGetter;
        jwtInterceptorProvider.authPrefix = 'Bearer ';

        $httpProvider.interceptors.push('jwtInterceptor');

        $httpProvider.interceptors.push('myHttpInterceptor');
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
    }

    /* @ngInject */
    function jsScrolling($ionicConfigProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(true);
    }

    /* @ngInject */
    function configNavBar($ionicConfigProvider) {
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.form.checkbox('square');
    }

    /* @ngInject */
    function configureButtonBack($ionicConfigProvider) {
        $ionicConfigProvider.views.swipeBackEnabled(false);

        $ionicConfigProvider.backButton
            .text('')
            .previousTitleText('')
            .icon('ion-chevron-left');
    }

    /* @ngInject */
    function configureTranslations($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('es');

    }

    /* @ngInject */
    function angularMoment(amMoment) {
        amMoment.changeLocale('es');
    }

    /* @ngInject */
    function routerStateChange($rootScope, $ionicLoading, $ionicHistory) {

        var INITIAL_STATES = ['app.home.index', 'app.home.profile'];

        $rootScope.$on('$stateChange', function() {
            $ionicLoading.show();
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            var currentStateName = $ionicHistory.currentStateName();
            var isInitialState = INITIAL_STATES.indexOf(currentStateName) !== -1;
            if (isInitialState) {
                $ionicHistory.nextViewOptions({historyRoot : true});
            }
            $ionicLoading.hide();
        });
    }

    /* @ngInject */
    function sanitizeImgSrc($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
    }

    /* @ngInject */
    function tokenGetter(config, $localStorage) {
        var idToken = $localStorage.accessToken;

        if (!idToken) {
            return null;
        }

        return idToken;
    }

    /* @ngInject */
    function initApp($rootScope, $state) {
        $rootScope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && typeof fn === 'function') {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.rootScopeGoBack = function() {
            $state.go('app.home.index');
        };

    }

})();
