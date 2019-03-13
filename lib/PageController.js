
window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.PageController = class PageController extends Craft.Widget.NavigationGroup.ViewController {
	
	viewDidLoad(callback){
		super.viewDidLoad();
		
		this.Header.view.style['background-color'] = Demo.Album.Config.backgroundColor;
		this.Footer.view.style['background-color'] = Demo.Album.Config.backgroundColor;
		this.Header.title.style['color']           = Demo.Album.Config.foregroundColor;
		this.BackButton.view.style['color']        = Demo.Album.Config.foregroundColor;
		this.MenuButton.view.style['color']        = Demo.Album.Config.foregroundColor;
		
		if(callback){ callback(); }
	}
	
	resolveRoutingRequest(path,event){
		if( !path ){ path = ''; }
		
		let type     = '';
		let argument = '';
		let query    = '';
		
		let match = path.match(/(\w*)\/([^\s\?]*)[\/\?]*(.*)/);
		
		if( match ){
			type     = match[1]; // Wall|Photo
			argument = match[2]; // should be photo_id
			query    = match[3]; // should be search query for Wall
		}
		
		let component;
		
		switch(type){
			
			case 'Photo':
				// 
				// /#/Photo/<argument>
				// 
				component = new Demo.Album.Photo({
					photoId : argument,
				});
				this.open(component);
				
				break;
				
			case 'Wall':
				// 
				// /#/Wall?<query>
				// 
				component = new Demo.Album.Wall({
					query : query,
				});
				this.open(component);
				
				break;
				
			case 'Info':
				
				// 
				// /#/Info/
				// 
				component = new Demo.Album.Info({});
				this.open(component);
				
				break;
				
			default:
				
				component = new Demo.Album.Wall({});
				this.open(component);
				
				break;
			
		}
	}
	
}
