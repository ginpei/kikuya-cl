module.exports = function(grunt) {
	grunt.initConfig({
		lint: {
			all: ['grunt.js', 'src/**/*.js']
		}
	});
	grunt.registerTask('default', 'lint');
};
