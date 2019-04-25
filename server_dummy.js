// 
// simulate github pages
// 
// usage:
// 
//   non secure: 
//     node server.js
//   secure:
//     node server.js [/path/to/cert /path/to/key]
// 

"use strict";

const url  = require('url');
const path = require('path');
const fs   = require('fs');

let cert_file = '';
let key_file  = '';

console.log(process.argv);

if( process.argv.length > 2 ){
	cert_file = process.argv[2];
	key_file  = process.argv[3];
}

const get_type = function(filepath){
	let match = filepath.match(/\.(.*)$/);
	switch(match[1]){
		case 'html':
			return 'text/html';
		case 'jpg':
			return 'image/jpeg';
		case 'js':
			return 'text/javascript';
		case 'json':
			return 'application/json';
		default:
			return 'text/plain';
	}
};

const handler = function(req,res){
	let request_url = url.parse(req.url,true);
	let match = request_url.pathname.match(/^\/(.+)/);
	let file_path;
	if( match ){
		file_path = 'docs/' + match[1];
	}else{
		file_path = 'docs/index.html';
	}
	let file_type = get_type(file_path);
	file_path = path.resolve(__dirname,file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.writeHead(200,{'content-type':file_type});
		res.end(data);
	});
};

let httpd;
let server;

if( cert_file && key_file ){
	httpd = require('https');
	server = httpd.createServer({
		cert : fs.readFileSync(cert_file),
		key  : fs.readFileSync(key_file)
	},handler);
}else{
	httpd = require('http');
	server = httpd.createServer(handler);
}

server.listen(10088,function(){
	console.log("Photo Album listening on:");
	console.log("http(s)://127.0.0.1:10088/");
});

