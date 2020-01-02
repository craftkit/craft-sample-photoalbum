
import * as Craft from '@craftkit/craft-uikit';

export class Comment extends Craft.UI.View {
	
	constructor(options){
		super();
		this.packagename = 'Demo.Album.Comment';
		this.photoId     = options.photoId;
		this.comment     = options.comment;
	}
	
	style(componentId){
		return `
			.root { 
				display:flex;
				flex-direction:row; 
				line-height:28px;
				font-size:16px;
			}
		`;
	}
	
	template(componentId){
		let comment = this.comment;
		return `
			<div class="root">
				<div style="margin-right:10px;">&#x1F4C4;</div>
				<div>${comment.message}</div>
			</div>
		`;
	}
	
}
