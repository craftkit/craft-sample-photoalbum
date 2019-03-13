// 
// usage:
// 
//   non secure: 
//     node server.js [lib]
//   secure:
//     node server.js [/path/to/cert /path/to/key] [lib]
// 

"use strict";

const url  = require('url');
const path = require('path');
const fs   = require('fs');

let index_file = 'index.html';
let cert_file  = '';
let key_file   = '';

console.log(process.argv);

if( process.argv.length == 3 || process.argv.length == 5 ){
	let serve_type = process.argv[4] || process.argv[3];
	if( serve_type === 'lib' ){
		index_file = 'index.lib.html';
	}
}
if( process.argv.length > 2 ){
	cert_file = process.argv[2];
	key_file  = process.argv[3];
}

const web = function(file_path,res){
	file_path = path.resolve(__dirname,file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.end(data);
	});
};

const lib = function(file_path,res){
	file_path = path.resolve(__dirname,'../lib',file_path);
	let data = fs.readFileSync(file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.end(data);
	});
};

const script = function(file_path,res){
	file_path = path.resolve(__dirname,'./script',file_path);
	let data = fs.readFileSync(file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.writeHead(200,{'content-type':'text/javascript'});
		res.end(data);
	});
};

const img = function(file_path,res){
	file_path = path.resolve(__dirname,'./img',file_path);
	let data = fs.readFileSync(file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.writeHead(200,{'content-type':'image/jpeg'});
		res.end(data);
	});
};

const dist = function(file_path,res){
	file_path = path.resolve(__dirname,'../dist',file_path);
	let data = fs.readFileSync(file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.end(data);
	});
};

const api = function(file_path,res){
	file_path = path.resolve(__dirname,file_path);
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		res.writeHead(200,{'content-type':'application/json'});
		res.end(data);
	});
};

const get = function(req,res){
	let request_url = url.parse(req.url,true);
	let match;
	match = request_url.pathname.match(/^\/data\/(.*)/);
	if( match ){
		return api('data/'+match[1],res);
	}
	match = request_url.pathname.match(/^\/comments\/(.*)/);
	if( match ){
		return api('comments/'+match[1],res);
	}
	match = request_url.pathname.match(/^\/lib\/(.*)$/);
	if( match ){
		return lib(match[1],res);
	}
	match = request_url.pathname.match(/^\/script\/(.*)$/);
	if( match ){
		return script(match[1],res);
	}
	match = request_url.pathname.match(/^\/img\/(.*)$/);
	if( match ){
		return img(match[1],res);
	}
	match = request_url.pathname.match(/^\/dist\/(.*)$/);
	if( match ){
		return dist(match[1],res);
	}
	match = request_url.pathname.match(/^\/([^\/]*)\/?(.*)$/);
	if( match ){
		let dir = match[1];
		let file = match[2];
		let path = '';
		if( !file ){
			file = dir || index_file;
			path = 'web/' + file;
		}else{
			path = dir + '/' + file;
		}
		return web(path,res);
	}else{
		res.statusCode = 404;
		res.end();
	}
};

const post_comment = function(req,res,comment){
	let file_path = path.resolve(__dirname,'comments',comment.photoId+'.json');
	fs.readFile(file_path,function(err,data){
		if( err ){
			res.statusCode = 404;
			return res.end();
		}
		let comments = JSON.parse(data);
		comment.id = Date.now();
		comments.push(comment);
		fs.writeFileSync(file_path,JSON.stringify(comments));
		res.writeHead(200,{'content-type':'application/json'});
		return res.end(JSON.stringify(comments));
	});
};

const handler = function(req,res){
	if( req.method == 'GET' ){
		get(req,res);
	}else if( req.method == 'POST' ){
		let data = '';
		req.on('data',function(chunk){
			data += chunk;
		});
		req.on('end',function(){
			let comment = JSON.parse(data);
			post_comment(req,res,comment);
		});
	}else{
		res.statusCode = 500;
		res.end();
	}
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

