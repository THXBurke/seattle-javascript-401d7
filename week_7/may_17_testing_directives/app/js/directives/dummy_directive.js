module.exports = function(app) {
  app.directive('cfDummyDirective', function() {
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
}
