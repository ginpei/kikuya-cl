define([
	'app'
], function(app) {
	var User = Backbone.Model.extend();
	return app.newCollection({
		model: User
	});
});
