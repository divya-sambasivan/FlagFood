Ext.define('FlagFood.controller.ExitController', {
			extend: 'Ext.app.Controller',
			config: {
				views: ['ExitView','GameContainer','TimerView','HeaderBar'],
				refs: {
					'timer' : 'timer#timer3',
					'gameContainer' : 'game_container',
					'scoreDisplayBar' : 'titlebar#scorebar',
					'logoutButton' : 'button#logout'
				},
				control: {
					timer:{
						timeup : "onExitGame"
					},
					logoutButton: {
						tap: "onExitGame"
					},
					gameContainer:{
						gameComplete: "onExitGame"
					}
				}
			},
			onExitGame : function(button,event){
				var title = "Your score is "+ this.getGameContainer().getScore();
				if (event == "gameComplete")
					title = "You have completed the Game. " + title;
				else if (event == "timeup")
					title = "Your time is up. " + title;
				Ext.Viewport.remove(this.getGameContainer(),true);
				Ext.Viewport.add({
					xtype: 'exit_view'
				});
				this.getScoreDisplayBar().setTitle(title);
				Backendless.UserService.logout();
			}
		}
);