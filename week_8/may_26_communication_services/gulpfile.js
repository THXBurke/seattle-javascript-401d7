const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtools: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('static:dev', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['static:dev', 'webpack:dev']);
