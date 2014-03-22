'use strict';

describe('Service: Creative', function () {

  // load the service's module
  beforeEach(module('governorApp'));

  // instantiate service
  var Creative;
  beforeEach(inject(function (_Creative_) {
    Creative = _Creative_;
  }));

  it('should do something', function () {
    expect(!!Creative).toBe(true);
  });

});
