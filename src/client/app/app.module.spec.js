describe('App Module:', function() {
    'use strict';

    var module;

    beforeEach(function() {
        module = angular.module('app');
    });

    it('should be registered', function() {
        expect(module).toBeDefined();
    });

    describe('Dependencies:', function() {
      var deps;
      var hasModule = function(m) {
          return deps.indexOf(m) >= 0;
      };
      beforeEach(function() {
          deps = module.value('appName').requires;
      });

      it('should have app.core as a dependency', function() {
          expect(hasModule('app.core')).toEqual(true);
      });

  });

});
