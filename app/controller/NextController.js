Ext.define('FlagFood.controller.NextController', {
			extend: 'Ext.app.Controller',
			config: {
				views: ['FooterBar','GameContainer'],
				refs: {
					'nextQuestion' : 'button#next_question',
					'gameContainer' : 'game_container'
				},
				control: {
					nextQuestion:{
						tap : "onNextQuestion"
					}
				}
			},
			onNextQuestion : function(button,event){
				this.getGameContainer().getNextQuestion();
			}
		}
);