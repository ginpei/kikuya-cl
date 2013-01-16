define([
	'app'
], function(app) {
	return app.newView({
		tagName: 'li',
		className: 'user',

		events: {
			'touchmove': 'move',
			'touchstart': 'startMoving',
			'touchstop': 'stopMoving'
		},

		initialize: function(user) {
			this.model = user;
		},

		render: function() {
			var id = this.cid;
			this.$el
				.css('position', 'absolute')  // TODO: move to CSS
				.text(this.model.get('name') || 'New User#'+this.model.cid);
			this.setPosition(0, 0);

			return this;
		},

		setPosition: function(left, top) {
			this.$el.css({ left:left, top:top });
		},

		/**
		 * On touchstart.
		 */
		startMoving: function(event) {
			this._moving = true;

			var touch = event.originalEvent.touches[0];
			this._posTouch = [touch.pageX, touch.pageY];

			var $el = this.$el;
			this._posElement = [
				parseInt($el.css('left')),
				parseInt($el.css('top'))
			];
		},

		/**
		 * On touchstop.
		 */
		stopMoving: function(event) {
			this._moving = false;
		},

		/**
		 * On touchmove.
		 */
		move: function(event) {
			var touch = event.originalEvent.touches[0];
			var posTouchStarted = this._posTouch;
			var posElement = this._posElement;
			var left = posElement[0] + touch.pageX - posTouchStarted[0];
			var top  = posElement[1] + touch.pageY - posTouchStarted[1];
			this.setPosition(left, top);
		},

		/**
		 * @returns {Boolean}
		 */
		isMoving: function() {
			return this._moving;
		}
	});
});
