var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
    return {
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      //The removeToken function clears the username properties on the controller that is calling it.
      //Also clears the default $http token header so any future requests will not use the previously saved token.
      //Clears the token from local storage.
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      //The saveToken function sets the default $http header to send the saved token
      //with every future request. Also saves the token to local storage.
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      //Returns the token property on the cfAuth object or if that does not exist, retrieves
      //the token from local storage and passes it to the saveToken function, which in turn
      //sets the token property on the cfAuth object and the $http headers. Then Returns
      //the this.token.
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
      //The getUsername function returns a promise with the username if the username is already set it returns that,
      //if not it makes a GET request to api profile and sets this username equal to the username on the backend. It also checks
      //to make sure the token is present. 
