const express = require('express');
const app = express();
const bearsRouter = require(__dirname + '/routes/bearsrouter');
const authRouter = require(__dirname + '/routes/auth_router');
const mongoose = require('mongoose');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', bearsRouter);
app.use('/api', authRouter);

module.exports = exports = {
  server: {close: function() {throw new Error('server not started yet!')}},
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);
    return this.server = app.listen(port, cb);
  },
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
