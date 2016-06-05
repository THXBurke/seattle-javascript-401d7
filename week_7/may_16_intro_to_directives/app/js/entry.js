const angular = require('angular');
const demoApp = angular.module('demoApp', []);

demoApp.controller('DemoController', ['$scope', function($scope) {
}]);

demoApp.directive('cfDummyDirective', function() {
  return {
    restrict: 'AC',
    templateUrl: 'templates/dummy_directive.html',
    scope: {
      unicorns: '=',
      rainbows: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.rainbows = $scope.rainbows || 'default';
      $scope.unicorns = $scope.unicorns || 'hello from default';
    }]
  };
});

demoApp.run(['$rootScope', function($rs) {
  $rs.greeting = 'hello world';
}]);
