/**
 * @author alexander.farkas
 * @version 1.3
 * @updated 11.10.2012
 * @changes now supports height in media-queries
 */
(function($){
	if($.enableMediaQuery || window.respond){
		if(window.console){
			window.console.log('mediaqueries polyfill already included abort');
		}
		return;
	}
	/*-
	* arrayInString(str, arr)
	[ function (static) ]
	* checkes if a given string is in a certain array
	> Arguments
	- str (string) the string to look for
	- arr (array) the array to look in
	= (boolean) if it is in or not
	*/
	$.arrayInString = function(str, arr){
		var ret = -1;
		$.each(arr, function(i, item){
			if (str.indexOf(item) != -1) {
				ret = i;
				return false;
			}
		});
		return ret;
	};
	$.enableMediaQuery = (function(){
		var styles = [], styleLinks, date = new Date().getTime();
		function parseMedia(link, type){
			var medias = link.getAttribute('media'),
				// use regexp constructor here, to allow string manip on it.
				pMin = new RegExp('\\(\\s*min-'+type+'\\s*:\\s*(\\d+)px\\s*\\)', ''),
				pMax = new RegExp('\\(\\s*max-'+type+'\\s*:\\s*(\\d+)px\\s*\\)', ''),
				resMin,
				resMax,
				supportedMedia = ['handheld', 'all', 'screen', 'projection', 'tty', 'tv', 'print'],
				curMedia,
				mediaString = [];
				medias = (!medias) ? ['all'] : medias.split(',');

			for (var i = 0, len = medias.length; i < len; i++) {
				curMedia = $.arrayInString(medias[i], supportedMedia);

				if (curMedia != -1) {

					curMedia = supportedMedia[curMedia];
					if (!resMin) {
						resMin = pMin.exec(medias[i]);
						if (resMin) {
							resMin = parseInt(resMin[1], 10);
						}
					}
					if (!resMax) {
						resMax = pMax.exec(medias[i]);
						if (resMax) {
							resMax = parseInt(resMax[1], 10);
						}
					}
					mediaString.push(curMedia);
				}
			}
			if (resMin || resMax) {
				styles.push({
					obj: link,
					min: resMin,
					max: resMax,
					medium: mediaString.join(','),
					type: type,
					used: false
				});
			}
			return true;
		}

		return {
			/*-
			* init
			[ function ($.enableMediaQuery) ]
			* initializes the mediaQuery event handler
			*/
			init: function(){
				if (!styleLinks && !Modernizr.mediaqueries && !window.respond) {
					var resizeTimer;
					styleLinks = $('link[rel*=style]').each(function(i, link) {
						$.each(['height', 'width'], function(j, type) {
							parseMedia(link, type);
						});
					});
					$.enableMediaQuery.adjust();
					$(window).bind('resize.mediaQueries', function(){
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout( $.enableMediaQuery.adjust , 29);
					});
				}
			},
			/*-
			* adjust()
			[ function ($.enableMediaQuery) ]
			* checks if a media Query should be (de-)activated.
			* uses it if so
			*/
			adjust: function(){
				var width		= $(window).width(),
					height		= $(window).height(),
					addStyles	= [],
					changeQuery,
					shouldUse,
					i, len
				;

				for (i = 0, len = styles.length; i < len; i++) {
					shouldUse = !styles[i].obj.disabled &&
									(
										(
											styles[i].type === 'width' &&
											!(styles[i].min && styles[i].min > width) &&
											!(styles[i].max && styles[i].max < width)
										) || (
											styles[i].type === 'height' &&
											!(styles[i].min && styles[i].min > height) &&
											!(styles[i].max && styles[i].max < height)
										) ||
										(!styles[i].max && !styles[i].min)
									);
					if ( shouldUse ) {
						var n = styles[i].obj.cloneNode(true);
						n.setAttribute('media', styles[i].medium);
						n.className = 'insertStyleforMedia' + date;
						addStyles.push(n);
						if( !styles[i].used ){
							styles[i].used = true;
							changeQuery = true;
						}
					} else if( styles[i].used !== shouldUse ){
						styles[i].used = false;
						changeQuery = true;
					}
				}

				if(changeQuery){
					$('link.insertStyleforMedia' + date).remove();
					var head = document.getElementsByTagName('head');
					for(i = 0, len = addStyles.length; i < len; i++){
						head[0].appendChild(addStyles[i]);
					}
					//repaint
					$('body').css('zoom', '1').css('zoom', '');
				}
			}
		};
	})();
	setTimeout(function(){
		try {
			$.enableMediaQuery.init();
		} catch (e) {}
	}, 9);
	$(function(){
		$.enableMediaQuery.init();
	});
})(window.webshims && webshims.$ || jQuery);
