(function(){
	var scriptId = new Date().getTime();
	
	var load = function(src, fn){
		var localScriptName;
		document.write('<scr'+'ipt src="'+ src +'"><\/scr'+'ipt>');
		if(fn){
			scriptId++;
			localScriptName = 'blockSsslCallback'+scriptId;
			window[localScriptName] = function(){
				console.log('do not use a callback!!!');
				if (fn) {
					fn(src);
				}
				if(window[localScriptName]){
					delete window[localScriptName];
				}
			};
			document.write('<scr'+'ipt>if(window.'+ localScriptName +'){window.'+ localScriptName +'();}<\/scr'+'ipt>');
		}
	};
	window.blockSssl = function(srces, fn){
		if(typeof srces == 'string'){
			load(srces, fn);
			return;
		}
		var src = srces.shift();
		load(src, function(){
			if(srces.length){
				window.blockSssl(srces, fn);
			} else {
				fn && fn();
			}
		});
	};
	window.lazySssl = function(){
		var args = arguments;
		var that = this;
		setTimeout(function(){
			window.sssl.apply(that, args);
		}, 0);
	};
})();
