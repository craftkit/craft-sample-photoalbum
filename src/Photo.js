
import * as Craft from '@craftkit/craft-uikit';
import * as NavigationGroup from '@craftkit/craft-widget-navigationgroup';
import * as QuickTools from '@craftkit/craft-widget-quicktools';
Craft.usePackage(NavigationGroup);
Craft.usePackage(QuickTools);

import { LeaveDialogProtocol } from './LeaveDialogProtocol.js';
import { CommentList } from './CommentList.js';
import { Tools } from './Tools.js';
import { LicensePanel } from './LicensePanel.js';

export class Photo extends Craft.Widget.NavigationGroup.Page {
	
	constructor(options){
		super();
		
		this.basepathname = Tools.getBasepathname();
		
		this.packagename = 'Demo.Album.Photo';
		this.photoId     = options.photoId;
		this.photo       = ''; // photo definition get from remote api
		this.comments    = ''; // instance of Demo.Album.Comments
		this.path        = '/Photo/' + this.photoId;
		
		// prepare use of ActionPanel
		this.scrollListener = () => {
			Craft.Core.NotificationCenter.notify('Craft.Widget.QuickTools.ActionPanel.hidePanel');
		};
		
		// accept protocol: LeaveDialogProtocol
		this.showLeaveDialog = LeaveDialogProtocol.prototype.showLeaveDialog;
	}
	
	viewDidLoad(callback){
		// prepare comment area
		this.comments = new CommentList({
			photoId : this.photoId
		});
		this.comments.setViewController(this.viewController);
		this.comments.loadView();
		this.shadow.getElementById('comments').append(this.comments.view);
		
		this.shadow.getElementById('root').addEventListener('scroll',this.scrollListener);
		
		Tools.get("/data/"+this.photoId+".json",(data) => {
			this.photo = JSON.parse(data);
			
			this.shadow.getElementById('photo').innerHTML = this.templatePhoto(this.componentId);
			
			this.actionPanel = new Craft.Widget.QuickTools.ActionPanel();
			this.actionPanel.loadView();
			let actionPanelContent = new LicensePanel({
				license     : this.photo.license,
				cc          : this.photo.cc,
				delegate    : this,
				panel_width : '200px',
			});
			actionPanelContent.setViewController(this.viewController);
			actionPanelContent.loadView();
			this.actionPanel.setContent(actionPanelContent);
		});
		
		let tipable_info = new Craft.Widget.QuickTools.TipsPanelable({
			text : 'Craft UIKit demo application (hover me).',
			tips : 'Hello, I am Craft-UIKit tips!',
		});
		tipable_info.loadView();
		this.shadow.getElementById('info').appendChild(tipable_info.view);
		
		if( callback ){ callback(); }
	}
	
	viewWillAppear(callback){
		this.viewController.Header.setTitle("Photo " + this.photoId);
		document.title = "Photo Album : Photo " + this.photoId;
		
		this.comments.viewWillAppear();
		if( callback ){ callback(); }
	}
	
	viewDidAppear(callback){
		this.comments.viewDidAppear();
		if( callback ){ callback(); }
	}
	
	viewWillDisappear(callback){
		this.shadow.getElementById('root').removeEventListener('scroll',this.scrollListener);
		
		this.comments.viewWillDisappear();
		if( callback ){ callback(); }
	}
	
	setViewController(viewController){
		this.viewController = viewController;
		if( this.comments.isViewLoaded ){
			this.comments.setViewController(this.viewController);
		}
	}
	
	showInfoPanel(target){
		this.actionPanel.showPanel({
			target     : target,
			top_margin : 7
		});
	}
	
	style(componentId){
		return super.style(componentId) + `
			.root {
				color: #000b3f;
				background-color: #fff;
				${ Craft.UI.Device.hasDisplayCutout() 
					? `padding-left: calc( 5px + env(safe-area-inset-left) );
					   padding-right: calc( 5px + env(safe-area-inset-right) );`
					: `padding-left: 5px;
					   padding-right: 5px`
				}
			}
			.container {
				margin: 0 auto;
				padding: 15px 5px 5px 5px;
				width: 90%;
				background-color: #fff;
			}
			@media screen and (max-width:600px){
				#container {
					font-size: 14px;
				}
			}
			.leave {
				color: blue;
				cursor: pointer;
			}
		`;
	}
	
	templatePhoto(componentId){
		return `
			<div>
				<img src="/photo/${this.photo.image}" width="100%">
			</div>
			<div>
				shot by : <span class="leave" onclick="${componentId}.showLeaveDialog('${this.photo.page}')" title="${this.photo.page}">${this.photo.photographer}</span><br>
				license : <span class="leave" onclick="${componentId}.showInfoPanel(this)" title="${this.photo.cc}">${this.photo.license}</span>
			</div>
		`;
	}
	
	template(componentId){
		return `
			<div id="root" class="root">
				<div id="container" class="container">
					<div id="photo"></div>
					<div id="comments" style="margin-bottom:44px;"></div>
					<div id="info"></div>
				</div>
			</div>
		`;
	}
	
}
