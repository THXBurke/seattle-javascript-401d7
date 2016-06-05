const angular = require('angular');
const testTemplate = require('../app/templates/test.html');

describe('test directive', function() {
  beforeEach(angular.mock.module('testApp'));

  var $scope, $httpBackend, $compile;
  beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
  }));

  it('should transclude some html', function() {
    $httpBackend.expectGET('templates/test.html').respond(200, testTemplate);
    var testDirective = $compile('<test-directive data-title="Wow such test" data-text="\'hello from test\'"><p>this is transcluded</p></test-directive>')($scope);
    $httpBackend.flush();
    expect(testDirective.html().indexOf('hello from test')).not.toBe(-1);
    expect(testDirective.html().indexOf('Wow such test')).not.toBe(-1);
    expect(testDirective.html().indexOf('this is transcluded')).not.toBe(-1);
  });

  it('it should have transclusion from the parent scope', function() {
    $httpBackend.expectGET('templates/test.html').respond(200, testTemplate);
    $scope.text = 'hello from scope';
    $scope.description = 'wow such description';
    var testDirective = $compile('<test-directive title="test directive" data-text="text"><p>{{description}}</p></test-directive>')($scope);
    $httpBackend.flush();
    expect(testDirective.html().indexOf('hello from scope')).not.toBe(-1);
    expect(testDirective.html().indexOf('test directive')).not.toBe(-1);
    expect(testDirective.html().indexOf('wow such description')).not.toBe(-1);

  });
});
