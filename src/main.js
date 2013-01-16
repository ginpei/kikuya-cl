require.config({
	paths: {
		'app': 'core/app'
	}
});
define([
	'app'
], function(app) {
	app.start();
});
