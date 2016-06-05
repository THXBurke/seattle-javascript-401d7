const angular = require('angular');

const demoApp = angular.module('demoApp', []);

demoApp.factory('cfStore', ['$rootScope', function($rs) {
  return {
    count: 0,
    addCount: function() {
      this.count++;
    },
    getCount: function() {
      return this.count;
    }
  }
}]);

demoApp.controller('CountCtrl', ['cfStore', function(cfStore) {
    this.counter = cfStore;
    this.getCount = cfStore.getCount.bind(cfStore);
    this.add = cfStore.addCount.bind(cfStore);
}]);
