/**
 * TODO:
 * - Watch HTML changes
 * - Watch CSS changes
 * - Build Task
 */

var gulp = require('gulp'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	notify = require('gulp-notify'),
	nodemon = require('nodemon'),
	envify = require('envify'),
	livereload = require('gulp-livereload');

var production = process.env.NODE_ENV === 'production';


var config = {
	js: {
		src: './app/core/main.js',
		dist: './app/assets/js',
		output: 'bundle.js'
	}
};


function handleError(task) {
	return function(err) {
		gutil.log(gutil.colors.red(err));
		notify.onError(task + ' failed, check the logs..')(err);
	};
}



function scripts(watch) {
	var bundler, rebundle;

	if(watch) {
		bundler = watchify(config.js.src);
	} else {
		bundler = browserify(config.js.src);
	}

	bundler.transform({global: true}, envify);

	rebundle = function() {
		var stream = bundler.bundle({debug: !production});

		stream.on('error', handleError('Browserify'));

		stream = stream.pipe(source(config.js.output));

		return stream.pipe(gulp.dest(config.js.dist)).pipe(livereload());
	};

	bundler.on('update', rebundle);

	return rebundle();
}

/**
 * GULP TASKS
 */

gulp.task('develop', function () {
	nodemon({
		script: './server.js',
		ext: 'html js',
		env: { 'NODE_ENV': 'development' },
		stdout: false,
		stderr: false,
		watch: ['app/']
	});

	nodemon.on('restart', function (files) {
		gutil.log('[server] App restarted due to: ', gutil.colors.cyan(files));
	}).on('stdout', function(raw) {
		var msg = raw.toString('utf8');
		gutil.log('[server]', gutil.colors.green(msg));
	}).on('stderr', function(err) {
		var msg = err.toString('utf8');
		handleError('Node server')(msg);
	});
});


gulp.task('scripts', function() {
	return scripts(false);
});


gulp.task('watchScripts', function() {
	return scripts(true);
});


gulp.task('default', ['develop', 'watchScripts']);

