/**
 * @aside video timer
 * @aside example timer
 * @author Surinder Singh http://developerextensions.com
 *  
 * A very simple class to show timer and count components
 *
 * it's minimum config is
 * - `name`: The name of the timer to keep it unique in your app. For more help see {@link #name}
 *
 * Timer component let you build a timer plus counter, where your user can set timer and start counting their activities, They can also use timer and counter separately. You can show timer without counter component.
 *
 * Timer component support state, so you can use this component where it is being destroy to increase app performance. or where your app is web-app and user visit multiple pages, timer can restore values.
 *
 * You can also use it as a clock where you need alarm , because at time-up event it play a sound which can be set through it's config, It also support sound for tick-tick (sound at each second step)
 *
 * Remember, {@link Ext.ux.Timer} class extends from {@link Ext.Container}.
 *
 * ## Examples
 * ###Default Timer
 *
 *     @example preview
 *     Ext.Viewport.add({
 *			xtype: 'container',			
 *			layout:{
 *				type:'vbox',
 *				align:'center',
 *				pack:'center'
 *			},
 *			items:[{
 *				xtype:'timer',
 *				name:'timer1',
 *				timeUpSoundUrl:'../ext.ux.timer/timerSound.mp3',
 *				topHtml:'Default Timer'
 *			}]
 *		});
 *
 *
 
 * ###Only Timer with initial time settings
 *     @example preview
 *     Ext.Viewport.add({
 *			xtype: 'container',			
 *			layout:{
 *				type:'vbox',
 *				align:'center',
 *				pack:'center'
 *			},
 *			items:[{
 *				xtype:'timer',
 *				name:'timer2',
 *				timeUpSoundUrl:'../ext.ux.timer/timerSound.mp3',
 *				timerOnly:true,
 *				time:200,
 *				markerTime:600,
 *				topHtml:'Only Timer with initial time settings'
 *			}]
 *		});
 *
 * ###Timer with state enabled, custom values
 *     @example preview
 *     Ext.Viewport.add({
 *			xtype: 'container',			
 *			layout:{
 *				type:'vbox',
 *				align:'center',
 *				pack:'center'
 *			},
 *			items:[{
 *				xtype:'timer',
 *				name:'timer3',
 *				timeUpSoundUrl:'../ext.ux.timer/timerSound.mp3',
 *				fullSeconds:3600,
 *				markerTime:900,
 *				time:600,
 *				enableState:true,
 *				clearState:false,
 *				isTimeNCountSeprateCmp:false,
 *				timeColor:'#f00',
 *				topHtml:'Timer with state enabled, custom values'
 *			}]
 *		});
 */
