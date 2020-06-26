
import * as Craft from '@craftkit/craft-uikit';
import * as NavigationGroup from '@craftkit/craft-widget-navigationgroup';
import * as QuickTools from '@craftkit/craft-widget-quicktools';
Craft.usePackage(NavigationGroup);
Craft.usePackage(QuickTools);

import { Tools } from './Tools.js';

export class PostForm extends Craft.Widget.NavigationGroup.Page {
	
	constructor(options){
		super();
		this.packagename = 'Demo.Album.PostForm';
		
		this.path         = ''; // dont update url
		this.photoId      = options.photoId;
		this.closeHandler = options.closeHandler;
	}
	
	viewDidLoad(callback){
		this.postbtn = new Craft.Widget.QuickTools.PlainButton({
			label   : "Post",
			handler : () => { this.post(); }
		});
		this.postbtn.setViewController(this.viewController);
		
		this.appendView({
			target    : this.shadow.getElementById('btn'),
			component : this.postbtn
		});
	}
	
	post(callback){
		let message = JSON.stringify({
			message : this.shadow.getElementById("message").value,
			photoId : this.photoId
		});
		Tools.post("comments",message,(comments) => {
			Craft.Core.NotificationCenter.notify("should_update_comment");
			this.closeHandler();
			if( callback ){ callback(); }
		});
	}
	
	style(componentId){
		return super.style(componentId) + `
			.root {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				color: #000b3f;
				overflow: auto;
				-webkit-overflow-scrolling: touch;
				word-wrap: break-word;
				background-color: #fff;
			}
			.container {
				box-sizing: border-box;
				margin-top: 15px;
				margin-left: 44px;
				margin-right: 44px;
			}
			.textarea {
				box-sizing: border-box;
				padding: 11px;
				width:100%;
				border-width: 1px;
				border-color: #ccc;
				line-height: 28px;
				font-size: 16px;
				color: #555;
				resize: vertical;
			}
			@media screen and (max-width:600px){
				.container {
					box-sizing: border-box;
					margin-left: 22px;
					margin-right: 22px;
				}
			}
		`;
	}
	
	template(componentId){
		return `
			<div class="root">
				<div class="container">
					<textarea id="message" class="textarea" rows="4"></textarea>
					<div id="btn"></div>
				</div>
			</div>
		`;
	}

}
