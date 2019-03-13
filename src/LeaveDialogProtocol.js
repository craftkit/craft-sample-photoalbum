
import * as Craft from 'craft-uikit';

import { LeaveDialog } from './LeaveDialog.js';

export class LeaveDialogProtocol {
	
	showLeaveDialog(url){
		let modalViewController = new Craft.UI.ModalViewController();
		modalViewController.loadView();
		
		let dialog = new LeaveDialog({
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
