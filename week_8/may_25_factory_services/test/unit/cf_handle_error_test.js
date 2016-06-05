var angular = require('angular');

describe('cfHandleError service', function() {
  var cfHandleError;
  beforeEach(angular.mock.module('demoApp'));

  it('should return a function', angular.mock.inject(function(cfHandleError) {
    expect(typeof cfHandleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(cfHandleError) {
    var testArr = [];
    cfHandleError(testArr, 'test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});
