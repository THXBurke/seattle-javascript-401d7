const angular = require('angular');

describe('it should test the service', function() {
  var $httpBackend;
  var bearsctrl;
  beforeEach(angular.mock.module('demoApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all the resources', angular.mock.inject(function(cfResource) {
    $httpBackend.expectGET('http://localhost:3000/api/bears').respond(200, [{ name: 'Yogi'}]);

    var resourceArray = [{}, {}, {}, {}];
    var errorsArray = [];
    var resource = new cfResource(resourceArray, errorsArray, 'http://localhost:3000/api/bears');

    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(resourceArray[0].name).toBe('Yogi');
  }));
});
