---
layout: post
title: "*《JavaScript DOM 编程艺术》笔记"
date: 2013-12-02 15:17
comments: true
keywords: DOM Scripting
categories: Reading-Notes
---
这本书写成于这样的时代——“知道CSS的Web设计师在人数上还是要比知道JavaScript语言和DOM的要多得多。”

而今已经到了JavaScript工程师挤得头破血流也找不着工作的时代。单纯地读最新标准下的JavaScript、CSS书籍或标准文档，对深入理解它们的设计初衷是不够的，读一读十年前的Amazon超级畅销书还是很有好处的。

我读的是第一版，但并不推荐任何新手也去读第一版——这种偶尔出现IE4、I35字眼的书籍不利于W3C标准的推广~~推荐新手读此书的第二版，的确很适合入门。

本文一顿瞎写，老鸟们就别喷了，哥也只是一个四处找工作碰壁的JS新手罢了~~
<!-- more -->
###DOM的诞生
> 标准化的DOM有着非常远大的抱负。
> 
> 浏览器制造商们感兴趣的只不过是一些通过JavaScript操控网页的具体办法，但W3C退出的标准化DOM却可以让任何一种程序设计语言对使用任何一种标记语言编写出来的任何一份文档进行控制。
> 
> DOM是一种API。简单地说，API就是一组已经得到有关各方共同认可的基本约定。
> 
> ……别忘了，英制度量衡与公制度量衡之间的差异至少导致过一次火星探测任务的失败。

W3C对DOM的定义是：“一个与系统平台和编程语言无关的接口，程序和脚本可以通过这个接口动态地对文档的内容、结构和样式进行访问和修改。”

###setAttribute()方法
> 这里有一个非常值得关注的细节：通过setAttribute()方法对文档做出的修改，将使得文档在浏览器窗口的显示效果和/或行为动作发生相应的变化，但我们在通过浏览器的view source（查看源代码）选项去查看文档的源代码时看到的仍然是原来的属性值——也就是说，setAttribute()方法做出的修改不会反映在文档本身的源代码里。这种“表里不一”的现象源自DOM的工作模式：先加载文档的静态内容、再以动态的方式对它们进行刷新，动态刷新不影响文档的静态内容。

还真是如此。

###取消事件
如下代码，由于onclick的事件处理函数接收到的JS代码返回值是false，于是onclick事件处理函数将认为“这个链接没有被点击”。
``` html 空链接示例
<a href="http://www.baidu.com/" onclick="return false;" target="_blank">baidu</a>
```
<a href="http://www.baidu.com/" onclick="return false;" target="_blank">baidu</a>

《JavaScript权威指南（第六版）》pp442：
> 一些事件有与之相关的默认操作。例如，当超链接上发生click事件时，浏览器的默认操作是按照链接加载新页面。事件处理程序可以通过返回一个适当的值、调用事件对象的某个方法或者设置事件对象的某个属性来阻止默认操作的发生。这有时称为“取消”事件。

###nodeType
nodeType属性总共有12种可取值，但其中仅有3种具有实用价值：

+ 元素节点 nodeType == 1
+ 属性节点 nodeType == 2
+ 文本节点 nodeType == 3

###为什么要确保网页在禁用JS的情况下也能工作？
使用`javascript:`伪协议，或者使用内嵌的事件处理函数（如在超链接里写`onclick="(function(){})();return false;"）都是非常垃圾的做法。

正常的人类用户是不会禁用图像和JavaScript的，即使有，也会越来越少。但有一类用户，即搜索机（searchbot），基本不认识图像和脚本。作者说，在成书的那个时候，只有极少数搜索机能够理解JS代码。

放在现代来讲，就是指网络蜘蛛吧。

###结构与行为分离
> 作为一条原则，如果你想用JavaScript给某个网页添加一些行为，就不应该让你的JavaScript代码对这个网页的结构有任何依赖。

例如，在查询DOM中某个元素时，如果获取不到，就不执行下面的JavaScript代码。

另外，<span style="font-weight:bold;">结构化程序设计</span>理论提出了这样一条规则：每个函数应该只有一个入口点和一个出口点。

作者认为，同一个函数有多个出口点的情况是可以接受的，但前提是它们应该集中出现在这个函数的开头部分。

我个人认为，无所谓，取决于团队风格。

###window.onload
Simon Willison发明了这样的可以无限添加函数到window.onload事件的方法：

``` javascript
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
```

但我个人还是喜欢直接写 window.onload = function(){...}; ，并将其放在`<body>`标签之前。或者使用jQuery的 $(document).ready(function(){}); 。

###DOM Core与HTML-DOM
DOM Core并不专属于JavaScript，支持DOM的任何一种程序设计语言都可以使用它们。它们的用途也不仅限于处理网页，而是可以用来处理任何使用标记语言（比如XML）编写出来的文档。

DOM Core方法示例：

+ getElementById()
+ getElementsByTagName()
+ getAttribute()
+ setAttribute()

在DOM Core出现之前，人们使用HTML-DOM来进行文档操作。两种方法的比较如下：

``` javascript HTML-DOM与DOM Core的比较
// 获取文档元素
// DOM Core
var forms = document.getElementsByTagName("form");

// HTML-DOM
var forms = document.forms;

// 获取元素属性
// DOM Core
var url = element.getAttribute("src");
var source = element.getAttribute("href");

// HTML-DOM
var url = element.src;
var source = element.href;

二者可以得到相同的结果。HTML-DOM代码通常比较简短，但是它们只能用来处理Web文档。