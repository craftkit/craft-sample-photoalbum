
import * as Craft from 'craft-uikit';
import * as NavigationGroup from 'craft-widget-navigationgroup';
import * as QuickTools from 'craft-widget-quicktools';
Craft.usePackage(NavigationGroup);
Craft.usePackage(QuickTools);

import { LeaveDialogProtocol } from './LeaveDialogProtocol.js';

export class Info extends Craft.Widget.NavigationGroup.Page {
	
	constructor(options){
		super();
		this.packagename = 'Demo.Album.Info';
		this.path        = "/#/Info/";
		
		this.github_page = 'https://github.com/craftkit/craft-uikit';
		
		// accept protocol: LeaveDialogProtocol
		this.showLeaveDialog = LeaveDialogProtocol.prototype.showLeaveDialog;
	}
	
	viewDidLoad(callback){
		let tipable_info = new Craft.Widget.QuickTools.TipsPanelable({
			text : 'Craft UIKit demo application (hover me).',
			tips : 'Hello, I am Craft-UIKit tips!',
		});
		tipable_info.loadView();
		this.shadow.getElementById('info').appendChild(tipable_info.view);
		if( callback ){ callback(); }
	}
	
	viewWillAppear(callback){
		this.viewController.Header.setTitle("Info");
		document.title = "Photo Album : Info";
		if( callback ){ callback(); }
	}
	
	style(componentId){
		return super.style(componentId) + `
			.root {
				padding: 44px;
				color: #000b3f;
				word-wrap: break-word;
				background-color: #fff;
			}
			@media screen and (max-width:600px){
				.root {
					padding: 44px 22px;
				}
			}
			.leave {
				color: blue;
				cursor: pointer;
				margin-top: 22px;
			}
		`;
	}
	
	template(componentId){
		return `
			<div class="root">
				<div id="info"></div>
				<div class="leave" onclick="${componentId}.showLeaveDialog('${this.github_page}')" title="GitHub">
					${this.github_page}
				</div>
			</div>
		`;
	}
	
}
