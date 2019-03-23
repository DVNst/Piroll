"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var css_sorting = require("postcss-sorting");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");

var server = require("browser-sync").create();
var run = require("run-sequence");

var rename = require("gulp-rename");
var del = require("del");

gulp.task("css", function () {
  console.log('CSS')
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      css_sorting()
    ]))
    .pipe(gulp.dest("css"))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("html", function() {
  console.log('HTML')
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("."));
});

gulp.task("images", function() {
  console.log('images')
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"))
});

gulp.task("webp", function() {
  console.log('webp')
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("img"))
});

gulp.task("copy", function() {
  console.log('copy')
  return gulp.src([
      "source/fonts/**",
      "source/img/**",
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("."));
});

gulp.task("server", function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["css"]);
  gulp.watch("source/*.html",  ["html"]).on("change", server.reload);
});

gulp.task("build", function(done) {
  run(
    "copy",
    "images",
    "webp",
    "css",
    "html",
    done
  );
});
