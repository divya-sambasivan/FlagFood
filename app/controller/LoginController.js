Ext.define('FlagFood.controller.LoginController', {
			extend: 'Ext.app.Controller',
			requires: ['Ext.MessageBox', 'FlagFood.view.GameContainer'],
			config: {
				views: ['LoginView'],
				refs: {
					'loginView' : 'login',
					'loginButton': 'button#login_button',
					'registerButton' : 'button#register_button'
				},
				control: {
					loginButton:{
						tap : "onLoginHit"
					},
					registerButton : {
						tap: "onRegisterHit"
					}
				}
			},
			onLoginHit : function(button,event){
				var loginValue;
				if(loginValue = this.validateFormValues()){
					try
					{
						Backendless.UserService.login( loginValue.name, loginValue.password);
						Ext.Viewport.remove(this.getLoginView(),true);
						Ext.Viewport.add({
							xtype: 'game_container'
						});
					}
					catch( err )
					{
						if (err.statusCode == 401){
							Ext.Msg.alert("Invalid Credentials", "Please check your username and password", Ext.emptyFn);
						}
						else{
							 console.log( "error message - " + err.message );
							 console.log( "error code - " + err.statusCode );
						}
					}
					
				}
			},
			onRegisterHit : function(button,event){
				var loginValue;
				try{
					if(loginValue=this.validateFormValues()){
						var user = new Backendless.User();
						user.user_id = loginValue.name;
						user.password = loginValue.password;
						var new_user = Backendless.UserService.register(user);
						Backendless.UserService.login( loginValue.name, loginValue.password );
						Ext.Viewport.remove(this.getLoginView(),true);
						Ext.Viewport.add({
							xtype: 'game_container'
						});
						console.log("added");
					}
				} catch (err){
					if (err.code == 3033){
						Ext.Msg.alert("Username Unavailable", "This username has already been taken. Please pick another one", Ext.emptyFn);
					}
					else{
						console.log(err);
						console.log( "error message - " + err.message );
						console.log( "error code - " + err.statusCode );
					}
				}
			},
			validateFormValues: function(){
				var loginValue = this.getLoginView().getValues();
				if(!(loginValue.name && loginValue.password)){
						Ext.Msg.alert("Empty Values","Enter Login Values",Ext.emptyFn);
						return false;
				}
				else
				{
					return loginValue;
				}
			}
		}
);