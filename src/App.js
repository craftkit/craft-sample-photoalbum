
// 
// PhotoAlbum App booter
// 

import * as Craft from '@craftkit/craft-uikit';

import { PageController } from './PageController.js';
import { Sidemenu } from './Sidemenu.js';

export var App = {
	
	router : Craft.Core.HashRouter,
	//router : Craft.Core.PathRouter,
	
	didBootApplication : function(env){
		
		Craft.Core.Defaults.BASE_DIV_NAME = 'CraftRoot';
		Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT = true;
		Craft.Core.KeyboardManager.activate();
		
		let rootViewController = new PageController({
			enableHeader   : true,
			enableFooter   : true,
			enableSidemenu : true,
			config         : { Sidemenu : { width:'250px' } }
		});
		Craft.Core.Context.setRootViewController(rootViewController);
		
		let sidemenu = new Sidemenu();
		rootViewController.setSidemenu(sidemenu);
		
		rootViewController.bringup();
	}
	
};
