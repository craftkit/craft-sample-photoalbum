
// 
// PhotoAlbum App booter
// 

window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.App = {
	
	didBootApplication : function(env){
		
		Craft.Core.Defaults.BASE_DIV_NAME = 'CraftRoot';
		Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT = true;
		Craft.Core.KeyboardManager.activate();
		
		let rootViewController = new Demo.Album.PageController({
			enableHeader   : true,
			enableFooter   : true,
			enableSidemenu : true,
			config         : { Sidemenu : { width:'250px' } }
		});
		Craft.Core.Context.setRootViewController(rootViewController);
		
		let sidemenu = new Demo.Album.Sidemenu();
		rootViewController.setSidemenu(sidemenu);
		
		rootViewController.bringup();
	}
	
};
