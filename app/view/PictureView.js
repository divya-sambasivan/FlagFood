Ext.define('FlagFood.view.PictureView', {
    extend: 'Ext.Panel',
    xtype : 'picture_view',
    config: {
		autodestroy: true,
		layout: {
				type: 'vbox',
				align: 'middle'
		},
        items: [
			{	
				xtype: 'label',
				name: 'food_name',
				id:'food_name'
			},
			{	
				xtype: 'panel',
				name: 'food_image'
			},
			{
				xtype: 'fieldset',
				items: [
						{	
							xtype: 'textfield',
							label: 'Country',
							name: 'country',
							id:'country'
						},
						{
							xtype: 'label',
							id:"check_cross",
							centered: true,
							html: '<img src="resources/images/cross.png" style="max-height: 35px; max-width: 35px;" />',
							hidden: true
						}
				]
			},         
			{
				xtype: 'button',
				ui: 'confirm',
				text: 'Flag It',
				listeners : {
						tap: function(){
								var country_entered = Ext.ComponentQuery.query('#country')[0].getValue();
								if(country_entered.trim().toLowerCase() === this.getParent().food_country){
									this.getParent().getParent().score++;
									this.getParent().getParent().getItems().items[1].getItems().items[0].increment_counter();
									this.getParent().setCountryFlag(this.getParent().food_country);
									this.getParent().showCheckCrossIcon("check.jpg");
									var tracker_entry = new Tracker({user_id:this.getParent().getParent().user_id, question_id: this.getParent().getParent().question_id +""});
									try{
										this.getParent().getParent().trackerStorage.save(tracker_entry);
									}catch(err){
										console.log(err);
									}
									this.setHidden(true);
									setTimeout(this.getParent().loadNextQuestion.bind(this),3000);
								}
								else{
									this.setHidden(true);
									this.getParent().showCheckCrossIcon("cross.png");
									setTimeout(this.getParent().markIncorrect.bind(this),1000);									
								}
						}
				}
			}			
        ]
    },
	food_name: "",
	food_country: "",
	updateWithRecord : function(record){
		if (record){
			this.down('label[name="food_name"]').setHtml(record.foodName);
			this.down('panel[name="food_image"]').setHtml(record.foodImage);
			this.food_name = record.foodName;
			this.food_country = record.foodCountry;
		}
	},
	loadNextQuestion: function(){
		this.getParent().getParent().getNextQuestion();
		this.setHidden(false);
		var icon = Ext.ComponentQuery.query('#check_cross')[0];
		icon.setHidden(true);
		var country_input = Ext.ComponentQuery.query('#country')[0];
		country_input.setValue("");
	},
	markIncorrect: function(){
		this.setHidden(false);
		var icon = Ext.ComponentQuery.query('#check_cross')[0];
		icon.setHidden(true);
		var country_input = Ext.ComponentQuery.query('#country')[0];
		country_input.setValue("");
	},
	showCheckCrossIcon : function(icon_type){
		var icon = Ext.ComponentQuery.query('#check_cross')[0];
		icon.setHtml('<img src="resources/images/'+icon_type+'" style="max-height: 35px; max-width: 35px;" />');
		icon.setHidden(false);
	},
	setCountryFlag: function(country_name){
		var flag_img = '<img src="https://backendless.com/console/appversion/'+ APPLICATION_ID.toLowerCase() + '/files/download/flags/' + country_name + '.jpg" style="max-height: 350px; max-width: 350px;" />';
		this.down('panel[name="food_image"]').setHtml(flag_img);
	}
});