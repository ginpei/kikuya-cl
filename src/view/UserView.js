define([
], function() {
	return Backbone.View.extend({
		render: function() {
			this.$el.text('User');
			return this;
		}
	});
});
