---
layout: post
title: "《CSS3实战：开发与设计》读书笔记"
date: 2013-11-05 14:55
comments: true
keywords: practical css3, develop and design, CSS3, 前端
categories: 
---
###用rem调整文本大小
参见 [http://www.w3.org/TR/css3-values/](http://www.w3.org/TR/css3-values/)

根元素，即`<html>`标签。1rem == html 的computed style 中的font-size。

###CSS3选择器
目标伪类选择器 `:target`。

CSS3还没普及完，CSS4标准就已经在研制了。可以参见[CSS4选择器](http://www.w3.org/TR/selectors4/)。

> Selectors Level 4 describes the selectors that already exist in [SELECT], and further introduces new selectors for CSS and other languages that may need them.

###HTML5标题
HTML5中的标题级别不再以标题`h`后面的数字代表，转而以它们所嵌套在内的所谓分区元素的级别为依托的HTML5纲要算法。

这一点在《HTML5经典实例》中也详细介绍了。

具体可参见Mozilla的文章：[Sections and Outlines of an HTML5 Document](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document)

<!-- more -->

###IE条件注释
IE条件注释这样使用：
	
	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

这样，当检测到浏览器是IE且版本低于IE9，则会加载并执行该脚本。

在HTML文档中的任意位置，都可以使用这些IE条件判断。

+ if IE        // 如果是IE浏览器
+ if IE 6      // 如果是IE6
+ if lt IE 9   // 如果是早于IE9的IE浏览器，不包括IE9
+ if lte IE 8  // 如果是IE8或者更早的IE浏览器

###Web字体
使用下载了的ttf格式的UglyQua字体，将其放在网站根目录下的fonts文件夹中，就可以使用`@font-face`规则自定义web字体了。CSS代码如下：

	// css code
	@font-face{
    	font-family: UglyQua;
    	src: url('/fonts/UglyQua.ttf');
    	src: url('/fonts/UglyQua-Italic.ttf');
	}
	.myFont{
	    font-family: UglyQua;
	}

	// html code
	<p class="myFont">This is some text using font format <i>UglyQua</i>.</p>

<p class="myFont">This is some text using font format <i>UglyQua</i>.</p>

###多重文本阴影
在同一个CSS选择器下，可以应用多重文本阴影。例如

	// css code
	.multi-shadow{
		font-size:2em;
		text-shadow: 0 0 2px #000,
					 0 0 2px #aaa,
					 0 0 4px #999,
					 0 0 6px #888,
					 0 0 8px #666,
					 0 6px 6px rgba(0,0,0,0.5),
					 0 8px 20px rgba(0,0,0,0.5);
	}

	// html code
	<span class="multi-shadow">Multiple Text Shadows!</span>

那么就会得到这样的字体：

<span class="multi-shadow">Multiple Text Shadows!</span>

使用下面的代码则可以创造火焰文字：

	// css code
	.fire-words{
	    font-size: 2em;
	    text-shadow: 0 0 4px white,
	                 0 -5px 4px #ffff33,
	                 2px -10px 6px #ffdd33,
	                 -2px -15px 11px #ff8800,
	                 2px -25px 18px #ff2200;
	    color: orange;
	}

	// html code
	<p class="fire-words">火焰文字</p>

<p class="fire-words">火焰文字</p>

###控制文本溢出
如果容器盒定义了`overflow: hidden;`，那么其文本子节点的`text-overflow`属性控制文本溢出时的显示效果。

语法：

	text-overflow: clip|ellipsis|string;

+ clip
	修剪文本。
+ ellipsis
	显示省略符号来代表被修剪的文本。主流的现代浏览器都支持此属性。
+ string
	使用给定的字符串来代表被修剪的文本。

具体见[w3school的例子](http://www.w3school.com.cn/cssref/pr_text-overflow.asp)吧。

但是目前对于第三个属性，只有Firefox支持，Chrome尚不支持。Firefox中的使用方法如下：

	text-overflow: ' ...read more';

###控制断字
使用hyphens属性。

###border-radius高级

	border-radius: 10px/20px;

意味着每个圆角水平半径为10px，垂直半径为20px。而

	border-radius: 5px 10px 15px 20px/30px 15px 10px 5px;

`/`之前的代表从左上角顺时针各个角的水平半径，后面则代表四个角的垂直半径。这样应该就可以画一个椭圆的盒子出来了：

	.ellipse{
		width: 400px;
	    height: 200px;
	    border-radius: 200px/100px;
	    background-color: #cccccc;
	    line-height: 200px;
	    box-shadow: 2px 2px 10px rgba(0,0,0,0.5);
	}

<div class="ellipse">这是一个椭圆形的div盒子。</div>

###渐变色
本质上来讲，CSS渐变是一种特殊的背景图片，你完全可以把它放在任何一个图片能工作的位置，例如`background-image`和`border-image`。

在线性渐变中，对角线关键词能保证渐变方向总是从一个角到另一角，但角度则是从左上角开始逆时针转的，除非是正方形，否则135°就不是从右上角到左下角的渐变了。

###多重背景
CSS3允许开发人员向一个元素添加多重背景，方法很简单，在`background`中添加多个`img`或者`gradient`即可。背景的层叠顺序是：先声明的在上层，后声明的在下层，像photoshop，向栈，但绝不像CSS的层叠顺序啊——确实，鬼知道那些CSS规范制定者脑子里在想什么。

###CSS3 transform
下面的代码，Chrome不支持。但是新版的Firefox完全没问题。

<div id="book_wrapper" style="position: relative;height:400px;transform: perspective(1200px) rotateY(-9deg);transform-style: preserve-3d;">
	<article id="book_front" style="transform: translateZ(3rem);">
		<p style="font-size:1.5em;text-alignt:center;font-weight:bold;">随笔</p>
	</article>
	<article id="book_p1" style="transform: translateZ(0rem);"></article>
	<article id="book_p2" style="transform: translateZ(-3rem);"></article>
	<article id="book_back" style="transform: translateZ(-6rem);"></article>
</div>

像`backface-visibility`（当元素在3D空间旋转而导致其正面远离观察者时，指定它的背面是否可见），`translate`,`preserve-3d`这些属性，目前浏览器支持度还不是很好，暂不研究了。