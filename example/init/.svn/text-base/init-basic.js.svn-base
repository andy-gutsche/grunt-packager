(function($){
	var projectInit = {
		immediate: function(){
			//$.noConflict();
			
			
			/**
			 * configure webshims
			 * 
			 */
			$.webshims.debug = window.jspackager.devmode ? 'noCombo' : undefined;
			$.webshims.setOptions({
				extendNative: false,
				useStrict: true,
				forms: {
//					lazyCustomMessages: true
//					,customDatalist: !Modernizr.mobile
//					,customMessages: true
				},
				'forms-ext': {
//					replaceUI: !Modernizr.mobile
				},
				track: {
					override: !Modernizr.mobile
				}
				//,addCacheBuster: '?view=unrender&amp;v=10' //good for gsb
			});
			//END: webshims
			
			
				
			/**
			 * define modules in capable browsers (IE8+)
			 */
			if(Modernizr.boxSizing || Modernizr['display-table'] || Modernizr.mediaqueries || Modernizr.geoloaction || $.support.getSetAttribute){
				//um eventuelle foucs zu umgehen. timer setzen und im css html.loading-modules > body {visibility: hidden;}
				//loadModule.foucTimer = 200;
				//script src wird relative zum shims ordner ($.webshims.cfg.basePath) angegeben
				loadModule.define('enhanced-modules', '../__enhanced-modules.js');
				
				if(!$.enableMediaQuery &&  !Modernizr.mediaqueries && !window.respond){
					loadModule.define('mediaqueries-modules', '../extra/jquery.mediaqueries.js');
				}
				
				
//				loadModule.define('lightbox', '../__lightbox-modules.js');
//				loadModule.define('gallery', ['../__lightbox-modules.js', '../__scroller-modules.js']);
				
				/**
				 * Modernizr.mobile = mobile/touch input berücksichtigt max-device-width, touch support und user agent string
				 */
//				if(Modernizr.mobile){
//					loadModule.define('mediaelement');
//					loadModule.define('mobile-modules', '../__mobile-modules.js');
//				} else {
//					loadModule.define('mediaelement', '../__jme-modules.js');
//					loadModule.define('desktop-modules', '../__desktop-modules.js');
//				}
			}



			/**
			 * Load modules
			 * 
			 * possible features: mediaelement | forms | forms-ext | canvas | json-storage | es5 | geolocation | details | dom-support | track
			 */
			$.webshims.polyfill('es5');
			
			loadModule('mediaqueries-modules');
			loadModule('enhanced-modules');
			
			
			/**
			 * loadModule.promise('enhanced-modules').always(function(){
			 * 		//enhanced-modules are loaded
			 * });
			 */
			
		},//END: projectInit.immediate
		domReadyOnce: function(){
			
		},//END: projectInit.domReadyOnce
		everyDomReady: function(context){
		
		} //END: projectInit.everyDomReady
	};
	
	
	/* starters */
	projectInit.immediate();
	$(projectInit.domReadyOnce);
	$(function(){
		projectInit.everyDomReady(document);
	});
})(window.webshims && webshims.$ || jQuery);
