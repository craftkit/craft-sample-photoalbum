
import * as Craft from 'craft-uikit';
import * as NavigationGroup from 'craft-widget-navigationgroup';
import * as QuickTools from 'craft-widget-quicktools';
Craft.usePackage(NavigationGroup);
Craft.usePackage(QuickTools);

import { ActionButton } from './ActionButton.js';
import { Config } from './Config.js';
import { Tools } from './Tools.js';
import { Photo } from './Photo.js';

export class Wall extends Craft.Widget.NavigationGroup.Page {
	
	constructor(options){
		super();
		
		this.basepathname = Tools.getBasepathname();
		
		this.packagename = 'Demo.Album.Wall';
		this.path        =  this.basepathname + '#/Wall/';
		this.list        = ''; // list of photo got from the remote api
		this.Thumbs      = {}; // photo.id to Thumb instance map
		
		if( options.query ){
			let direction = options.query.substr(options.query.indexOf('=')+1);
			if( direction == 'desc' || direction == 'asc' ){
				this.direction = direction;
				this.path += '?' + options.query;
			}
		}
	}
	
	viewDidLoad(callback){
		this.sortActionSheet = new Craft.Widget.QuickTools.ActionSheet({ 
			iconSource : 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
			actions:[
				{
					icon    : "fa fa-sort-numeric-desc",
					title   : "Sort by photoID (Desc)",
					handler : () => {
						this.sort('desc');
						Craft.Core.Context.getRootViewController().pushState(); // push this.path to the history
					}
				},
				{
					icon    : "fa fa-sort-numeric-asc",
					title   : "Sort by photoID (Asc)",
					handler : () => {
						this.sort('asc');
						Craft.Core.Context.getRootViewController().pushState(); // push this.path to the history
					}
				}
			]
		});
		this.actionBtn = new ActionButton({
			iconSource : 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
			icon       : "fa fa-ellipsis-v",
			handler    : () => { this.openActionSheet(); }
		});
	}
	
	viewWillAppear(callback){
		this.viewController.Header.setTitle("Wall");
		document.title = "Photo Album : Wall";
		
		if( callback ){ callback(); }
	}
	
	viewDidAppear(callback){
		if( !this.list ){
			this.load( () => {
				this.showPhotos();
			});
		}else{
			this.showPhotos();
		}
		this.viewController.Footer.setRightButtons([this.actionBtn]);
		
		if( callback ){ callback(); }
	}
	
	viewWillDisappear(callback){
		this.viewController.Footer.clearRightButtons();
		if( callback ){ callback(); }
	}
	
	load(callback){
		Tools.get("data/list.json",(data) => {
			this.list = JSON.parse(data);
			callback();
		});
	}
	
	showPhotos(){
		if( this.direction ){
			this.sort(this.direction);
		}else{
			this.deployThumbs(this.list);
		}
	}
	
	deployThumbs(photos){
		let placeholder = this.shadow.getElementById('root');
		for( let i=0; i<this.list.length; i++ ){
			let photo = this.list[i];
			let thumb; 
			if( this.Thumbs[photo.id] ){
				thumb = this.Thumbs[photo.id];
			}else{
				thumb = new Demo.Album.Thumb({photo:photo});
				thumb.setViewController(this.viewController);
				thumb.loadView();
				this.Thumbs[photo.id] = thumb;
			}
			placeholder.appendChild(thumb.view);
		}
	}
	
	sort(direction){
		if( direction == 'asc' ){
			this.list.sort( (a,b) => { return Number(a.id) - Number(b.id); } );
			this.direction = "asc";
			this.path = this.basepathname + "#/Wall/?sort=asc";
			document.title = "Photo Album : Wall (asc)";
		}else{
			this.list.sort( (a,b) => { return Number(b.id) - Number(a.id); } );
			this.direction = "desc";
			this.path = this.basepathname + "#/Wall/?sort=desc";
			document.title = "Photo Album : Wall (desc)";
		}
		this.deployThumbs(this.list);
	}
	
	openPhoto(id){
		let component = new Photo({
			photoId : id,
		});
		Craft.Core.Context.getRootViewController().open({page:component});
	}
	
	openActionSheet(){
		let modalViewController = new Craft.UI.ModalViewController();
		modalViewController.loadView();
		modalViewController.setContent(this.sortActionSheet);
		Craft.Core.Context.getRootViewController().appendView(modalViewController);
		
		this.sortActionSheet.closeHandler = () => { modalViewController.unloadView(); };
		
		modalViewController.showContent();
	}
	
	style(componentId){
		return super.style(componentId) + `
			.root {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: left;
				margin-left: auto;
				margin-right: auto;
				color: #000b3f;
				${ Craft.UI.Device.hasDisplayCutout() 
					? `padding-left: env(safe-area-inset-left);
					   padding-right: env(safe-area-inset-right);`
					: ``
				}
			}
		`;
	}
	
	template(componentId){
		return `
			<div id="root" class="root"></div>
		`;
	}
	
}
