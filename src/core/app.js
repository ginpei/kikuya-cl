define([
	'core/View'
], function(View) {
	return {
		start: function() {
			var app = this;
			require([
				'view/MapView'
			], function(MapView) {
				app.map = new MapView();
				app.render();

				// TODO: remove me
				app.map.users.add();
			});
		},

		render: function() {
			this.map.render().$el
				.appendTo('#map');
			this.map.updateDetachRect();
		},

		newView: function(prototype) {
			return View.extend(prototype);
		},

		newCollection: function(prototype) {
			return Backbone.Collection.extend(prototype);
		},

		newModel: function(prototype) {
			return Backbone.Model.extend(prototype);
		}
	};
});
