Ext.define('FlagFood.view.TimerView', {
    extend: 'Ext.Panel',
	requires: ['Ext.ux.Timer'],
    xtype : 'timer_view',
    config: {
        items: [
            {	
				xtype: 'timer',
                name:'timer3',
				itemId:'timer3',
				fullSeconds:120,
				markerTime:120,
				time:120,
				enableState:false,
				clearState:false,
				isTimeNCountSeprateCmp:true,
				timeColor:'#f00',
				onTimeUp: function(){
					console.log(this);
					this.fireEvent('timeup',this,'timeup');
				}
            }
        ]
    },
	initialize: function(){
		this.getItems().items[0].start();
	}
});