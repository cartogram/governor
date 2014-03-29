'use strict';

describe('Directive: Cartogram', function () {

  // load the directive's module
  beforeEach(module('governorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-cartogram></-cartogram>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Cartogram directive');
  }));
});
