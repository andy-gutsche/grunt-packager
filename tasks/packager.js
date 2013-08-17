'use strict';

module.exports = function(grunt) {
	var r = require('path').resolve;
	var contrib = require('grunt-lib-contrib').init(grunt);
	var uglify = require('./lib/uglify').init(grunt);

	var fullcontents = grunt.file.read(__dirname+'/loader/included_loader.js');
	var smallcontents = grunt.file.read(__dirname+'/loader/included_smallloader.js');

	grunt.registerMultiTask('packager', 'A grunt plugin to pack js with devloader', function() {
		var havefirst = false;
		var options = this.options({
			banner: '',
			uglify: {
				compress: {
					warnings: false
				},
				mangle: {},
				beautify: false,
				report: false
			}
		});
		if('config' in options) {
			var cfg = grunt.file.readJSON(options.config);
			for(var prop in cfg) {
				options[prop] = cfg[prop];
			}
			var cwd = process.cwd()+'/';
			var cfgPath = r(options.config);
			options.cwd = options.cwd || cfgPath.replace(/\/[a-zA-Z0-9\.]+$/g, '/').replace(cwd, '');
		}
		if(!('cwd' in options)) {
			options.cwd = './';
		}
		var banner = grunt.template.process(options.banner);

		for(var pack in options.packageList) {
			var src = [], dest, result, loader = '';

			if(!havefirst) {
				havefirst = true;
				loader = fullcontents
						.replace(/"__devloaderPackageInfo__"/g, JSON.stringify(options.packageList))
						.replace(/__firstScript__/g, pack);
			} else if(~options.includeSmallLoader.indexOf(pack)) {
				loader = smallcontents.replace(/__curScript__/g, pack);
			}
			for(var i = 0; i < options.packageList[pack].length; i++) {
				src.push(options.cwd+options.packageList[pack][i]+'.js');
			}
			dest = options.cwd + pack+'.js';

			try {
				result = uglify.minify(src, dest, options.uglify);
			} catch (e) {
				var err = new Error('Uglification failed.');
				if (e.msg) {
					err.message += ', ' + e.msg + '.';
				}
				err.origError = e;
				grunt.log.warn('Uglifying source "' + src + '" failed.');
				grunt.fail.warn(err);
			}
			var out = banner + loader + 'if(this.jspackager && !jspackager.devmode) {' + result.min+ '}';
			grunt.file.write(dest, out);

			grunt.log.writeln('File "' + dest + '" created.');
		}

	});
};