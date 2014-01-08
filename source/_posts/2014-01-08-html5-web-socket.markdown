---
layout: post
title: "HTML5 Web Socket初步学习"
date: 2014-01-08 20:12
comments: true
keywords: Web Socket
categories: HTML5
---
HTTP是一个请求和响应协议，其设计目的是请求文件，并围绕请求文件的思想进行操作。从设计初衷上讲，它并不适用于需要服务器实时数据的应用。如即时聊天应用。这种应用需要在服务器上发生某事时向浏览器推送数据。

使用一系列HTTP序列可以近似实现从服务器获取“实时”数据的功能，例如网页邮箱。

观察QQ邮箱的网络请求情况，如下图，可以看到它大概每隔29秒多点就会向服务器发送一次请求，看看是否有新邮件。

<img src="{{root_url}}/images/blog/html5/20140108/qqmail_http_request.PNG">

这样会产生大量的服务器负载，因为每个请求都需要在服务器上建立和销毁，以及HTTP头和用户身份验证的网络开销；HTTP头可以给每个请求增加几百KB，在一个繁忙的服务器上，这会给服务器和网络增加相当数量的负载。

<!--more-->

###简单的Node.js聊天服务器

``` javascript 基于Node.js的基本聊天服务器chat.js
/*
 * 基于Node.js的基本聊天服务器
 * 参考《Node即学即用》（Node: Up and Running）
 */

// net 模块包含Node所需的所有TCP功能
var net = require('net');
var chatServer = net.createServer(),
	clientList = [];

chatServer.on('connection', function(client){
	client.name = client.remoteAddress + ':' + client.remotePort;
	client.write('Hi, '+ client.name +'.\n');
	
	clientList.push(client);

	client.on('data', function(data){
		broadcast(data, client);
	});

	client.on('end', function(){
		clientList.splice(clientList.indexOf(client), 1);
	});
});

chatServer.listen(9000);
console.log('Server running at http://127.0.0.1:9000');

function broadcast(message, client){
	var cleanup = [];

	for(var i=0; i<clientList.length; ++i){
		if(client !== clientList[i]){

			if(clientList[i].writable){
				clientList[i].write(client.name + ' says:\n' + ' '+ message + '\n');
			} else {
				cleanup.push(clientList[i]);
				clientList[i].destroy();
			}
			
		}
	}

	for(i=0; i<cleanup.length; ++i){
		clientList.splice(clientList.indexOf(cleanup[i]),1);
	}
}
```
运行`node chat.js`后，用putty终端模拟器登陆相应IP和端口，即可进行“群聊”了。效果页面如下：

<img src="{{root_url}}/images/blog/node/window_1.PNG">

<img src="{{root_url}}/images/blog/node/window_2.PNG">

###Node.js + HTML5搭建聊天应用

###References
<a href="http://book.douban.com/subject/23058345/" class="douban_book" name="23058345" target="_blank" title="HTML5应用开发实践指南">《HTML5应用开发实践指南》</a>

<a href="http://developer.51cto.com/art/201308/407192_all.htm" target="_blank">51cto.com - HTML5 WebSockets node.js实例教程</a>