module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/**/*.js',
				'!tasks/loader/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		packager: {
			options: {
				banner: '/**\n' +
				'* <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %>\n' +
				'* Copyright <%= grunt.template.today("yyyy") %> <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
				'*/\n',
			},
			default: {
				options: {
					config: 'example/project.jspackcfg'
				}
			},
			plain: {
				options: {
					"includeSmallLoader": [
						"__base-modules",
						"__enhanced-modules"
					],
					"packageList": {
						"__basic-behaviour": [
							"libs/jquery"
						],
						"__base-modules": [
							"libs/modernizr.custom",
							"libs/sssl",
							"libs/sssl-ext",
							"polyfiller",
							"extra/migrateloader",
							"libs/jquery.ui.widget",
							"libs/jquery.ui.core",
							"fb-snippets/ui.a11y.ext",
							"fb-snippets/setUnset",
							"libs/loadmodule",
							"init/cfg",
							"init/init-basic"
						],
						"__enhanced-modules": [
							"init/init-enhanced"
						]
					},
					cwd: 'example/'
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', 'packager:default');
};