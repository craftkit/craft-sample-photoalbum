
window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.LicensePanel = class LicensePanel extends Craft.UI.View {
	
	constructor(options){
		super();
		
		this.packagename = 'Demo.Album.LicensePanel';
		this.license     = options.license;
		this.cc          = options.cc;
		this.delegate    = options.delegate;
	}
	
	showLeaveDialog(){
		this.delegate.showLeaveDialog(this.cc);
		this.delegate.actionPanel.hidePanel();
	}
	
	style(componentId){
		return `
			.root {
				display: inline-block;
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
				padding: 22px;
			}
			@media screen and (max-width:600px){
				.container {
					margin-left: 11px;
					margin-right: 11px;
				}
			}
			.leave {
				color: blue;
				cursor: pointer;
				margin-top: 11px;
			}
		`;
	}
	
	template(componentId){
		return `
			<div class="root">
				<div class="container"> 
					License: ${this.license}
					
					<div class="leave" onclick="${componentId}.showLeaveDialog();">
					show dtail page of creative commons license.
					</div>
				</div>
			</div>
		`;
	}
	
}
