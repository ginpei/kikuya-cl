define([
	'app',
	'model/UserCollection'
], function(app, UserCollection) {
	return app.newView({
		initialize: function() {
			this.users = new UserCollection();
		},

		render: function() {
			this.$el.text('MAP');
			return this;
		}
	});
});
