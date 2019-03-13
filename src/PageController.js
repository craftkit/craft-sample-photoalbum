
import * as Craft from 'craft-uikit';
import * as NavigationGroup from 'craft-widget-navigationgroup';
Craft.usePackage(NavigationGroup);

import { Config } from './Config.js';
import { Photo } from './Photo.js';
import { Wall } from './Wall.js';
import { Info } from './Info.js';

export class PageController extends Craft.Widget.NavigationGroup.ViewController {
	
	viewDidLoad(callback){
		super.viewDidLoad();
		
		this.Header.view.style['background-color'] = Config.backgroundColor;
		this.Footer.view.style['background-color'] = Config.backgroundColor;
		this.Header.title.style['color']           = Config.foregroundColor;
		this.BackButton.view.style['color']        = Config.foregroundColor;
		this.MenuButton.view.style['color']        = Config.foregroundColor;
		
		if(callback){ callback(); }
	}
	
	resolveRoutingRequest(path,event){
		if( !path ){ path = ''; }
		
		let type     = '';
		let argument = '';
		let query    = '';
		
		let match = path.match(/(\w*)\/([^\s\?]*)[\/\?]*(.*)/);
		
		if( match ){
			type     = match[1]; // Wall|Photo
			argument = match[2]; // should be photo_id
			query    = match[3]; // should be search query for Wall
		}
		
		let component;
		
		switch(type){
			
			case 'Photo':
				// 
				// /#/Photo/<argument>
				// 
				component = new Photo({
					photoId : argument,
				});
				this.open(component);
				
				break;
				
			case 'Wall':
				// 
				// /#/Wall?<query>
				// 
				component = new Wall({
					query : query,
				});
				this.open(component);
				
				break;
				
			case 'Info':
				
				// 
				// /#/Info/
				// 
				component = new Info({});
				this.open(component);
				
				break;
				
			default:
				
				component = new Wall({});
				this.open(component);
				
				break;
			
		}
	}
	
}