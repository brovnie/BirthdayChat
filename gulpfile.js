// gulp file
const gulp = require('gulp'),
      sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('./public/stylesheets/sass/*.sass')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('./public/stylesheets/css'));
  });

