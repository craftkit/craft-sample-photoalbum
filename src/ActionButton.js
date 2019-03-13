
import * as Craft from 'craft-uikit';
import * as QuickTools from 'craft-widget-quicktools';
Craft.usePackage(QuickTools);

import { Config } from './Config.js';

export class ActionButton extends Craft.Widget.QuickTools.IconButton {
	
	style(componentId){
		return　super.style(componentId) + `
			.root {
				font-size: 26px;
				color: ${Demo.Album.Config.foregroundColor};
			}
		`;
	}
	
}
