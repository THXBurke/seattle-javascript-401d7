module.exports = function(app) {
  require('./dummy_directive')(app);
  require('./task_item_directive')(app);
  require('./task_list_directive')(app);
};
