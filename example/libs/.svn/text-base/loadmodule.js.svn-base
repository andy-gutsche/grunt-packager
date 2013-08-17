/**
 * loadModule
 * 
 * @param {string} module name des modules 
 */

/**
 * loadMoule.define
 * 
 * @param {string} module name des modules 
 * @param {string|array} optional srces
 
 
 */

/**
 * loadMoule.promise
 * 
 * @param {string} module name des modules 
 * @param {string|array} optional srces
 */



(function($){
	var loadedModules = {};
	var loadedSrces = {};
	var moduleDefs = {};
	
	var modulePromises = {};
	var srcPromises = {};
	var getSrcPromise = function(name){
		if(!srcPromises[name]){
			srcPromises[name] = $.Deferred();
		}
		return srcPromises[name];
	};
	
	var loadModule = function(module){
		if(loadedModules[module]){return;}
		loadedModules[module] = true;
		if(!moduleDefs[module]){
			if(window.console){
				console.log("no module with the name: "+ module);
			}
		} else {
			if(moduleDefs[module]._startCallback){
				moduleDefs[module]._startCallback();
			}
			$.each(moduleDefs[module], function(i, src){
				if(!loadedSrces[src]){
					$.webshims.loader.loadScript(src, function(){
						getSrcPromise(src).resolve();
					});
				}
				loadedSrces[src] = true;
			});
			addFoucClass(module);
		}
		
	};
	var addFoucClass = (function(){
		var init, timer, block;
		var modules = {};
		var removeFoucClass = function(){
			clearTimeout(timer);
			block = true;
			$('html').removeClass('loading-modules');
			console.log('removed')
			
		};
		var testLoading =  function(){
			var stop = true;
			if(block){return;}
			$.each(modules, function(name){
				if(loadModule.promise(name).state() == 'pending'){
					stop = false;
					return false;
				}
			});
			if(stop){
				removeFoucClass();
			}
		};
		return function(module){
			if(loadModule.foucTimer && !$.isDOMReady && !$.isReady && !block && !modules[module]){
				if(!init){
					init = true;
					$('html').addClass('loading-modules');
					if(loadModule.foucTimer > 400){
						loadModule.foucTimer = 400;
					}
					timer = setTimeout(removeFoucClass, loadModule.foucTimer);
				}
				modules[module] = module;
				loadModule.promise(module).always(testLoading);
			}
		};
	})();
	
	loadModule.foucTimer = 0;//200
	
	loadModule.promise = function(module){
		var origPromise, delayedDeferred;
		if(!moduleDefs[module]){
			if(window.console){
				console.log("no module with the name: "+ module);
			}
			return $.Deferred().promise();
		} else {
			if(!modulePromises[module]){
				modulePromises[module] = $.when.apply($, $.map(moduleDefs[module], function(src){
					return getSrcPromise(src);
				}));
				
				if(window.jspackager && jspackager.devmode){
					origPromise = modulePromises[module];
					delayedDeferred = $.Deferred();
					origPromise.done(function(){
						setTimeout(function(){
							delayedDeferred.resolve();
						}, 999);
					});
					modulePromises[module] = delayedDeferred.promise();
					if(window.console){
						console.log("module promises currently do not always work with devmode. promise for: "+ module);
					}
				}
			}
			if(!loadedModules[module]){
				loadModule(module);
				if(window.console){
					console.log("requested promise for "+ module +". Module wasn't started. Begin download delayed.");
				}
			}
			return modulePromises[module];
		}
	};
	
	
	loadModule.define = function(name, srces, fn){
		if(typeof srces == 'string'){
			srces = [srces];
		}
		if(!srces){
			srces = [];
		}
		srces._startCallback = fn;
		moduleDefs[name] = srces;
	};
	
	window.loadModule = loadModule;
	
})(window.webshims && webshims.$ || jQuery);
