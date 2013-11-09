Ext.Loader.setPath({
    'Ext': 'touch-2.3.0/src',
    'MyApp': 'app'
});
Ext.application({
    name: 'FlagFood',
	views: ['LoginView','GameContainer','HeaderBar','FooterBar','TimerView','PictureView','ExitView'],
	controllers: ["LoginController","NextController","ExitController"],
	launch: function() {
		var login_panel = Ext.create('FlagFood.view.LoginView');
    }
});