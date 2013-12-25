---
layout: post
title: "Node.js入门"
date: 2013-12-24 10:17
comments: true
keywords: Node.js, 服务器端JavaScript
categories: Node
---
###Node.js简介
Node.js诞生于2009年5月，创始人Ryan Dahl。

Node.js是一个划时代的技术，它在原有的Web前端和后端技术的基础上总结并提炼出了许多新的概念和方法，堪称十多年来Web开发经验的集大成者。Node.js可以作为服务器向用户提供服务，与PHP、Python、Ruby on Rails相比，它跳过了Apache、Nginx等HTTP服务器，直接面向前端开发。Node.js的许多设计理念与经典架构（如LAMP）有着很大的不同，可提供强大的伸缩能力，以适应2010年以后规模越来越庞大的互联网环境。

历史上将JavaScript移植到浏览器外的计划不止一个，但Node.js是最出色的一个。

###参考资料
这里知识大多来自我在阅读的几本书：

<ol>
<li><a href="http://book.douban.com/subject/10789820/" name="10789820" class="douban_book" title="Node.js开发指南"> 《Node.js开发指南》</a></li>
<li><a href="http://book.douban.com/subject/20515024/" name="20515024" class="douban_book" title="Node即学即用"> 《Node即学即用》</a></li>
</ol>
<!-- ###Node.js能做什么 -->

<!--more-->
##Hello, Node.js
###CommonJS
CommonJS的作用就像当年为了统一JavaScript语言标准而制定的ECMAScript规范一样，统一JavaScript在浏览器之外的实现。CommonJS试图定义一套普通应用程序使用的API，从而填补JavaScript标准库过于简单的不足。CommonJS的终极目标是制定一个像C++标准库一样的规范，使得基于CommonJS API的应用程序可以在不同的环境下运行，就像用C++编写的应用程序可以使用不同的编译器和运行时函数库一样。为了保持中立，CommonJS不参与标准库的实现，而是将此任务交给像Node.js之类的项目来完成。

###Windows下安装Node.js
在Node.js官网<a href="http://nodejs.org/download/" target="_blank">下载页面</a>，下载最新版本（目前是v0.10.24）的.msi安装包。

此安装包会将node添加到环境变量PATH中，所以可以在cmd命令行下输入node进入node的REPL模式。npm（Node.js Package Manager，Node.js包管理器）也自动安装并添加到环境变量PATH中了。

运行Node.js程序的基本方法就是执行 `node scriptname.js`。

###Hello World
``` javascript
var http = require("http");  
http.createServer(function(req, res) {  
    res.writeHeader(200, {"Content-Type": "text/html"}); 
    res.write("<h1>Node.js</h1>");   
    res.write("<h3>Hello World</h3>");  
    res.end();  
}).listen(3000);  
console.log("Server running at http://localhost:3000/");
```
在Node运行时，对代码的修改都只能在终止Node.js再重新运行才会奏效。这是因为Node.js只有在第一次引用到某部分时才去解析脚本文件，以后都会直接访问内存，避免重复载入。与此相反，PHP则总是重新读取并解析脚本（如果没有专门的优化配置）。

可以使用npm安装supervisor来监视对代码的改动，在发生改动时终止脚本，然后重启，从而提高调试效率。

###阻塞与非阻塞
阻塞：线程在执行中如果遇到磁盘读写或者网络通信（统称为I/O操作），通常要耗费较长的时间，这时操作系统会剥夺这个线程的CPU控制权，使其暂停执行，同时将资源让给其他的工作线程，这种线程调度方式成为阻塞（block）。

非阻塞I/O（Non-blocking I/O）或异步I/O（Asynchronous I/O）：当线程遇到I/O操作时，不会以阻塞的方式等待I/O操作的完成或数据的返回，而只是将I/O请求发送给操作系统，继续执行下一条语句。当操作系统完成I/O操作时，以事件的形式通知执行I/O操作的线程，线程会在特定的时候处理这个事件。为了处理异步I/O，线程必须有事件循环，不断地检查有没有未处理的事件，依次予以处理。

对操作系统来说，创建一个线程的代价非常昂贵——需要给它分配内存、列入调度，同时在线程切换时还要执行内存换页，CPU的缓存被清空，切换回来的时候还要重新从内存读取信息，破坏了数据的局部性。

###自定义事件
Node.js事件由EventEmitter对象提供。我们可以用EventEmitter发出事件信号，然后自定义回调（捕捉该事件的逻辑由EventEmitter封装）。有点像Qt的“信号-槽”（Signal-Slots）机制。
``` javascript Node.js的自定义事件
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function(){
	console.log('some_event occured.');
});

setTimeout(function(){
	event.emit('some_event');
}, 2000);
```
###模块和包
模块（Module）和包（Package）是Node.js最重要的支柱。Node.js提供了`require`函数来调用其他模块，且模块都是基于文件的。

``` javascript 自定义模块
//module.js
var name;

exports.setName = function(thyname){
	name = thyname;
};

exports.sayHello = function(){
	console.log('Hello, '+name);
};
```


``` javascript 使用刚刚定义的模块
// getmodule.js
var myModule = require('./module');  // myModule只是对该模块的引用
myModule.setName('WZL');
myModule.sayHello();

var myModule2 = require('./module');
myModule2.setName('Wang Zilong');
myModule2.sayHello();

myModule.sayHello();
```

运行`node getmodule.js`，结果是

```
Hello, WZL
Hello, Wang Zilong
Hello, Wang Zilong
```

因为require不会重复加载模块。上例中`myModule`和`myModule2`都是对同一个实例即`require('./module')`的引用。

###npm
默认情况下，npm从 <a href="http://npmjs.org" target="_blank">npmjs.org</a> 搜索或下载包，将包安装到当前目录的node_modules子目录下。

###*调试Node.js

##Node.js Core

##重要的外部模块
###Express
<a href="http://expressjs.com/">Express</a>（Node的MVC框架）也许是使用最为广泛的Node模块。Express通过路由定义的页面处理器来工作。
##MongoDB
MongoDB是一个对象数据库，以BSON（一种JSON的二进制变种）格式存储数据。

##用Node.js进行微博网站开发实例
由于本书是2012年7月出版，到现在至少过去一年半了，很多模块、包的版本已经发生了较大的变化。所以按照书里的代码进行微博网站的开发会遇到不少问题。已经有细心的朋友认真记录了相应的解决方法：

<a href="http://crazylpy.me/blog/nodejskai-fa-zhi-nan-wen-ti-jie-jue/" target="_blank">NodeJS开发指南问题解决</a>