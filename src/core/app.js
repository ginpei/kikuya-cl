define([
], function() {
	return {
		start: function() {
			var app = this;
			require([
				'view/MapView'
			], function(MapView) {
				app.map = new MapView();
				app.render();
			});
		},

		render: function() {
			this.map.render().$el
				.appendTo('#map');
		},

		newView: function(prototype) {
			return Backbone.View.extend(prototype);
		},

		newCollection: function(prototype) {
			return Backbone.Collection.extend(prototype);
		},

		newModel: function(prototype) {
			return Backbone.Model.extend(prototype);
		}
	};
});
