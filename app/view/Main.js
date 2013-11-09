Ext.application({
    name: 'FlagFood',
	views: ['HeaderBar','Ext.Panel'],
    launch: function() {
        Ext.create("Ext.Panel", {
            fullscreen: true,
             items: [
					{
						xtype: 'img',
						src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
						height: 300,
						width: 300,
						flex: 1
					},
					{
						xtype: 'panel',
						flex: 2,
						html: 'Sencha Inc.<br/>1700 Seaport Boulevard Suite 120, Redwood City, CA'
					}
				]
        });
		
		var img = Ext.create('Ext.Img', {
    src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
    height: 64,
    width: 64
});
Ext.Viewport.add(img);
    }
});