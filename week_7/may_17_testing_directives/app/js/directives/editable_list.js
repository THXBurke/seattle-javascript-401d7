module.exports = function(app) {
  app.directive('editTaskList', function() {
    return {
      restrict: 'EAC',
      scope: {
        tasks: '=',
        listTitle: '@'
      },
      templateUrl: 'template/edit_task_list.html' 
    }
  });
};
