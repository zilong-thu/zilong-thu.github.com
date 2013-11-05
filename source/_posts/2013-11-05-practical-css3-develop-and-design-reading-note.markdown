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

<p class="myFont">UglyQua</p>

