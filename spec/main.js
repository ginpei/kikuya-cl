require.config({
	paths: {
		'$SRC': '../src'
	}
});
define([
	'view/UserView'
], function() {
	jasmine.getEnv().execute();
});
