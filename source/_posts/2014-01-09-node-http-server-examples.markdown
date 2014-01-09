---
layout: post
title: "node.js搭建简单的HTTP服务器"
date: 2014-01-09 19:45
comments: true
keywords: node http server examples
categories: Node
---
###参考资料
<a href="http://book.douban.com/subject/23780706/" class="douban_book" name="23780706" target="_blank">《Node.js入门经典》</a>第5章

###1. 最简单的HTTP服务器

``` javascript
var http = require('http');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello, I\'m an HTTP server.');
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000');
```

###2. 路由控制的HTTP服务器

``` javascript
var http = require('http'),
	url  = require('url');

http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	if (pathname ==='/'){
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('Hello, I\'m an HTTP server.');
	} else if (pathname === '/about'){
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('About us\n');
	} else if (pathname === '/redirect') {
		// 重定向
		res.writeHead(302, {'Location':'/'});
		res.end();
	} else{
		res.writeHead(404, {'Content-Type':'text/plain'});
		res.end('Page not found\n');
	}	
}).listen(3000,"127.0.0.1");
console.log('Server running at http://127.0.0.1:3000');
```