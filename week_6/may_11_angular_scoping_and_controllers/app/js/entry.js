const angular = require('angular');
const demoApp = angular.module('demoApp', []);

demoApp.controller('SomeController', ['$scope', function($scope) {
  $scope.greeting = 'hello world';
  $scope.alertGreeting = function() {
    alert($scope.greeting);
  };
  $scope.updateParent = function(input) {
    $scope.greeting = input;
  };
}]);

demoApp.controller('AnotherController', ['$scope', function($scope) {
  $scope.greeting = '';
  $scope.update = function() {
    $scope.updateParent($scope.greeting);
  };
}]);

demoApp.controller('BlergController', function() {
  this.greeting = 'hello world';
});
