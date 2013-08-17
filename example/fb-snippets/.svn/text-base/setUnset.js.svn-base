/**
 * @author alexander.farkas
 */
(function($){
	$.createSetUnsetFunction = function(obj){
		if(typeof obj == 'string'){
			var objPaths = obj.split('.');
			if(typeof window[objPaths[0]] == 'undefined'){
				window[objPaths[0]] = {};
			}
			obj = window[objPaths[0]];
			for(var i = 1, len = objPaths.length; i < len; i++){
				if(typeof obj[objPaths[i]] == 'undefined'){
					obj[objPaths[i]] = {};
				}
				obj = obj[objPaths[i]];
			}
		}
		return function(fillObj, valStr){
			var options = fillObj;
			if (typeof fillObj == 'string') {
				options = {};
				options[fillObj] = valStr;
			}
			for(name in options){
				if(typeof obj[name] == 'undefined'){
					obj[name] = options[name];
				}
			}
		};
	};
	
	$.i18n = (function(){
		
		var langs 	= {},
			defLang = 'de',
			active 	= $('html').attr('lang') || 'de'
		;
		
		function setActive(lang){
			active = lang;
		}
		
		function setDefault(lang){
			defLang = lang;
		}
				
		function setText(lang, name, text){
			if(arguments.length === 1 && typeof lang === 'object'){
				name = lang;
				lang = active;
			}

			if(text !== undefined){
				var o = {};
				o[name] = text;
				name = o;
			}
			
			if(!langs[lang]){
				langs[lang] = {};
			}
			
			for(var i in name){
				langs[lang][i] = name[i];
			}
		}
		
		function getText(lang, name){
			if(!name){
				name = lang;
				lang = active;
			}
			if(!langs[lang]){
				langs[lang] = {};
			}
			var ret = langs[lang][name];
			if(ret == null && langs[defLang]){
				ret = langs[defLang][name];
			}
			if(ret == null && window.jspackager && jspackager.devmode){
				console.log(name +" i18n not set", lang, name, langs);
			}
			return ret || name;
		}
		
		return {
			setActive: setActive,
			setDefault: setDefault,
			setText: setText,
			getText: getText
		};
	})();
})(window.webshims && webshims.$ || jQuery);