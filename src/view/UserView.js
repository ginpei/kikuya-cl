define([
	'app',
	'template/user'
], function(app) {
	return app.newView({
		events: {
			'touchmove': 'move',
			'touchstart': 'startMoving',
			'touchend': 'stopMoving'
		},

		initialize: function(user) {
			this.model = user;
		},

		render: function() {
			var data = {
				id: this.model.cid,
				name: this.model.get('name') || 'New User#'+this.model.cid
			};
			var html = this._buildHtml('tpl/user.html', data);
			this.setElement($(html));
			this.setPosition(0, 0);

			return this;
		},

		/**
		 * @param {Number} left
		 * @param {Number} top
		 */
		setPosition: function(left, top) {
			this.$el.css({ left:left, top:top });
			this.trigger('move', { view:this });
		},

		/**
		 * On touchstart.
		 */
		startMoving: function(event) {
			this._moving = true;

			var touch = event.originalEvent.touches[0];
			this._posTouch = [touch.pageX, touch.pageY];

			var $el = this.$el;
			this._posElement = this.getPosition();
		},

		/**
		 * On touchend.
		 */
		stopMoving: function(event) {
			this._moving = false;
			this.trigger('movestop', { view:this });
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
		},

		/**
		 * @returns {Array} `[x,y]`
		 */
		getPosition: function() {
			var $el = this.$el;
			return [
				parseInt($el.css('left'), 10),
				parseInt($el.css('top'), 10)
			];
		}
	});
});
