var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('BearsController', ['cfResource', function(Resource) {
    this.bears = [];
    this.errors = [];
    var remote = new Resource(this.bears, this.errors, baseUrl + '/api/bears', {errMessages: {getAll: 'custom error message'}});
    this.getAll = remote.getAll.bind(remote);
    this.createBear = function() {
      remote.create(this.newBear)
        .then(() => {
          this.newBear = null;
        });
    }.bind(this);
    this.updateBear = function(bear) {
      remote.update(bear)
        .then(() => {
          bear.editing = false;
        });
    };
    this.removeBear = remote.remove.bind(remote); 
    this.getAll();
  }]);
};
