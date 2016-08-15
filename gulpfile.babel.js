var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

gulp.task('default', ['watch']);

gulp.task("browserSync", function() {
  browserSync.init({
    server: true
  });
});

gulp.task("build-css", function() {
  return gulp.src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/compiled"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('eslint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
          "jsx": true
        }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("babel", function () {
  return gulp.src('app/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest("app/compiled"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("watch", ["browserSync"], function() {
  gulp.watch("app/scss/**/*.scss", ["build-css"]);
  gulp.watch('app/js/**/*.js', ['eslint']);
  gulp.watch('app/js/**/*.js', ['babel']);
  gulp.watch("index.html").on('change', browserSync.reload);
  gulp.watch("app/js/**/*.js").on("change", browserSync.reload);
});
