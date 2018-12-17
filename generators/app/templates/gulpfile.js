var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    include     = require('gulp-include'),
    browserSync = require('browser-sync').create(),
    jshint      = require('gulp-jshint'),
    minify      = require('gulp-minify'),
    sassLint    = require('gulp-sass-lint'),
    notify      = require('gulp-notify'),
    cleanCSS    = require('gulp-clean-css'),
    replace     = require('gulp-replace');

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
      .on('error', notify)
    .pipe(sassLint({
      files: { ignore: 'src/bower_components/**/*.scss' }
    }))
    .pipe(gulp.dest('src/css/style.css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('src/js/site.js')
    .pipe(include())
      .on('error', notify)
    .pipe(jshint.reporter('default'))
    .pipe(minify({
      ext:{
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('static'))
    .pipe(browserSync.stream());
});

gulp.task('clean-css', ['sass'], function() {
  return gulp.src('src/css/style.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('replace-css', ['clean-css'], function() {
  return gulp.src('index.html')
    .pipe(replace(/<link href="src\/css\/style.css"[^>]*>/, function(s) {
      var style = fs.readFileSync('build/style.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('replace-js', ['js'], function() {
  return gulp.src('build/index.html')
    .pipe(replace(/<script href="src\/js\/script.min.js"[^>]*>/, function(s) {
      var script = fs.readFileSync('build/style.css', 'utf8');
      return '<script>\n' + script + '\n</script>';
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['replace-css', 'replace-js']);

gulp.task('serve', ['sass', 'js'], function () {
  browserSync.init();

  gulp.watch('static/scss/**/*.scss', ['sass']);
  gulp.watch('static/js/**/*.js', ['js']);
  gulp.watch(['*.html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);