Ext.define('FlagFood.view.HeaderBar', {
    extend: 'Ext.TitleBar',
    xtype : 'headerbar',
    config: {
		docked : 'top',
		title: 'Flag Your Food',
        items: [
            {
                align: 'right',
                text : 'Logout',
				itemId: 'logout'
            }
        ]
    }
});