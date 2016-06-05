const angular = require('angular');

const testApp = angular.module('testApp', [])
  .directive('testDirective', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'templates/test.html',
      transclude: true,
      scope: {
        title: '@',
        text: '='
      }
    }
  });
