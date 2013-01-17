define([
	'view/MapView',
	'view/UserView'
], function(MapView, UserView) {
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
			spyOn(view.users, 'remove');
			view.isInDetachArea = function() { return true; };
			view.render();
			var user = view.users.add().last();
			var userView = new UserView({ model:user });
			view.updateUserPosition({ view:userView });
			expect(view.users.remove).toHaveBeenCalled();
		});

		describe('isInDetachArea()', function() {
			var userView;
			beforeEach(function() {
				view.detachRect = [100, 100, 200, 200];

				userView = {
					getPosition: function() {
						return [this.left, this.right];
					},
					setPosition: function(left, right) {
						this.left = left;
						this.right = right;
					}
				};
			});

			it('returns true if left-top corner', function() {
				userView.setPosition(100, 100);
				expect(view.isInDetachArea(userView)).toBeTruthy();
			});

			it('returns true if right-bottom corner', function() {
				userView.setPosition(200, 200);
				expect(view.isInDetachArea(userView)).toBeTruthy();
			});

			it('returns true if in rect', function() {
				userView.setPosition(150, 150);
				expect(view.isInDetachArea(userView)).toBeTruthy();
			});

			it('returns false if less than left border', function() {
				userView.setPosition(99, 150);
				expect(view.isInDetachArea(userView)).toBeFalsy();
			});

			it('returns false if over from right border', function() {
				userView.setPosition(201, 150);
				expect(view.isInDetachArea(userView)).toBeFalsy();
			});

			it('returns false if less than top border', function() {
				userView.setPosition(150, 99);
				expect(view.isInDetachArea(userView)).toBeFalsy();
			});

			it('returns false if over from bottom border', function() {
				userView.setPosition(150, 201);
				expect(view.isInDetachArea(userView)).toBeFalsy();
			});
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
