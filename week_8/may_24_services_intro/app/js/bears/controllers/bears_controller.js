var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['$http', 'cfHandleError', function($http, cfHandleError) {
    this.bears = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/bears')
        .then((res) => {
          this.bears = res.data;
        }, cfHandleError(this.errors, 'could not retrieve bears'));
    }.bind(this);

    this.createBear = function() {
      var bearName = this.newBear.name;
      $http.post(baseUrl + '/api/bears', this.newBear)
        .then((res) => {
          this.bears.push(res.data);
          this.newBear = null;
        }, cfHandleError(this.errors, 'could not save bear ' + bearName));
    }.bind(this);

    this.updateBear = function(bear){
      $http.put(baseUrl + '/api/bears/' + bear._id, bear)
        .then(() => {
          bear.editing = false;
        }, cfHandleError(this.errors, 'could not update bear ' + bear.name));
    }.bind(this);

    this.removeBear = function(bear) { 
      $http.delete(baseUrl + '/api/bears/' + bear._id)
        .then(() => {
          this.bears.splice(this.bears.indexOf(bear), 1);
        }, cfHandleError(this.errors, 'could not murder bear ' + bear.name));
    }.bind(this);
  }]);
};
