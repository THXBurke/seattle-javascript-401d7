var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['$http', function($http) {
    this.bears = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/bears')
        .then((res) => {
          this.bears = res.data;
        }, handleError.bind(this));
    };

    this.createBear = () => {
      $http.post(baseUrl + '/api/bears', this.newBear)
        .then((res) => {
          this.bears.push(res.data);
          this.newBear = null;
        }, handleError.bind(this));
    };

    this.updateBear = (bear) => {
      $http.put(baseUrl + '/api/bears/' + bear._id, bear)
        .then(() => {
          bear.editing = false;
        }, handleError.bind(this));
    };

    this.removeBear = (bear) => {
      $http.delete(baseUrl + '/api/bears/' + bear._id)
        .then(() => {
          this.bears.splice(this.bears.indexOf(bear), 1);
        }, handleError.bind(this));
    };
  }]);
};
