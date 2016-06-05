const angular = require('angular');

describe('resource delete service', function() {
    var cfResource;

    beforeEach(angular.mock.module('demoApp'));

    it('should return a funciton', angular.mock.inject(function(cfResource) {
      expect(typeof cfResource).toBe('function');
    }));

    it('should remove a resource', angular.mock.inject(function(cfResource, $httpBackend) {
      $httpBackend.expectDELETE('http://localhost:3000/api/bears/1').respond(200);
      var bears = [{ name: 'testy', _id:1 }];
      var mockUrl = 'http://localhost:3000/api/bears';
      var errors = [];
      var testRes = new cfResource(bears, errors, mockUrl);
      testRes.remove(bears[0]);
      $httpBackend.flush();
      expect(bears.length).toBe(0);
    }));
});
