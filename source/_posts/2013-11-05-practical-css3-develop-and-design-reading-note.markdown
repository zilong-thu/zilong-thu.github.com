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