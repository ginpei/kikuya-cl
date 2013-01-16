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
	'$SPEC/view/MapViewSpec',
	'$SPEC/view/UserViewSpec'
], function() {
	jasmine.getEnv().execute();
});
