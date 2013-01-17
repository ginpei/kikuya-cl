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

			var view = this;
			$(window).resize(function(event) {
				view.updateDetachRect();
			});
		},

		render: function() {
			this.$el.html(
				'<div>' +
				'<button class="add-user">Add User</button>' +
				'</div>' +
				'<ul class="users">' +
				'</ul>' +
				'<ul class="recent-users">' +
				'</ul>' +
				'');
			this.$users = this.$('.users');

			this.users.each(function(user, index) {
				this.addUser();
			}, this);

			this.updateDetachRect();

			return this;
		},

		/**
		 * Should be called after `render()`.
		 */
		updateDetachRect: function() {
			var $recentUsers = this.$('.recent-users');
			if ($recentUsers.length < 1) {
				return;
			}

			var recentUsersPos = $recentUsers.position();
			this.detachRect = [
				recentUsersPos.left,
				recentUsersPos.top,
				recentUsersPos.left + $recentUsers.outerWidth(),
				recentUsersPos.top + $recentUsers.outerHeight()
			];
		},

		/**
		 * On user is added.
		 */
		addUser: function(user, users, options) {
			var userView = new UserView(user);
			// TODO: check detach area for interaction feed back for user
			// userView.on('move', this.updateUserPosition, this);
			userView.on('movestop', this.updateUserPosition, this);

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
		updateUserPosition: function(data) {
			if (this.isInDetachArea(data.view)) {
				this.users.remove(data.view.model);
			}
		},

		/**
		 * @param {Backbone.View} userView
		 * @returns {Boolean}
		 */
		isInDetachArea: function(userView) {
			var rect = this.detachRect;  // [x0, y0, x1, y1]
			var pos = userView.getPosition();  // [x, y]
			return (
				rect[0] <= pos[0] && pos[0] <= rect[2] &&
				rect[1] <= pos[1] && pos[1] <= rect[3]);
		}
	});
});
