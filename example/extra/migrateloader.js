if(window.jspackager && jspackager.querys.devmode == 'migrate' && jQuery.webshims){
	document.write('<script src="'+jQuery.webshims.cfg.basePath+'../extra/jquery-migrate.js"></script>');
}