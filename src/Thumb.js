
import * as Craft from 'craft-uikit';

export class Thumb extends Craft.UI.View {
	
	constructor(options){
		super();
		this.packagename = 'Demo.Album.Thumb';
		this.photo = options.photo;
	}
	
	openPhoto(id){
		this.viewController.open(new Demo.Album.Photo({ photoId:id }));
	}
	
	style(componentId){
		return `
			* { 
				box-sizing:border-box; margin:0; padding:0;
			}
			.root {
				margin-top: 8px;
				margin-left: 4px;
				margin-right: 4px;
				cursor: pointer;
				overflow: hidden;
				font-size: 12px;
				color: #fff;
				background-color: #f0f0f0;
				${ Craft.UI.Device.hasDisplayCutout() 
					? `width: calc( (100vw/2) - 8px - env(safe-area-inset-left)/2 - env(safe-area-inset-right)/2 );
					   height: calc( (100vw/2) - 8px - env(safe-area-inset-left)/2 - env(safe-area-inset-right)/2 );`
					: `width: calc( (100vw/2) - 8px );
					   height: calc( (100vw/2) - 8px );`
				}
			}
			.mask {
				position: relative;
				width: 100%;
				height: 100%;
				background: linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,.80) 100%);
			}
			.text {
				position: absolute;
				bottom: 8px;
				margin-left: 8px;
				margin-right: 8px;
				text-align: left;
				vertical-align: bottom;
			}
		`;
	}
	
	template(componentId){
		let photo = this.photo;
		return `
			<div class="root" onclick="${componentId}.openPhoto('${photo.id}');" style="background:url(/photo/${photo.img}) center; background-size:cover;">
				<div class="mask">
					<div class="text">
						&copy; ${photo.photographer}
					</div>
				</div>
			</div>
		`;
	}
	
}
