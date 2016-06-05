const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const webpack = require('webpack-stream');
const mongoUri = 'mongodb://localhost/test_server';
var children = [];

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});


gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('startservers:test', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('../../week_3/apr_21_heroku/server', [], {env: {MONGO_URI: mongoUri}}));
});

gulp.task('protractor:test', ['startservers:test', 'build:dev'], () => {
  gulp.src('test/integration/**/*spec.js')
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGTERM');
      });
    });

});



gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['startservers:test', 'build:dev']);
