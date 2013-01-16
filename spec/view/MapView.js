define([
	'view/MapView'
], function(MapView) {
	describe('MapView', function() {
		var view;
		beforeEach(function() {
			view = new MapView();
		});

		it('is map view', function() {
			expect(view instanceof MapView).toBeTruthy();
		});
	});
});
