const angular = require('angular');
const dummyTemplate = require('../app/templates/dummy_directive.html');

describe('dummy directive', function() {
  beforeEach(angular.mock.module('demoApp'));

  var $httpBackend;
  var $compile;
  var $scope;
  var $rootScope;
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    
  }));

  it('should create a dummy directive with a controller binding', function() {
    $httpBackend.expectGET('templates/dummy_directive.html').respond(200, dummyTemplate);

    $scope.greeting = 'test greeting';
    var link = $compile('<div data-cf-dummy-directive data-unicorns="greeting"></div>');
    var directive = link($scope);
    $httpBackend.flush();
    $scope.$digest();
    var h1 = directive.find('h1');
    var h2 = directive.find('h2');
    expect(h1.text()).toEqual($scope.greeting);
    expect(h2.text()).toEqual('default');
    var input = directive.find('input');
    input.val('some new value');
    input.triggerHandler('input');
    expect($scope.greeting).toEqual('some new value');
  });
});
