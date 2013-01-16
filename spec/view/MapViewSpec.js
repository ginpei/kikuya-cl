define([
	'view/MapView'
], function(MapView) {
	describe('MapView', function() {
		var view;
		beforeEach(function() {
			view = new MapView();
		});

		it('adds an user on button', function() {
			spyOn(view.users, 'add');
			view.render();
			view.$('.add-user').click();
			expect(view.users.add).toHaveBeenCalled();
		});

		it('removes user on recents box', function() {
			// TODO
		});

		describe('user', function() {
			it('adds new user', function() {
				view.render();
				expect(view.users.length).toBe(0);
				expect(view.$el.find('>.users>.user').length).toBe(0);

				view.users.add();
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
});
