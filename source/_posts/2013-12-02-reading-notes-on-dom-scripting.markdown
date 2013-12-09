---
layout: post
title: "《JavaScript DOM 编程艺术》笔记"
date: 2013-12-02 15:17
comments: true
keywords: DOM Scripting, DOM, HTML-DOM,JavaScript
categories: JavaScript
---
这本书写成于这样的时代——“知道CSS的Web设计师在人数上还是要比知道JavaScript语言和DOM的要多得多。”

而今已经到了JavaScript工程师挤得头破血流也找不着工作的时代。

单纯地读最新标准下的JavaScript、CSS书籍或标准文档，对深入理解它们的设计初衷是不够的，读一读十年前的Amazon超级畅销书还是很有好处的。

我读的是第一版，但并不推荐任何新手也去读第一版——这种偶尔出现IE4、IE5字眼的书籍不利于W3C标准的推广~~推荐新手读此书的第二版，的确很适合入门。<a class="douban_book" href="http://book.douban.com/subject/1921890/" target="_blank" name="1921890">>>图书基本信息</a>。

本文一顿瞎写，老鸟们就别喷了，哥也只是一个四处找工作碰壁的JS新手罢了~~
<!-- more -->
###DOM的诞生
> 标准化的DOM有着非常远大的抱负。
> 
> 浏览器制造商们感兴趣的只不过是一些通过JavaScript操控网页的具体办法，但W3C退出的标准化DOM却可以让任何一种程序设计语言对使用任何一种标记语言编写出来的任何一份文档进行控制。
> 
> DOM是一种API。简单地说，API就是一组已经得到有关各方共同认可的基本约定。……别忘了，英制度量衡与公制度量衡之间的差异至少导致过一次火星探测任务的失败。

W3C对DOM的定义是：“一个与系统平台和编程语言无关的接口，程序和脚本可以通过这个接口动态地对文档的内容、结构和样式进行访问和修改。”

###setAttribute()方法与运行时DOM
> 这里有一个非常值得关注的细节：通过setAttribute()方法对文档做出的修改，将使得文档在浏览器窗口的显示效果和/或行为动作发生相应的变化，但我们在通过浏览器的view source（查看源代码）选项去查看文档的源代码时看到的仍然是原来的属性值——也就是说，setAttribute()方法做出的修改不会反映在文档本身的源代码里。这种“表里不一”的现象源自DOM的工作模式：先加载文档的静态内容、再以动态的方式对它们进行刷新，动态刷新不影响文档的静态内容。

还真是如此。作者在115页才给出更详细的说明：

在abc.html文件中使用setAttribute()方法修改某项属性，则abc.html并未发生任何变化。发生变化的是运行时的DOM树——在浏览器看来，DOM节点才是文档（document）。所以，以动态方式实时“创建”HTML内容的本质，是在改变浏览器的运行时DOM节点树。

###取消事件
如下代码，由于onclick的事件处理函数接收到的JS代码返回值是false，于是onclick事件处理函数将认为“这个链接没有被点击”。
``` html 空链接示例
<a href="http://www.baidu.com/" onclick="return false;" target="_blank">baidu</a>
```

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
```
二者可以得到相同的结果。HTML-DOM代码通常比较简短，但是它们只能用来处理Web文档。

###innerHTML属性
> 如今的浏览器都支持innerHTML属性，但这个属性并不是W3C DOM标准的组成部分。它始见于微软公司的IE4浏览器，并从那时起被其他的浏览器接受。不过，从目前来看，它不太可能成为标准化DOM的组成部分。

如下面的HTML代码，其DOM树示意图紧随其后。

``` html
<div id="testdiv">
<p>This is <em>my</em> content.</p>
</div>
```
<embed src="{{ root_url}}/svg/DOM_tree.svg" type="image/svg+xml">

innerHTML属性是字符串，值为元素节点标签内的html代码。本质来讲，innerHTML属性是来自HTML-DOM的，而非来自DOM Core的API。

> 还有一件事要提醒大家：innerHTML属性是一项专利技术，不是一项业界标准。我认为，在编写JavaScript代码时应该避免使用任何形式的专利，这样我们才不会再次陷入一场浏览器大战。在上一场这样的战争里，不同品牌的浏览器使用的是不同的DOM，这给程序员和用户带来了许多烦恼和不便。虽说innerHTML属性现在已经得到了广泛的支持，但它的未来仍是一个未知数。
> 
> 在任何时候，标准的DOM都是可以替代innerHTML的。虽说这往往需要多编写一些代码才能获得同样的效果，但DOM提供了更高的精准性和更多的功能。

###DOM节点方法
createElement()、createTextNode()都是document的方法。

而appendChild()、insertBefore()是元素节点的方法。
``` javascript 在元素pp前插入一个新节点元素newElement
pp.parentNode.insertBefore(newElement, pp);
```

```javascript 用户自定义的insertAfter()方法
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
```
###style属性与className属性
DOM元素节点的style属性是个对象，这个对象各个属性的值的类型是字符串。
``` html 验证style属性是对象的代码
<div id="test_style_div" style="border:1px solid #ccc;border-radius:1em;">
文本节点
</div>
<p>文本节点的style属性值：</p>
<p id="test_style_res" style="color:blue;"></p>

