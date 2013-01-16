define([
	'app',
	'model/UserCollection',
	'view/UserView'
], function(app, UserCollection, UserView) {
	return app.newView({
		events: {
			'click .add-user': 'createUser'
		},

		initialize: function() {
			this.users = new UserCollection();
			this.users.on('add', this.addUser, this);
			this.users.on('remove', this.removeUser, this);
		},

		render: function() {
			this.$el.html(
				'<div>' +
				'<button class="add-user">Add User</button>' +
				'</div>' +
				'<ul class="users">' +
				'</ul>' +
				'');
			this.$users = this.$('.users');

			this.users.each(function(user, index) {
				this.addUser();
			}, this);

			return this;
		},

		/**
		 * On user is added.
		 */
		addUser: function(user, users, options) {
			var userView = new UserView(user);
			userView.on('move', this.updateUserPosition, this);

			var $user = userView.render().$el;
			$user.attr('id', 'user-'+user.cid);
			this.$users.append($user);
		},

		/**
		 * On user is removed.
		 */
		removeUser: function(user, collection, options) {
			var id = user.cid;
			this.$('#user-' + id).remove();
		},

		/**
		 * On "Add User" button is clicked.
		 */
		createUser: function(event) {
			this.users.add();
		},

		/**
		 * On user view is moved.
		 */
		updateUserPosition: function(event) {
			// TODO
			console.log(event);
		}
	});
});
