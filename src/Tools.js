
import * as Craft from '@craftkit/craft-uikit';

export var Tools = {
	
	get : function(url,callback){
		let http = new XMLHttpRequest();
		http.onload = (e) => { callback(http.response); };
		http.onerror = (e) => { alert('Cannot load'); };
		http.ontimeout = () => { alert('Timeout'); };
		http.open('GET',url);
		http.send();
	},
	
	post : function(url,message,callback){
		let http = new XMLHttpRequest();
		http.onload = (e) => { callback(http.response); };
		http.onerror = (e) => { alert('Cannot load'); };
		http.ontimeout = () => { alert('Timeout'); };
		http.open('POST',url);
		http.send(message);
	},
	
	KEYCODE : {
		ESC : 27,
	},
	
	getBasepathname : function(){
		let basepathname = window.location.pathname;
		if( basepathname.match(/\.html/) ){
			basepathname = basepathname.substr(0,basepathname.lastIndexOf('/'));
		}
		if( !basepathname.match(/\/$/) ){
			basepathname = basepathname + '/';
		}
		return basepathname;
	}
	
};
