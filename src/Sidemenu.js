
import * as Craft from 'craft-uikit';

import { Wall } from './Wall.js';
import { Info } from './Info.js';

export class Sidemenu extends Craft.UI.View {
	
	constructor(options){
		super();
		this.packagename = 'Demo.Album.Sidemenu';
	}
	
	openWall(){
		let component = new Wall({});
		Craft.Core.Context.getRootViewController().open({page:component});
		Craft.Core.Context.getRootViewController().toggleSidemenu();
	}
	
	openInfo(){
		let component = new Info({});
		Craft.Core.Context.getRootViewController().open({page:component});
		Craft.Core.Context.getRootViewController().toggleSidemenu();
	}
	
	style(componentId){
		return `
			* { 
				box-sizing:border-box;
			}
			:host {
				width: 100%;
				height: 100%;
				padding-top: 44px;
				padding-bottom: 44px;
				overflow-x: hidden;
				overflow-y: scroll;
				background-color: #fff;
				-webkit-overflow-scrolling: touch;
			}
			.root {
				width: 100%;
				height: 101%;
				margin-top: -1px;
				font-size: 18px;
				line-height: 42px;
				background-color: #fff;
			}
			.title {
				display : block;
				margin-left: 22px;
				margin-right: 22px;
				margin-bottom: 8px;
				padding-bottom: 5px;
				border-style: solid;
				border-width: 0px 0px 1px 0px;
				border-color: #004d40;
			}
			.item {
				margin-left: 22px;
				margin-right: 22px;
				cursor: pointer;
			}
			.item:hover {
				background-color: #d0d0d0;
			}
		`;
	}
	
	template(componentId){
		return `
			<div class="root">
				<div class="title">
					Photo Album
				</div>
				
				<div class="item" onclick="${componentId}.openWall();">
					Wall
				</div>
				
				<div class="item" onclick="${componentId}.openInfo();">
					Info
				</div>
			</div>
		`;
	}

}
