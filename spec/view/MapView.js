define([
	'view/MapView'
], function(MapView) {
	describe('MapView', function() {
		var view;
		beforeEach(function() {
			view = new MapView();
		});

		it('adds new user', function() {
			view.render();
			expect(view.users.length).toBe(0);
			expect(view.$el.find('>.users>.user').length).toBe(0);

			view.$('.add-user').click();  // view.users.add();
			expect(view.users.length).toBe(1);
			expect(view.$el.find('>.users>.user').length).toBe(1);
		});

		it('removes user', function() {
			view.render();
			var users = view.users.add();
			users.remove(users.last());
			expect(view.users.length).toBe(0);
			expect(view.$el.find('>.users>.user').length).toBe(0);
		});
	});
});
