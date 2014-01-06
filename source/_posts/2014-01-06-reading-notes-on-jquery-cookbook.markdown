---
layout: post
title: "《jQuery Cookbook 中文版》笔记"
date: 2014-01-06 19:48
comments: true
keywords: jQuery Cookbook, 中文版
categories: JavaScript
---
<a href="http://book.douban.com/subject/23774480/" class="douban_book" name="23774480" target="_blank" title="jQuery Cookbook 中文版">《jQuery Cookbook 中文版》</a>
仅摘记自己陌生的、新学到的知识点。

##第1章：jQuery基础
###关于ready()方法
`jQuery(document).ready(function(){})`方法可以在DOM加载之后、整个页面加载之前执行JS代码。与之相比，window.onload属性则是在页面全部加载完后（包括图片、SWF等）才被触发。

所以ready()比较贴合实际。但是它也不是必须的：

> 这个定制的jQuery事件只有在JavaScript必须嵌入到页面顶端的文档流并封装在`<head>`元素里时才有必要。我只需将JavaScript文件包含和内联代码放在`<body>`结束标签之前，就能避免使用`ready()`事件。原因有二。
> 
> 一，现代优化技术已经断言，当JavaScript代码放在页面解析的最后由浏览器加载时，页面的加载速度就会变得更快。
>
> 二，ready()方法一定程度上增加了代码量，这样不好。代码越少，网页运行得总是越快。

<!--more-->

###jQuery的选择器引擎
jQuery的选择器引擎是<a href="http://sizzlejs.com" target="_blank">Sizzle</a> —— A pure-JavaScript CSS selector engine
designed to be easily dropped in to a host library.

###克隆DOM元素
先克隆，再移动，最后删除原有的DOM元素，就可以实现DOM元素及其事件处理函数的移动了。 

###html()方法机理
jQuery的html()方法会尽量使用DOM的innerHTML属性来获取和设置HTML块（从其源代码即可看出来）。html()方法在XML文档中不可用，但是可用于XHTML文档。

值得注意的是，html()方法与text()方法只有一点不同：后者会对HTML进行转义（将`<`和`>`替换为HTML实体`&lt;`和`&gt;`）。

##第2章：用jQuery选择元素
