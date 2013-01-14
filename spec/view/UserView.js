define([
	'$SRC/view/UserView'
], function(UserView) {
	describe('UserView', function() {
		var view;
		beforeEach(function() {
			view = new UserView();
		});

		it('is a constructor', function() {
			expect(view instanceof UserView).toBeTruthy();
		});
	});
});
