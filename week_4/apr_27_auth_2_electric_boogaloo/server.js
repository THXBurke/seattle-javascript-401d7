if (!process.env.APP_SECRET)
  throw new Error('You need to set the APP_SECRET environment variable');

var PORT = process.env.PORT || 3000;
var app = require(__dirname + '/_server.js');
app.listen(PORT, 'mongodb://localhost/bears_dev_app', () => console.log('server up on port:' + PORT));
