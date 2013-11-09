Ext.define("FlagFood.view.LoginView",{
			extend: "Ext.form.Panel", 
			requires: ["Ext.field.Text","Ext.field.Password","Ext.form.FieldSet"],
			xtype: 'login',
			config:{
				fullscreen:true,
				scrollable : true,

				items: [
					{
						xtype : 'titlebar',
						title : 'Flag Your Food'
					},
					{
						xtype: 'fieldset',
						items: [
							{
								xtype: 'textfield',
								name : 'name',
								label: 'Name'
							},
							{
								xtype: 'passwordfield',
								name : 'password',
								label: 'Password'
							}
						]
					},
					{
						xtype: 'fieldset',
						layout: {
							type: 'vbox',
							align: 'middle'
						},
						items:[
							{
								xtype: 'button',
								text: 'Login',
								ui : 'action',
								itemId : 'login_button',
								width : '20%'
							},
							{
								xtype: 'spacer',
								width : 10
							},
							{
								xtype: 'button',
								text: 'Register',
								ui : 'confirm',
								itemId : 'register_button',
								width: '20%'
							}
						]
					}
				]
			}
		});