<script type="text/javascript">
(function(){
	var div = document.getElementById('test_style_div');
	var nodename = div.nodeName;
	var str = typeof div.style;
	var par = document.getElementById('test_style_res');
	par.innerHTML = 'div.nodeName => ' + nodename  // DIV
		+ '<br/>typeof div.style => '+str  // object
		+ '<br/>par.style.valueOf() => '+ par.style.valueOf();  // [object CSSStyleDeclaration]
	/*
	 * 如果要修改某个元素节点的样式属性
	 * 直接给其style赋个新的字符串值就可以了
	 */
	par.setAttribute("style","font-weight:bold;");  // 粗体，不再是蓝色 
})();
</script>
```
DOM使用Camel记号来解决css属性的连字符问题，例如style对象的常见的属性：

<ul style='list-style-type: square;font-weight:normal;font-family: Menlo,Monaco,"Andale Mono","lucida console","Courier New",monospace;'>
<li>backgroundColor ·········· background-color</li>
<li>color
<li>fontFamily ··············· font-family</li>
<li>fontSize ················· font-size</li>
<li>fontWeight ··············· font-weight</li>
<li>marginTop ················ margin-top</li>
</ul>

``` html DOM可识别简写css属性的结算结果
<p id="example" style="color: grey; font: 12px Arial,sans-serif;"></p>
<script type="text/javascript">
var para = document.getElementById(example);
console.log(para.style.fontSize); // => 12px
</script>
```
不过，style属性无法访问外部样式表声明的CSS属性值。它只能识别内嵌在DOM元素标记中的内联样式。

DOM的className属性则是个字符串。操作起来比style方便多了，可以直接进行字符串拼接、删减，来操作元素的样式。例如最原始的addClass()方法（“原始”是与jQuery的addClass()方法相比而言的）：
``` javascript 较原始的addClass()方法
function addClass(element, value){
	if(!element.className){
		element.className = value;
	} else {
		var newClassName = element.className + ' ' + value;
		element.className = newClassName;
	}
}

```
###再说表格
> 在用CSS布置和美化网页时，千万不要人云亦云地认为表格都是不好的。利用表格来安排页面元素的屏幕显示位置不一定是个好主意，但利用表格来显示表格数据却是理所应当的。

###第10章：用JS实现动画效果
很有趣。基本原理跟《JS权威指南》里给的例子类似。计划做个这方面的家庭作业：几张图片，为我大二去的甘肃民勤宣传一下节约用水。
###Ajax的火爆从何处开始？
都怪Google，它使用了Google Suggest技术，从而点燃了众多程序员屌丝们对Ajax的热情，并使之一发不可收拾，从此进入Web2.0时代。

##总结
本书中译本写于2006年9月，英文原版出版时间是2005-9-20。在书的最后，作者表示本书写成于Web2.0时代到来之前——这正是让我觉得可敬之处，已经过去9年了，书中的内容丝毫不过时啊！

推荐度：★★★★★