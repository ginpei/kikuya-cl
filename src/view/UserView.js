define([
	'app'
], function(app) {
	return app.newView({
		tagName: 'li',
		className: 'user',

		initialize: function(user) {
			this.model = user;
		},

		render: function() {
			var id = this.cid;
			this.$el
				.text(this.model.get('name') || 'New User#'+this.model.cid);

			return this;
		}
	});
});
