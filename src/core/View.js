define([
], function() {
	return Backbone.View.extend({
		/**
		 * Returns HTML string by template.
		 * @param {String} id
		 * @param {Object} data
		 * @returns {String}
		 */
		_buildHtml: function(id, data) {
			var result;
			dust.render(id, data, function(error, output) {
				result = output;
			});
			return result;
		}
	});

});
