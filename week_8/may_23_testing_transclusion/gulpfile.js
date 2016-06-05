const gulp = require('gulp');
const webpack = require('webpack-stream');
const html = require('html-loader');

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', function() {
  return gulp.src('./test/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', ['static:dev', 'webpack:dev']);
gulp.task('default', ['webpack:test']);
