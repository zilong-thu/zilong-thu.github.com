---
layout: post
title: "《异步JavaScript编程》笔记"
date: 2013-12-15 22:42
comments: true
keywords: Reading Notes on Async JavaScript, JavaScript
categories: JavaScript
published: false
---
###Metro应用开发
从这本书的前言里，我才知道JavaScript原来可以进行Windows 8 下的Metro风格应用的开发。>>详见 <a href="http://msdn.microsoft.com/zh-cn/library/windows/apps/br211385.aspx" target="_blank">创建第一个采用 JavaScript 的 Windows 应用商店应用</a>。不过从该页面也了解到，操作系统必须是Window 8.1才可以。

> 感谢网络浏览器的无处不在，JavaScript比以往任何语言都更接近于兑现Java那句古老的承诺：“一次编写，随处运行。”

<!--more-->

###在Node.js中运行代码
<dl>
<dt>REPL</dt>
<dd>
“读取-求值-输出”循环（英语：Read-Eval-Print Loop，简称REPL）是一个简单的，交互式的编程环境。这个词常常用于指代一个Lisp的交互式开发环境，但也能指代命令行的模式和例如 APL, BASIC, Clojure, F#, Haskell, J, Julia, Perl, PHP, Prolog, Python, R, Ruby, Scala, Smalltalk, Standard ML, Tcl, Javascript 这样的编程语言所拥有的类似的编程环境。这也被称做交互式顶层构件（interactive toplevel）。</dd>
</dl>

可在<a href="http://nodejs.org" target="_blank">nodejs.org</a>下载Windows平台下的安装包。安装后就可以运行JavaScript的REPL了。

##第1章 深入理解JavaScript事件

###概览
``` javascript
for(var i=1;i<=3;i++){
    setTimeout(function(){console.log(i);},0);     // => 4,4,4，而不是1,2,3
};
```

``` javascript
var start = new Date();
setTimeout(function(){
    var end = new Date();
    console.log('Time elapsed: ', end-start , 'ms');
}, 500);

while(new Date() - start < 1000){};

// => Firefox会输出  Time elapsed: 1008 ms
```

创造Node.js，并不是为了让人们能在服务器上运行JavaScript，仅仅是因为Ryan Dahal想要一个建立在某高级语言之上的事件驱动型服务器框架。JavaScript碰巧适合干这个——因为它可以完美地实现<strong>非阻塞式I/O</strong>。

例如，下面的循环会永远运行下去，不可能停下来：

``` javascript
var ajaxRequest = new XMLHttpRequest;
ajaxRequest.open('GET', url);
ajaxRequest.send(null);
while(ajaxRequest.readyState === XMLHttpRequest.UNSET){
	// readyState在循环返回之前不会有更改
}
```

正确的处理方式是为readyState注册事件处理函数：

``` javascript
var ajaxRequest = new XMLHttpRequest;
ajaxRequest.open('GET', url);
ajaxRequest.send(null);
ajaxRequest.onreadystateChange = function(){
	// ...
};
```
非阻塞式I/O是编写基于事件的代码的核心基础。

> 在浏览器端，Ajax方法有一个看设置为false的async选项（但永远、永远别这么做），这会挂起整个浏览器窗格直到收到应答为止。在Node.js中，同步的API方法在名称上会有明确的标示，譬如fs.readFileSync。在编写短小的脚本时，这些同步方法会很方便。但是，如果所编写的应用需要处理并行的多个请求或多项操作，则应该避免使用它们。可在今天，还有哪个应用部是这样的呢？

``` javascript
var firecount = 0;
var start = new Date;
var timer = setInterval(function(){
    if(new Date - start > 1000){
        clearInterval(timer);
        console.log(firecount);
        return;
    }
    firecount++;
}, 0);

// =>Firefox输出249
```

``` javascript
var start2 = new Date();
var count = 0;
while(new Date() - start2 < 1000 ){
    count++;
}               // =>不同解释器下的count输出值，Chrome:645445, Firefox:817007, Node: 3270175
```

估计是我的电脑CPU不给力，作者说i7处理器下，用while循环取代setInterval，Chrome下的触发频率达到400万次/秒，我的只有64万次/秒；i7下的Node可达500万次/秒，我这儿只能运行到320万次/秒。

> setTimeout和setInterval就是想设计成慢吞吞的！事实上，HTML规范推行的延时/时隔的最小值就是4毫秒！

所以，上面的将延时设为0的代码，实际上是按照4毫秒一次来运行的，结果自然也就是差不多运行了250次。

###编写异步函数
####间或异步的函数
####缓存型异步函数