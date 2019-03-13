
window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.ActionButton = class ActionButton extends Craft.Widget.QuickTools.IconButton {
	
	style(componentId){
		return　super.style(componentId) + `
			.root {
				font-size: 26px;
				color: ${Demo.Album.Config.foregroundColor};
			}
		`;
	}
	
}
