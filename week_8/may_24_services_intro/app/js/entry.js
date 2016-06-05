const angular = require('angular');
const demoApp = angular.module('demoApp', []);

require('./services')(demoApp);
require('./bears')(demoApp);
