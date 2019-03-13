
window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.CommentList = class CommentList extends Craft.UI.View {
	
	constructor(options){
		super();
		this.packagename = 'Demo.Album.CommentList';
		
		this.photoId     = options.photoId;
		this.comments    = [];
		this.CommentsMap = {};
		
		this.should_update_comment_listener = '';
	}
	
	viewDidLoad(callback){
		this.postbtn = new Craft.Widget.QuickTools.PlainButton({
			label   : "Post comment",
			handler : () => { this.openPostForm() } // you should wrap your method so that handler can resolve 'this'
		});
		this.postbtn.setViewController(this.viewController);
		this.postbtn.loadView();
		this.shadow.getElementById("btn").appendChild(this.postbtn.view);
	}
	
	viewWillAppear(callback){
		this.should_update_comment_listener = Craft.Core.NotificationCenter.listen("should_update_comment", () => {
			this.load( () => {
				this.renderComments(this.comments); 
			});
		});
		if( callback ){ callback(); }
	}
	
	viewDidAppear(callback){
		this.load( () => {
			this.renderComments(this.comments); 
			if( callback ){ callback(); }
		});
	}
	
	viewWillDisappear(callback){
		Craft.Core.NotificationCenter.remove("should_update_comment",this.should_update_comment_listener);
		if( callback ){ callback(); }
	}
	
	load(callback){
		let target = this.photoId + ".json";
		Demo.Album.Tools.ajax("/comments/"+target,(comments) => {
			if( comments ){
				this.comments = JSON.parse(comments);
			}
			if( callback ){ callback(); }
		});
	}
	
	renderComments(comments){
		let placeholder = this.shadow.getElementById('comments');
		for( let i=0; i<this.comments.length; i++ ){
			let comment = this.comments[i];
			if( !this.CommentsMap[comment.id] ){
				let view = new Demo.Album.Comment({comment:comment});
				view.loadView();
				this.CommentsMap[comment.id] = view;
				placeholder.appendChild(view.view);
			}
		}
	}
	
	openPostForm(){
		let modalViewController = new Craft.UI.ModalViewController();
		modalViewController.loadView();
		
		// instance of Craft.Widget.NavigationGroup.Page should be without isViewLoaded. ViewController do it.
		let postForm = new Demo.Album.PostForm({
			photoId : this.photoId,
			closeHandler : () => {
				modalViewController.hideContent( () => {
					postForm.unloadView();
					modalViewController.unloadView();
				});
			}
		});
		
		let navi = new Craft.Widget.NavigationGroup.ViewController({
			page           : postForm,
			enableHeader   : true,
			enableFooter   : false,
			enableSidemenu : false,
			config         : {}
		});
		navi.loadView();
		navi.Header.setTitle("Post your comment");
		navi.Header.view.style['background-color'] = Demo.Album.Config.backgroundColor;
		navi.Header.title.style['color']           = Demo.Album.Config.foregroundColor;
		
		let closebutton = new Craft.Widget.NavigationGroup.CloseButton({
			action : () => {
				modalViewController.hideContent( () => {
					navi.unloadView();
					modalViewController.unloadView();
				});
			}
		});
		closebutton.loadView();
		closebutton.view.style['color'] = Demo.Album.Config.foregroundColor;
		navi.Header.setRightButtons([closebutton]);
		
		modalViewController.setContent(navi);
		modalViewController.container.style['background-color'] = Demo.Album.Config.backgroundColor; // fill safe area with header color
		
		Craft.Core.Context.getRootViewController().appendView(modalViewController);
		modalViewController.showContent();
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
			}
		`;
	}
	
	template(componentId){
		return `
			<div class="root">
				<div id="comments"></div>
				<div id="btn"></div>
			</div>
		`;
	}
	
}
