const angular = require('angular');
const demoApp = angular.module('demoApp', []);

require('./directives')(demoApp);
demoApp.controller('TasksController', function() {
  this.tasks = [
    {desc: 'finish this code demo'},
    {desc: 'upload screen caps'},
    {desc: 'commit code'},
    {desc: 'create a directive assignment'}
  ];
  this.description = 'Description from controller';
});
