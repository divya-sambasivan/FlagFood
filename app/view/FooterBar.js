Ext.define('FlagFood.view.FooterBar', {
    extend: 'Ext.Toolbar',
    xtype : 'footerbar',
    config: {
		docked : 'bottom',
        items: [
			{
				xtype: 'spacer'
			},
            {
                text : 'Next',
				ui : 'forward',
				itemId: 'next_question'
            }
        ]
    }
});