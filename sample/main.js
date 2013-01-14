define([
	'../src/view/UserView'
], function(UserView) {
	var userView = new UserView();
	userView.render().$el
		.appendTo('#map');
});
