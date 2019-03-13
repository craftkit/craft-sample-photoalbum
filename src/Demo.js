
const Demo = { Album: {} };

import { App } from './App.js';
import { Config } from './Config.js';
import { PageController } from './PageController.js';
import { Sidemenu } from './Sidemenu.js';
import { Wall } from './Wall.js';
import { Thumb } from './Thumb.js';
import { Photo } from './Photo.js';
import { Info } from './Info.js';
import { Tools } from './Tools.js';
import { CommentList } from './CommentList.js';
import { Comment } from './Comment.js';
import { PostForm } from './PostForm.js';
import { LeaveDialog } from './LeaveDialog.js';
import { LeaveDialogProtocol } from './LeaveDialogProtocol.js';
import { LicensePanel } from './LicensePanel.js';
import { ActionButton } from './ActionButton.js';

Demo.Album = {
	App                 : App,
	Config              : Config,
	PageController      : PageController,
	Sidemenu            : Sidemenu,
	Wall                : Wall,
	Thumb               : Thumb,
	Photo               : Photo,
	Info                : Info,
	Tools               : Tools,
	CommentList         : CommentList,
	Comment             : Comment,
	PostForm            : PostForm,
	LeaveDialog         : LeaveDialog,
	LeaveDialogProtocol : LeaveDialogProtocol,
	LicensePanel        : LicensePanel,
	ActionButton        : ActionButton
};

export default Demo;

