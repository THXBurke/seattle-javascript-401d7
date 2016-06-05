module.exports = function(app) {
  app.directive('taskItem', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'templates/task_item.html',
      require: '^taskList',
      transclude: true,
      replace: true,
      scope: {
        task: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.done = controller.completeTask;
      }
    }
  });
};
