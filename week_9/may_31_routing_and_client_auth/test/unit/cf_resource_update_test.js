const angular = require('angular');

describe('cfresource service', function() {
  var $httpBackend;
  var cfResource;

  beforeEach(angular.mock.module('demoApp'));

  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  it('should return a function', angular.mock.inject(function(cfResource) {
      var resource = new cfResource;
      expect(typeof resource.update).toBe('function');
  }));

  it('should have update functionality', angular.mock.inject(function(cfResource, $q) {
    var testBear = { name: 'not test', _id: 1 };
    var testArr = [testBear];
    var errorsArr = [];
    var resource = new cfResource(testArr, errorsArr, 'http://localhost:3000/api/bears');

    $httpBackend.expectPUT('http://localhost:3000/api/bears/1', testBear).respond(200);
    var result = resource.update(testBear);
    $httpBackend.flush();

    expect(errorsArr.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));
});
