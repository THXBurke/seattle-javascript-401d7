var angular = require('angular');

describe('cfResourceCreate', function () {
  var cfResource;

  beforeEach(angular.mock.module('demoApp'));

  it('should return a function', angular.mock.inject(function(cfResource) {
    expect(typeof cfResource).toBe('function');
  }));

  it('should add to the test array', angular.mock.inject(function(cfResource, $httpBackend) {
    $httpBackend.expectPOST('localhost:8000/api/bears', {name: 'test bear'}).respond(200, {name: 'another test', _id: 0});
    var baseUrl = 'localhost:8000/api/bears';
    var testArray = [];
    var errorTest = [];
    var testRemote = new cfResource(testArray, errorTest, baseUrl);
    testRemote.create({name: 'test bear'});
    $httpBackend.flush();
    var baseUrl = 'localhost:8000';
    expect(testArray.length).toBe(1);
    expect(errorTest.length).toBe(0);
    expect(testArray[0].name).toBe('another test');
  }));
});
