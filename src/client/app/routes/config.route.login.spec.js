/* jshint -W117, -W030, -W098 */
describe('Login route test', function() {
    'use strict';

    var $rootScope, $state, $injector, myServiceMock, state = 'login';

    beforeEach(function() {

        module('app', function($provide) {
            $provide.value('app', myServiceMock = {});
        });

        inject(function(_$rootScope_, _$state_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;

            $templateCache.put('template.html', '');
        });
    });

    it('should respond to URL', function() {
        expect($state.href(state, {id: 1})).toEqual('#/login');
    });

});
