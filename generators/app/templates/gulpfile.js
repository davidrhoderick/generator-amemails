var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    include     = require('gulp-include'),
    jshint      = require('gulp-jshint'),
    minify      = require('gulp-minify'),
    sassLint    = require('gulp-sass-lint'),
    notify      = require('gulp-notify'),
    cleanCSS    = require('gulp-clean-css'),
    replace     = require('gulp-replace'),
    connect     = require('gulp-connect'),
    open        = require('gulp-open'),
    fs          = require('file-system'),
    clean       = require('gulp-clean');

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(sass({
      includePaths: ['src/bower_components/']
    }).on('error', notify))
    .pipe(sassLint({
      files: { ignore: 'src/bower_components/**/*.scss' }
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  return gulp.src('src/js/script.js')
    .pipe(include())
      .on('error', notify)
    .pipe(jshint.reporter('default'))
    .pipe(minify({
      ext:{
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('serve', ['sass', 'js', 'watch'], function () {
  connect.server({
    livereload: true
  });

  gulp.src(__filename)
    .pipe(open({app: 'google-chrome', uri: 'http://localhost:8080'}));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch(['*.html'], ['html']);
});

gulp.task('default', ['serve']);

gulp.task('clean-css', ['sass'], function() {
  return gulp.src('./src/css/style.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('replace-css', ['clean-css'], function() {
  return gulp.src('build/index.html')
    .pipe(replace(/<link rel="stylesheet" type="text\/css" href="src\/css\/style.css"[^>]*>/, function(s) {
      var style = fs.readFileSync('build/style.css', 'utf8');
      return '<style>' + style + '</style>';
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('replace-js', ['js'], function() {
  return gulp.src('build/index.html')
    .pipe(replace(/<script src="build\/script.min.js"><\/script[^>]*>/, function(s) {
      var script = fs.readFileSync('build/script.min.js', 'utf8');
      return '<script>' + script + '</script>';
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('replace-html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('replace-html-without-js', function() {
  return gulp.src('index.html')
    .pipe(replace(/<script src="build\/script.min.js"><\/script[^>]*>/, function(s) {
      return '';
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('clean-prebuild', function() {
  return gulp.src('build/*', {read: false})
    .pipe(clean());
});

gulp.task('clean-postbuild', function() {
  return gulp.src(['build/*.js', 'build/*.css'], {read: false})
    .pipe(clean());
});

gulp.task('build-css', ['clean-prebuild', 'replace-html-without-js', 'replace-css', 'clean-postbuild']);

gulp.task('build', ['clean-prebuild', 'replace-html', 'replace-css', 'replace-js', 'clean-postbuild']);