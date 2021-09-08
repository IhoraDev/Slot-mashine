"use strict";

const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const del = require('del');
const rename = require('gulp-rename');
const fs = require('fs');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const DIST_APP_FOLDER = "./dist";

const SRC_APP_FOLDER = './src/';

const srcJsFiles = [
    SRC_APP_FOLDER + 'App.js',
    SRC_APP_FOLDER + 'Loader.js',
    SRC_APP_FOLDER + 'Background.js',
    SRC_APP_FOLDER + 'Button.js',
    SRC_APP_FOLDER + 'GameController.js',
    SRC_APP_FOLDER + 'Turn.js',
    SRC_APP_FOLDER + 'Reel.js'
];

global.vendorJS = [
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/pixi.js/dist/pixi.js",
    "./node_modules/@pixi/filter-color-replace/dist/filter-color-replace.js",
    "./node_modules/k8w-pixi-tween/bin/pixi-tween.js",
    "./node_modules/eventemitter3/umd/eventemitter3.min.js"
];

global.vendorCSS = [
    "./node_modules/bootstrap/dist/css/*.css",
];

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./dist/",
            index: "index.html"
        },
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    gulp.watch(["./index.html", "./src/**/*"], gulp.series(copyFiles, copyAssetFolder, copyJSFiles, copyVendorCSSFiles, browserSyncReload));
}

function clean() {
    return del([DIST_APP_FOLDER + "/**/*"]);
}

function copyFilesForTestdata() {
    return gulp.src(['./testdata/*.*'])
        .pipe(gulp.dest(DIST_APP_FOLDER + "/testdata"))
        .pipe(browsersync.stream());
}

function copyFiles() {
    return gulp.src(['./src/*.css', './src/*.html'])
        .pipe(gulp.dest(DIST_APP_FOLDER))
        .pipe(browsersync.stream());
}

function copyAssetFolder() {
    if (fs.existsSync("src/assets")) {
        return gulp.src(["src//assets/**/*"])
            .pipe(gulp.dest(DIST_APP_FOLDER + "/assets"));
    }
}

function copyJSFiles() {
    return gulp.src(srcJsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_APP_FOLDER))
        .pipe(browsersync.stream());
}

function copyVendorJSFiles() {
    return gulp.src(vendorJS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(DIST_APP_FOLDER));
}

function copyVendorCSSFiles() {
    return gulp.src(vendorCSS)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_APP_FOLDER));
}

const build = gulp.series(clean, copyFiles, copyAssetFolder, copyJSFiles, copyVendorJSFiles, copyVendorCSSFiles);
const watch = gulp.parallel(watchFiles, browserSync);
const dev = gulp.series(build, copyFilesForTestdata, watch);

exports.build = build;
exports.watch = watch;
exports.dev = dev;

exports.default = dev;