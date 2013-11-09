Ext.define('FlagFood.view.ExitView', {
    extend: 'Ext.Panel',
    xtype : 'exit_view',
    config: {
		fullscreen:true,
		scrollable : true,
		cls: 'exitPanel',
        items: [
            {
				xtype: 'titlebar',
				itemId : 'scorebar'
			}
        ]
    }
});