Ext.define('Ext.ux.Timer',{
	xtype:'timer',
	extend:'Ext.Container',
	statics:{
		timeIntervals:{}
	},
	config:{
		/**
         * @cfg {String} name two hidden form field will be created with this name as name-time and name-count so that we can use it under form as other input fields
         */
		name:'timer-1',

		/**
         * @cfg {Number} fullSeconds Full Time in seconds
		 * default is 1800 (30 min).
         */
		fullSeconds:1800,
		
		/**
         * @cfg {Number} counts initial count, It will not make any effect if {@link #enableState}=true
         */
		counts:0,
		
		/**
         * @cfg {Number} time initial Time, It will not make any effect if {@link #enableState}=true
         */
		time:0,
		
		/**
         * @cfg {Number} markerTime initial Marker Time, It will not make any effect if {@link #enableState}=true
         */
		markerTime:0,
		
		/**
         * @cfg {Number} timeRunning Is time running by default, It will not make any effect if {@link #enableState}=true
         */
		timeRunning:false,
		
		
		
		/**
         * @cfg {Number} stepValue if {@link #enableState}=false we use this value to decrement the time.
         */
		stepValue:1,
		
		/**
         * @cfg {Boolean} isTimeNCountSeprateCmp Setting it true Make the timer and count indipendent.
         */
		isTimeNCountSeprateCmp:true,
		
		/**
         * @cfg {String} invalidCountTapTitle if {@link #isTimeNCountSeprateCmp} is false and user tap on count without starting the timer we show a message with this title.
         */
		invalidCountTapTitle:'Start timer',
		
		/**
         * @cfg {String} invalidCountTapMsg if {@link #isTimeNCountSeprateCmp} is false and user tap on count without starting the timer we show a message with this message.
         */
		invalidCountTapMsg:'Start the timer first',
		
		/**
         * @cfg {String} timeUpSoundUrl path to sound file which plays on time up event.
         */
		timeUpSoundUrl:'media/timerSound.mp3',
		
		/**
         * @cfg {String} timeSoundUrl path to sound file which plays on each second when timer is running.
         */
		timeSoundUrl:'',
		
		/**
         * @cfg {String/Number} bottomHtml Extra html at bottom.
         */
		bottomHtml:'',
		
		/**
         * @cfg {String/Number} topHtml Extra html at top.
         */
		topHtml:'',
		
		/**
         * @cfg {Boolean} enableState Make the timer and count stateble so that timer can work in page refershing app or where timer will be destroy on hide like MVC app.
         */
		enableState:false,
		
		/**
         * @cfg {Boolean} clearState clear the timer stored state.
         */
		clearState:false,
		
		/**
         * @cfg {Boolean} timerOnly Show timer only (hide count box).
         */
		timerOnly:false,		
		
		/**
         * @cfg {String} timeColor HEX color code for time arc as "#FF0000".
         */
		timeColor:false,
		
		/**
         * @cfg {String} appId localstorage prefix id. So that we can use same {@link #name} in more than one application.
         */
		appId:'MYAPP',
		
		dragStepModular:2,
		alertMsg:'Time Up'
	},	
	getElementConfig:function(){		
		return {
			reference:'element',
			className:'x-container',
			children: [{
                reference: 'innerElement',
                className: 'x-inner timerRoot',            
				children:[{
					reference:'timerBox',
					cls:'timer',
					children:[{
						reference:'timerCircleBox',
						cls:'timer-circle',
						children:[{
							reference:'timerPie1',
							cls:'timer-pie'
						},{
							reference:'timerPie2',
							cls:'timer-pie timer-fill'
						}]
					},{
						reference:'timerTimeTextBox',
						cls:'time-text',
						children:[{
							tag:'span',
							reference:'minText',
							cls:'big',
							html:'00'
						},{
							tag:'span',
							reference:'secText',
							cls:'medium',
							html:':00'
						}]
					},{
						reference:'timerCountTextBox',
						cls:'timer-count-text',
						children:[{
							reference:'countText',
							cls:'big',
							html:'00'
						}]
					},{
						reference:'marker',
						cls:'marker',
						children:[{
							reference:'markerImage',
							cls:'markerImage'
						}]
					}]
				}]
			}]
		}
	},
	constructor:function(config){
        var me 		= this;
		config		= config?config:{};
		config		= Ext.applyIf(config, me.config);
		
		if(!config.items){
			config.items = [];	
		}
		config.items.push({
			xtype:'hiddenfield',
			name:config.name+'-time',
			cls:'time',
			ref:'time'
		});
		config.items.push({
			xtype:'hiddenfield',
			name:config.name+'-count',
			cls:'count',
			ref:'count'
		});
		
		var timeUpSoundUrl = config.timeUpSoundUrl;
		if(timeUpSoundUrl!=''){
			var timeUpSoundPlayerId = 'timeUpSound_'+config.name;
			var oldPlayer = Ext.getCmp(timeUpSoundPlayerId);
			if(oldPlayer){
				me.timeUpSound = oldPlayer;
			}else{
				me.timeUpSound = Ext.create('Ext.Audio', {
					url  	: timeUpSoundUrl,
					id		: timeUpSoundPlayerId,
					loop 	: false,
					enableControls: false,
					renderTo:document.body
				});
			}
		}
		var bgSoundUrl = config.timeSoundUrl;
		if(bgSoundUrl!=''){
			var bgSoundPlayerId = 'timerBgSound_'+config.name;
			var oldPlayer2 = Ext.getCmp(bgSoundPlayerId);
			if(oldPlayer2){
				me.bgSound = oldPlayer2;
			}else{
				me.bgSound = Ext.create('Ext.Audio', {
					url  	: bgSoundUrl,
					id		: bgSoundPlayerId,
					loop 	: true,
					enableControls: false,
					renderTo:document.body
				});
			}
		}		
		arguments[0] = config;
        me.callParent(arguments);
		me.innerElement.removeCls('x-html');
		me.on('deactivate', me.onDeactivate, me);
		//me.marker.on('drag', me.onDrag, me);
		//me.marker.on('dragend', me.onDragEnd, me);
		//me.countText.on('touchstart', me.onCountTextTouchStart, me);
		//me.countText.on('touchend', me.onCountTextTouchEnd, me);
		//me.countText.on('tap', me.onCountTextTap, me);
		//me.timerTimeTextBox.on('tap', me.onTimerTimeTextBoxTap, me);
		//me.marker.on('tap', me.onTimerTimeTextBoxTap, me);
		//me.timerCircleBox.on('tap', me.onTimerTimeTextBoxTap, me);
		if(config.timerOnly){
			me.timerBox.addCls('timerOnly');
			me.timerCountTextBox.hide();
		}
		if(config.timeColor){
			me.timerPie1.setStyle({'background-color':config.timeColor, 'border-color':config.timeColor});
			me.timerPie2.setStyle({'background-color':config.timeColor, 'border-color':config.timeColor});
		}
    },
	beforeInitialize:function(){
		var me	= this;
		me.hiddenFieldTime 	= me.child('hiddenfield[ref="time"]');
		me.hiddenFieldCount = me.child('hiddenfield[ref="count"]');
		me.callParent(arguments);
	},
	beforeInitConfig:function(){
		this.callParent(arguments);
		if(this.getClearState()){
			this.clearState();
		}	
	},
	start: function(){
		this.onTimerTimeTextBoxTap();
	},
	increment_counter: function(){
		this.onCountTextTap();
	},
	onDeactivate:function(){
		this.set_TimeRunning(false);
	},
	onCountTextTouchStart:function(e){
		var me	= this;
		console.log(me);
		me.fireTapEvent = true;
		me.countTextTouchEndEventId = setTimeout(function(){
			clearTimeout(me.countTextTouchEndEventId);
			me.countTextTouchEndEventId=false;
			me.set_Counts(0, true);
			me.fireTapEvent = false;
		}, 2000);
	},
	onCountTextTouchEnd:function(e){
		var me=this;
		if(me.countTextTouchEndEventId){
			clearTimeout(me.countTextTouchEndEventId);
			me.countTextTouchEndEventId=false;
			me.fireTapEvent = true;
		}else{
			me.fireTapEvent = false;
		}
	},
	onTimerTimeTextBoxTap:function(e){
		if(e){
			e.stopEvent();
		}
		/*if(!this.playerLoaded){
			this.playerLoaded = true;
			this.startTimeUpSound(true);
		}*/
		var time		= this.getTime();
		
		if(time<1){
			return;
		}
		var timeRunning = this.getTimeRunning();
		if(!timeRunning){
			this.set_TimeRunning(true);
			this.startTiming();
		}else{
			this.set_TimeRunning(false);
			this.stopTiming();
		}
	},
	onCountTextTap:function(e){
		this.fireTapEvent = true; /*divya- modifying it for starting counter programmatically */
		if(this.fireTapEvent){
			var counts = this.getCounts()+1;
			this.set_Counts(counts);
		}
	},
	onDragEnd:function(e){
		e.stopEvent( )
	},
	onDrag:function(e){
		e.stopEvent( )
		this.stopTimeUpSound();
		this.set_TimeRunning(false);
		this.stopTiming();
		var xy			= this.getXY(), updateLastDeg=true;
		var deg			= this.rad2deg(Math.atan2(e.getPageY() - xy.y, e.getPageX() - xy.x))+90;
		deg				= deg>0?deg:360+deg;
		if(this.lastDeg){
			if(this.lastDeg>270 && this.lastDeg<=360 && deg>=0 && deg<=180){
				deg = 360;
				updateLastDeg = false;
			}else if(deg>=180 && deg<=360 && this.lastDeg>=0 && this.lastDeg<=90){
				deg = 0;
				updateLastDeg = false;
			}			
		}
		if(updateLastDeg){
			this.lastDeg	= deg;
		}
		var dragStepModular = this.getDragStepModular();
		if(dragStepModular>0){
			deg	= Math.round(deg);
			if(deg%dragStepModular==0){
				this.setTimerForDeg(deg);
			}
		}else{
			this.setTimerForDeg(deg);
		}
	},
	setTimerForDeg:function(deg){
		var time		= Math.round(deg*this.getFullSeconds()/360);
		this.set_Time(time);
		this.set_MarkerTime(time);
	},
	stopTiming:function(clearAll, fireTimeUp){
		var name	= this.getName();
		if(this.self.timeIntervals[name]){
			clearInterval(this.self.timeIntervals[name]);
			delete this.self.timeIntervals[name];
		}
		if(clearAll && this.self.timeIntervals[name+'2']){
			clearTimeout(this.self.timeIntervals[name+'2']);
			delete this.self.timeIntervals[name+'2'];
		}
		if(fireTimeUp){
			this.onTimeUp();
		}
	},
	startTiming:function(){
		var me = this, stepValue = me.getStepValue(), enableState = this.getEnableState();
		me.stopTiming(true);
		this.self.timeIntervals[this.getName()]	= setInterval(function(){
			var time	= me.applyTime(me.getTime());
			if(!enableState){
				time		= time-stepValue;
			}
			if(time<=0){
				time=0;
				me.stopTiming(true, true);
			}
			me.set_Time(time);
		}, 1000);		
	},	
	set_Counts:function(v, dontCheckTimeRunning){
		if(!dontCheckTimeRunning && !this.getTimeRunning() && !this.getIsTimeNCountSeprateCmp()){
			Ext.Msg.alert(this.getInvalidCountTapTitle(),this.getInvalidCountTapMsg());
			return;
		}
		if(this.getEnableState()){
			this.setLocalStoreValue('counts', v);
		}
		this.setCounts(v);		
	},
	set_TimeRunning:function(v){
		if(this.getEnableState()){
			this.setLocalStoreValue('timeRunning', (v?'true':''));
		}
		this.setTimeRunning(v);
	},
	set_MarkerTime:function(v){
		if(this.getEnableState()){
			this.setLocalStoreValue('markerTime', v);
		}
		this.setMarkerTime(v);
	},
	set_Time:function(v){
		if(this.getEnableState()){
			this.setLocalStoreValue('timeOnSetTime', Ext.Date.format(new Date(), 'U'));
			this.setLocalStoreValue('time', v);
		}
		this.setTime(v);
	},
	applyCounts:function(v){
		if(this.getEnableState()){
			return parseInt(this.getLocalStoreValue('counts'), 10);
		}
		return v;
	},
	applyTime:function(v){
		if(v<0){v =0;}
		if(this.getEnableState()){			
			var timeDefference 	= 0;			
			if(this.getTimeRunning()){
				var timeOnSetTime 	= parseInt(this.getLocalStoreValue('timeOnSetTime'), 10);
				if(timeOnSetTime){
					timeDefference = Ext.Date.format(new Date(), 'U')-timeOnSetTime;
				}
			}
			v = parseInt(this.getLocalStoreValue('time'), 10)-timeDefference;
			v = (v<0)?0:v;
		}
		if(v<1){
			this.set_TimeRunning(false);
		}
		return v;
	},
	applyMarkerTime:function(v){
		if(this.getEnableState()){
			return parseInt(this.getLocalStoreValue('markerTime'), 10);
		}
		return v;
	},
	applyTimeRunning:function(v){
		if(this.getEnableState()){
			v = (this.getLocalStoreValue('timeRunning')=='true');
		}
		return v;
	},
	updateEnableState:function(enable){
		if(!enable){
			this.clearState();	
		}
	},
	applyClearState:function(clear){
		if(clear){
			this.clearState();
		}
	},
	updateCounts:function(counts){
		this.hiddenFieldCount.setValue(counts);
		if(!this.countText){
			return;
		}
		counts = Ext.String.leftPad(counts, 2, '0');
		this.countText.setHtml(counts);
	},
	updateTime:function(time, oldValue){
		this.Minutes	= Math.floor(time/60);
		this.Seconds	= (time-(this.Minutes*60));
		this.updateTimeText();
		this.updateTimeArcPostion(this.time2deg(time));
		if(oldValue===undefined){
			var t = this.getTime(), mt = this.getMarkerTime();
			this.lastLapValue = (this.lastLapValue?this.lastLapValue:0)+(mt-t);
			this.hiddenFieldTime.setValue(this.lastLapValue);
		}
		if(this.getTimeRunning()){
			this.lastLapValue	= (this.lastLapValue?this.lastLapValue:0)+1;
			this.hiddenFieldTime.setValue(this.lastLapValue);
		}
	},
	updateMarkerTime:function(time){
		this.updateMarkerPostion(this.time2deg(time));
	},
	updateTimeRunning:function(running, oldValue){
		if(running && this.getTime()>0){
			this.startTiming();
			this.startBgSound();
		}else{
			this.stopTiming(true);
			this.stopBgSound();;
		}
	},
	
	getMinutes:function(){
		if(!this.Minutes){
			this.Minutes = 0;
		}
		return Ext.String.leftPad(this.Minutes, 2, '0');
	},
	getSeconds:function(){
		if(!this.Seconds){
			this.Seconds = 0;
		}
		return Ext.String.leftPad(this.Seconds, 2, '0');
	},
	updateTimeText:function(){
		if(!this.minText){
			return;
		}
		this.minText.setHtml(this.getMinutes());
		this.secText.setHtml(':'+this.getSeconds());
	},
	updateTimeArcPostion:function(deg){
		if(!this.timerCircleBox){
			return;	
		}
		deg = this.adjustDeg(deg);
		if(deg>180){
			this.timerCircleBox.addCls('timer-pie180');
		}else{
			this.timerCircleBox.removeCls('timer-pie180');
		}
		this.timerPie1.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
	},
	updateMarkerPostion:function(deg){
		deg = this.adjustDeg(deg);
		this.marker.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
	},
	getXY:function(){
		var timerOuterBox = this.timerCircleBox.getBox();		
		return {x:timerOuterBox.x+(timerOuterBox.width/2), y:timerOuterBox.y+(timerOuterBox.height/2)};
	},
	rad2deg:function(radian){
		return radian * 180 / Math.PI % 360;
	},
	adjustDeg:function(deg){
		if(deg>360){
			deg	= deg-360;
		}
		return deg;
	},
	time2deg:function(time){
		return (360*time/this.getFullSeconds());
	},
	setLocalStoreValue:function(name, value){
		var appId = this.getAppId();	
		localStorage[appId+'timer_'+this.getName()+'_'+name] = value;	
		return value;		
	},
	getLocalStoreValue:function(name){
		var appId = this.getAppId();
		var v = localStorage[appId+'timer_'+this.getName()+'_'+name];
		if(v===undefined){
			return 0;
		}
		return v;
	},
	clearState:function(){
		this.setLocalStoreValue('time', 0);
		this.setLocalStoreValue('markerTime', 0);
		this.setLocalStoreValue('counts', 0);
		this.setLocalStoreValue('timeOnSetTime', 0);
		this.setLocalStoreValue('timeRunning', false);		
	},
	stopTimeUpSound:function(){
		var me = this;
		if(me.timeUpSound && me.timeUpSound.isPlaying()){
			me.timeUpSound.stop();	
		}
	},
	startTimeUpSound:function(silent){
		var me = this;
		me.stopBgSound();
		if(me.timeUpSound){
			if(silent){
				this.timeUpSound.setVolume(0);
			}else{
				this.timeUpSound.setVolume(1);	
			}
			me.timeUpSound.play();			
		}
	},
	stopBgSound:function(){
		var me = this;
		if(me.bgSound && me.bgSound.isPlaying()){
			me.bgSound.stop();	
		}
	},
	startBgSound:function(){
		var me = this;
		me.stopTimeUpSound();
		if(me.bgSound){
			me.bgSound.play();
		}
	},
	onTimeUp:function(){
		var me = this;
		me.startTimeUpSound();
		me.fireEvent('timeup');
	},
	destroy:function(){
		this.stopTiming();
		this.callParent();		
	},
	applyBottomHtml:function(html){
		if(html.length<1){
			return;	
		}		
		this.add({
			xtype:'component',
			docked:'bottom',
			cls:'bottomText',
			html:html
		});
	},
	applyTopHtml:function(html){
		if(html.length<1){
			return;	
		}
		this.add({
			xtype:'component',
			docked:'top',
			cls:'topText',
			html:html
		});
	}
});
