define([
	'app',
	'view/UserView',
	// 'model/User'
], function(app, UserView, User) {
	var User = app.newModel();
	describe('UserView', function() {
		var view;
		beforeEach(function() {
			view = new UserView(new User());
			view.render();
		});

		it('sets its element position', function() {
			view.setPosition(123, 234);
			expect(parseInt(view.$el.css('left'))).toBe(123);
			expect(parseInt(view.$el.css('top'))).toBe(234);
		});

		describe('touches', function() {
			var touchStartEvent, touchMoveEvent;
			beforeEach(function() {
				touchStartEvent = jQuery.Event('touchstart');
				touchStartEvent.originalEvent = { touches: [{}] };

				touchMoveEvent = jQuery.Event('touchmove');
				touchMoveEvent.originalEvent = { touches: [{}] };
			});

			it('starts moving', function() {
				expect(view.isMoving()).toBeFalsy();

				view.$el.trigger(touchStartEvent);
				expect(view.isMoving()).toBeTruthy();
			});

			it('stop moving', function() {
				view.$el.trigger(touchStartEvent);
				expect(view.isMoving()).toBeTruthy();

				view.$el.trigger('touchend', { });
				expect(view.isMoving()).toBeFalsy();
			});

			it('memories touch position on touchstart', function() {
				touchStartEvent.originalEvent = {
					touches: [{ pageX:123, pageY:234 }]
				};
				view.$el.trigger(touchStartEvent);
				expect(view._posTouch[0]).toBe(123);
				expect(view._posTouch[1]).toBe(234);
			});

			it('memories element position on touchstart', function() {
				view.setPosition(100, 101);
				view.$el.trigger(touchStartEvent);
				expect(view._posElement[0]).toBe(100);
				expect(view._posElement[1]).toBe(101);
			});

			it('updates element position by touch position', function() {
				view.setPosition(100, 101);
				touchStartEvent.originalEvent = {
					touches: [{ pageX:123, pageY:234 }]
				};
				view.$el.trigger(touchStartEvent);

				touchMoveEvent.originalEvent = {
					touches: [{ pageX:124, pageY:235 }]
				};
				view.$el.trigger(touchMoveEvent);

				expect(parseInt(view.$el.css('left'))).toBe(101);
				expect(parseInt(view.$el.css('top'))).toBe(102);
			});
		});
	});
});
