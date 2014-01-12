---
layout: post
title: "Node.js入门"
date: 2013-12-24 10:17
comments: true
keywords: Node.js, 服务器端JavaScript
categories: NodeJS
---
###Node.js简介
Node.js诞生于2009年5月，创始人Ryan Dahl。

Node.js是一个划时代的技术，它在原有的Web前端和后端技术的基础上总结并提炼出了许多新的概念和方法，堪称十多年来Web开发经验的集大成者。Node.js可以作为服务器向用户提供服务，与PHP、Python、Ruby on Rails相比，它跳过了Apache、Nginx等HTTP服务器，直接面向前端开发。Node.js的许多设计理念与经典架构（如LAMP）有着很大的不同，可提供强大的伸缩能力，以适应2010年以后规模越来越庞大的互联网环境。

历史上将JavaScript移植到浏览器外的计划不止一个，但Node.js是最出色的一个。

###Node.js学习资料

<ol>
<li><a href="http://book.douban.com/subject/10789820/" name="10789820" class="douban_book" title="Node.js开发指南" target="_blank">《Node.js开发指南》</a>——把这本书读完，并且成功完成里面讲的微博网站实例，才可以自称初步入门Node.js。</li>
<li><a href="http://book.douban.com/subject/20515024/" name="20515024" class="douban_book" title="Node即学即用" target="_blank">《Node即学即用》</a></li>
<li><a href="http://book.douban.com/subject/25768396/" name="25768396" class="douban_book" title="深入浅出Node.js" target="_blank">《深入浅出Node.js》</a></li>
</ol>

另外，知名程序员兼翻译家阮一峰有一个适合Node.js初学者的页面：<a href="http://javascript.ruanyifeng.com/nodejs/basic.html#" target="_blank">JavaScript标准参考教程（alpha）-Node.js概述</a>。内容组织地非常清晰。

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

	Hello, WZL
	Hello, Wang Zilong
	Hello, Wang Zilong

因为require不会重复加载模块。上例中`myModule`和`myModule2`都是对同一个实例即`require('./module')`的引用。

###npm
默认情况下，npm从 <a href="http://npmjs.org" target="_blank">npmjs.org</a> 搜索或下载包，将包安装到当前目录的node_modules子目录下。

###*调试Node.js

##Node.js Core

##重要的外部模块
###Express
<a href="http://expressjs.com/">Express</a>（Node的MVC框架）也许是使用最为广泛的Node模块。Express通过路由定义的页面处理器来工作。
##MongoDB
MongoDB是一个对象数据库，以BSON（一种JSON的二进制变种）格式存储数据。MongoDB的结构分为数据库（database）、集合（collection）、文档（document）三层。

有两本不错的入门书籍：

<ol>
<li><a href="http://book.douban.com/subject/6068947/" name="6068947" class="douban_book" title="Node.js开发指南"> 《MongoDB权威指南》</a></li>
<li><a href="http://book.douban.com/subject/19977785/" name="19977785" class="douban_book" title="Node即学即用"> 《MongoDB实战》</a></li>
</ol>

###启动与连接MongoDB数据库服务器
启动MongoDB数据库服务器的命令是mongod，例如在Windows平台下将其解压在目录c:\mongodb下，那么在\bin文件夹中，启动命令行，运行mongod.exe即可。启动时可以指定路径参数（`--dbpath`）用以存放数据库文件以及端口号参数（`--port`）指定mongod监听连接的端口号，默认的端口号为27017。例如，如果希望将数据库文件存放在`d:\testdb\db`目录下，并使用27016端口，那么可以在`c:\mongodb\bin\`目录下运行这样的命令：

	c:\mongodb\bin>mongod --dbpath d:\testdb\db --port 27016

注意：如果数据目录不存在或不可写，服务器会启动失败。所以，在运行上面的命令前，要确保`d:\testdb\db`已经存在。另外，如果端口被占用，启动也会失败，通常这是由于MongoDB实例已经在运行了。

`mongod`还会启动一个非常基本的HTTP服务器，监听数字比主端口号高1000的端口，默认情况下即28017端口。这意味着你可以通过浏览器访问`http://127.0.0.1:28017/`来获取数据库的管理信息。

对MongoDB进行操作需要使用`mongo`命令。基本命令示例如下：

	C:\mongodb\bin>mongo.exe       //=> 打开数据库，可进行交互操作
	MongoDB shell version: 2.4.8
	connecting to: test
	> show dbs                     //=> 显示当前连接的数据库服务器所管理的数据库清单
	local   0.078125GB
	> db                           //=> 查看当前连接的数据库
	test
	> use foobar                   //=> 使用use命令切换数据库
	switched to db foobar
	> db
	foobar

这样就启动了MongoDB自带的JavaScript Shell。可以运行帮助命令`help`以查看基本的操作提示。

###更多参考资料
更多细节还是参考上面的两本书吧。MongoDB现在如此火热，以至于任何新的编程书籍都想谈一谈这个对象数据库。如

<a href="http://book.douban.com/subject/24536403/" name="24536403" class="douban_book" title="代码的未来"> 《代码的未来》</a>

<a href="http://book.douban.com/subject/24165880/" name="24165880" class="douban_book" title="JavaScript核心概念及实践"> 《JavaScript核心概念及实践》</a>


##用Node.js进行微博网站开发实例
由于本书是2012年7月出版，到现在至少过去一年半了，很多模块、包的版本已经发生了较大的变化。所以按照书里的代码进行微博网站的开发会遇到不少问题。已经有细心的朋友认真记录了相应的解决方法：

<a href="http://crazylpy.me/blog/nodejskai-fa-zhi-nan-wen-ti-jie-jue/" target="_blank">NodeJS开发指南问题解决</a>

除了版本问题，作者自己给的源码也是有不少错误。我把自己在本地运行成功了的源码放在这里，需要的朋友可以下载，对比一下，然后做相应的改动。

[附件]： <a href="{{root_url}}/files/source/microblog.zip">点击下载microblog.zip源代码</a>-117.55KB