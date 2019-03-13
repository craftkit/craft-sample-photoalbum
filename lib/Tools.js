
window.Demo = window.Demo || {};
window.Demo.Album = window.Demo.Album || {};

Demo.Album.Tools = {
	
	ajax : function(url,callback){
		let http = new XMLHttpRequest();
		http.onload = (e) => { callback(http.responseText); };
		http.onerror = (e) => { alert('Cannot load'); };
		http.ontimeout = () => { alert('Timeout'); };
		http.open('GET',url);
		http.send();
	},
	
	post : function(url,message,callback){
		let http = new XMLHttpRequest();
		http.onload = (e) => { callback(http.responseText); };
		http.onerror = (e) => { alert('Cannot load'); };
		http.ontimeout = () => { alert('Timeout'); };
		http.open('POST',url);
		http.send(message);
	},
	
	KEYCODE : {
		ESC : 27,
	}
	
};