require.config({
	baseUrl: 'src',
	paths: {
		'app': 'core/app',
		'$SPEC': '../spec'
	}
});
define([
	'app',
	// '$SPEC/model/UserCollection',
	'$SPEC/view/MapView',
	'$SPEC/view/UserView'
], function() {
	jasmine.getEnv().execute();
});
