'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');

gulp.task('staticsvr', function (next) {
  var staticS = require('node-static'),
      server = new staticS.Server('./'),
      port = 55555;
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(port, function () {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(port));
    next();
  });
});

gulp.task('watch', ['staticsvr'], function () {
  var server = livereload();
  gulp.watch(['./src/**/*.js', './src/games/**', './**/*.html'])
  .on('change', function (file) {
      server.changed(file.path);
    });
});