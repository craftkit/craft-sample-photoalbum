
window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.LeaveDialogProtocol = class LeaveDialogProtocol {
	
	showLeaveDialog(url){
		let modalViewController = new Craft.UI.ModalViewController();
		modalViewController.loadView();
		
		let dialog = new Demo.Album.LeaveDialog({
			url : url,
			closeHandler : () => {
				modalViewController.hideContent( () => {
					dialog.unloadView();
					modalViewController.unloadView();
				});
			}
		});
		dialog.loadView();
		
		modalViewController.setContent(dialog);
		
		Craft.Core.Context.getRootViewController().appendView(modalViewController);
		modalViewController.showContent();
	}
	
}
