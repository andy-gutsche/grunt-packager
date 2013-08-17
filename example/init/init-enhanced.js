(function($){
	var projectInit = {
		immediate: function(){
			
			startGridHelper();
		},//END: projectInit.immediate
		domReadyOnce: function(){
			startSocialMedia();
		},//END: projectInit.domReadyOnce
		everyDomReady: function(context){
		
		} //END: projectInit.everyDomReady
	};
	
	
	
	window.loadSocialScript = (function(){
		var protocol = (location.protocol == 'https:') ? 'https://' : 'http://';
		return function(src, id){
			if(!id || !document.getElementById(id)){
				sssl(protocol+src, function(script){
					script.id = id;
					script = null;
				});
			}
		};
	})();
		
		
		
	

	
	function startSocialMedia(){
		
		
		/*twitter start*/
//		loadSocialScript('platform.twitter.com/widgets.js', 'twitter-wjs');
		/*twitter end*/
		
		/*facebook start*/
//		if(!$('#fb-root').length){
//			$('body').append('<div id="fb-root" />');
//		}
//		loadSocialScript('connect.facebook.net/de_DE/all.js#xfbml=1', 'facebook-jssdk');
		/*facebook end*/
	
		//loadSocialScript('apis.google.com/js/plusone.js', 'google-plus');
		
		
		/*		
		<div class="g-plusone" data-size="medium" data-annotation="inline" data-width="120"></div>
		<div class="fb-like" data-send="false" data-width="120" data-show-faces="false"></div>
		<a href="https://twitter.com/share" class="twitter-share-button" data-lang="de">Twittern</a>
		*/
		
		
	}
	
	function startGridHelper(){
		if(jspackager.querys.cssdevmode){
			sssl($.webshims.cfg.basePath + '../grid/grid-helper.js');
		}
	}
	/* starters */
	projectInit.immediate();
	$(projectInit.domReadyOnce);
	$(function(){
		projectInit.everyDomReady(document);
	});
})(window.webshims && webshims.$ || jQuery);
