// gulp file
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglifycss = require('gulp-uglifycss');

//convert sass to css 
gulp.task('sass', function(){
    return gulp.src('./public/stylesheets/sass/*.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('./public/stylesheets/css'));
  });

  //linify css files
  gulp.task('css', function () {
    gulp.src('./public/stylesheets/css/*.css')
      .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      }))
      .pipe(gulp.dest('./public/stylesheets/css/mini'));
  });

