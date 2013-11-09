Ext.define("FlagFood.view.GameContainer",{
			extend: "Ext.Container", 
			xtype: 'game_container',
			config:{
				fullscreen:true,
				scrollable : true,
				layout: {
					type: 'hbox',
					align: 'middle'
				},
				items: [
						{
							xtype: "headerbar"
						},
						{
							xtype: "timer_view",
							flex : 1
						},
						{
							xtype: "footerbar",
							docked: "bottom"
						}
				]
			},
				initialize: function(){
				/* to be initialized from the database */
					console.log("in initialze");
					this.foodStoreStorage = Backendless.Persistence.of(FoodStore);
					this.trackerStorage = Backendless.Persistence.of(Tracker);
					this.scoreStorage = Backendless.Persistence.of(Score);
					this.total_items = this.getTotalItemSize();
					this.user = Backendless.UserService.getCurrentUser();
					this.user_id = this.user.objectId;
					this.score = this.getScore(); 
					this.timer = this.getItems().items[1].getItems().items[0];
					for (i=0;i<this.score;i++)
						this.timer.increment_counter();
					this.getNextQuestion();
				},
				getTotalItemSize: function()
				{
					var total_length = this.foodStoreStorage.find().totalObjects;
					return total_length;
				},
				getScore : function()
				{
					var dataQuery = {
								condition: "user_id = '"+this.user_id+"'"
							};
					var score = this.trackerStorage.find(dataQuery).totalObjects;
					return score;
				},
				getNextQuestion: function()
				{	
					
					var isQuestionDone = true, question_number,dataQuery,query_condition;
					this.question_id = "" ;
					if(this.score >= this.total_items)
					{
						console.log("You have completed the game");
						this.fireEvent('gameComplete',this,'gameComplete');
						/*user has finished all questions*/
						//TODO: redirect to finish screen
					}
					else{
						while(isQuestionDone)
						{
							question_number = Math.floor(Math.random()*this.total_items) + 1;
							//question_number = 1;
							//this.user_id = "091366B0-510C-33AC-FF50-F50C080C3C00";
							query_condition = "question_id='"+ question_number + "' and user_id='"+this.user_id+"'";
							dataQuery = {
								condition: query_condition
							};
							var existing_question = this.trackerStorage.find(dataQuery);
							/* user has not answered this question yet */
							if (existing_question.data.length == 0){
								isQuestionDone = false;
							}
						}
						this.question_id = question_number;
						
						/*demo -- starts here */
						dataQuery = {
							condition: "item_number =" + question_number
						}
						var question = this.foodStoreStorage.find( dataQuery );
						/*demo -- ends here */
						
						
						if (!this.picturePanel)
						{
							this.picturePanel = Ext.create('FlagFood.view.PictureView',{
													flex: 1
							});
							this.picturePanel.food_name = question.data[0].food;
							this.picturePanel.country_name = question.data[0].country;
							var food_image = '<img src="https://backendless.com/console/appversion/'+ APPLICATION_ID.toLowerCase() + '/files/download/dishes/' + this.picturePanel.food_name + '.jpg" style="max-height: 350px; max-width: 350px;" />';
							this.picturePanel.updateWithRecord({"foodName" : this.picturePanel.food_name.toUpperCase(), "foodImage":food_image,"foodCountry":this.picturePanel.country_name});
							this.add(this.picturePanel);
						}
						else
						{
							this.picturePanel.food_name = question.data[0].food;
							this.picturePanel.country_name = question.data[0].country;
							var food_image = '<img src="https://backendless.com/console/appversion/'+ APPLICATION_ID.toLowerCase() + '/files/download/dishes/' + this.picturePanel.food_name + '.jpg" style="max-height: 350px; max-width: 350px;" />';
							this.picturePanel.updateWithRecord({"foodName" : this.picturePanel.food_name.toUpperCase(), "foodImage":food_image,"foodCountry":this.picturePanel.country_name});
						}
					}
				}
			
});