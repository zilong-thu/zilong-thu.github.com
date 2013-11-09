---
layout: post
title: "《 Smashing CSS 》读书笔记"
date: 2013-11-08 13:24
comments: true
keywords: CSS, smashing css, Eric Meyer
categories: Reading-Notes
---
<em>Smashing CSS: Professional Techniques for Modern Layout</em>(by Eric Meyer)，我所读的中文版译名为《精彩绝伦的CSS》。我本以为Eric Meyer写了《CSS权威指南》后就没啥事儿了，原来他还一直在写书。跟Nicholas一样。

这本书的完稿时间是2010年8月，在中国的出版时间则是2012年7月。国内引进CSS方面的书籍的速度总是这样慢，Eric Meyer现在正在写《CSS: The Definitive Guide》的第四版，国内又不知道要什么时候才可以引进呢。

刚翻开没看多少页，就看到了今年10月份参加前端笔试时遇到的而且不知道该怎样回答的一个问题相关的内容。
<!-- more --> 
###重启样式表

当时笔试题目是：

> 如何使用CSS解决各浏览器默认样式不一致的问题？

该问题的答案就在“$1.9 重启样式表”一节中。在此将其原文摘录如下：

<blockquote>
<p>有一件关于CSS的事情你可能没有考虑过，那就是即便你创建了HTML文档后，一行CSS也不写，CSS也总是对文档起作用。实际上，有大量的CSS被应用在“未应用样式”的文档上，它们全部来自于浏览器本身。标题元素的默认大小和字体粗细、不同元素和不同行之间的间距、列表项前面的项目符号，甚至块元素和行内元素之间的区别——全部是默认样式集决定的。</p>
<p>当然，不同浏览器的默认样式略有不同，这不能怪浏览器厂商，因为还没有规范确切地说明文档应该具有什么样的默认样式。鉴于这种情况，大部分浏览器都尽量模仿
	<span class="Mosaic">Mosaic浏览器<sup>注</sup>
		<span class="annotate-content">
			<span class="triTop"></span>
			Mosaic浏览器：互联网上第一个被普遍使用的浏览器，由美国伊利诺伊大学的NCSA组织在1993年发布。
		</span>
	</span>显示文档的效果。是的，确实是Mosaic！因为它曾经是Netscape 1.0和IE3等浏览器试图模仿的对象。如果深入了解浏览器的默认样式，你就会发现那些从早期的Mosaic测试版浏览器复制过来的东西，设置连像素都是。</p>
<p>作为对策，很多人开发了重置样式，这意味着可以通过设置通用的属性尽量减少浏览器之间的不一致性，最简单的方式是：</p>
<p>* {maring: 0; padding: 0;}</p>
</blockquote>

后来对此方法的改进是，在样式表第一条规则中队希望采用重置样式的元素逐一声明，像Octopress博客模板的`screen.css`这样：

	html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video
	{
		margin:0;
		padding:0;
		border:0;
		font:inherit;
		font-size:100%;
		vertical-align:baseline;
	}
	html {
		line-height:1;
	}

目的也是一样的：<em>为了让我们在开始书写CSS之前，尽量使所有的浏览器表现一致，同时也让页面好看一些。</em>

嗯，我已经感动地想哭了。没有任何实习经验项目经验的人要想快速获得经验，最好的办法就是读书了——可是笔试之前我TM都干嘛去了………以后还是得多读书+多练习！

###特殊性
特殊性是一个选择器“特殊程度”的数字表示，有三样东西经常被用来确定选择器的特殊性：

+ 每个元素描述符贡献 0,0,0,1
+ 每个类、伪类或者属性描述符贡献 0,0,1,0
+ 每个ID描述符贡献 0,1,0,0

比较的时候，将这个“四位数”理解为“无穷进制”的数字即可，然后大的就有高的特殊性。

关于特殊性的结构相近问题，看下面例子：

	ul li {font-style: normal;}
	html li {font-style: italic;}

这两个的特殊性相同，都是 0,0,0,2。此时后写的会赢，与html元素相比ul元素在文档中的位置离li元素更近也不管用。<strong>特殊性只是单纯的数值，它不会以任何方式评估页面的结构。</strong>

特殊性的第一个 0 是用于行内样式的（inline style）。

可以总结CSS规则调用的顺序为： 重要性比较，重要的胜出 -> 特殊性比较，特殊性值高的胜出 -> 声明顺序比较，后声明的被执行

###通用选择
星号（*）被作为通用选择符来代替“全部元素”。例如：

	div * {border: 1px solid red;}

表示将`div`节点下的所有后代元素的边框设为该样式。

通用选择符的唯一需要注意之处就是特殊性：* 对特殊性的贡献是 0,0,0,0 。

###使用伪元素插入内容
CSS2有两个伪元素选择器，`:before`和`:after`。它们的`content`属性值是字符串类型，CSS会将其插入到HTML文档流中，但不能解析结构性字符串；值也可以是浏览器所支持的任何字符或者图像字符，只需要知道它们的十六进制字符编码，并且在前面加一个反斜杠即可。

例如 `li:before {content: "\BB ";}`可以在每个`li`标签之前插入一个`>>`符号。

Eric Meyer强烈推荐仅将使用伪元素生成内容用于渐进增强（progressive enhangcement）的特性，以便当前页面不支持这些特性时也可以正常展现内容。

不过，这话是2010年说的，在如今IE6只占全球不到5%的市场份额的情况下，已经可以不必考虑浏览器是否能支持伪类特性，而仅需要考虑CSS是否能够被加载，然后据此来判断是否要采用伪元素生成内容。

向页面的打印副本中插入超链接URL就是个很好的渐进增强示例。将下面的规则添加到打印媒体样式表中：

	a[href]:after{ content: " [" attr(href) "]"; font-size: smaller;}

详见[“Going to Print”](http://alistapart.com/article/goingtoprint/)。这是Eric Meyer 在2002年写的一篇文章。

###调整字体值的顺序
在此强调一下`font`简写属性的书写顺序问题。最基本的`font`声明如下：

	font: <font-size> <font-family>;

问题的关键在于，你必须同时包含这两个值并且按照该顺序进行书写——先写字号，再写字体族。如果颠倒了顺序，或者漏掉了其中一个，那么任何现代浏览器都会完全忽略这条声明。

此外，如果在声明中包含了其他关键字，则它们全部（有一个例外，即行高`line-height`，它必须放在字号的后面，用`/`与字号值连起来）都得放在这两个必备值的前面——这些在字号前面的属性值的顺序可以随意打乱，只要确保它们都在字号的前面即可。

###图像替换技术
CSS图像替换技术允许你使用图像替换文本，通过这种方式，文本仍然是可打印、可访问的。最受欢迎的图像替换技术通常被认为是Phark，也叫Rundle方法：

	h1 {
		height: 140xp;
		text-indent: -9999px;
		background: url('page-header.gif');
	}

默认情况下，背景图片是不会被打印的。于是，相应的打印样式表就可以这样写：

	h1 {
		text-indent: 0;
		background: none;
	}

上面的Phark方式的漏洞是：图片加载失败的话，一切就完蛋了。于是有另外一种方案：

	<h1><img src="page-header.gif" alt="Dive Into Fishing"></h1>

此方法缺点在于，图像在屏幕上和打印时都会出现。

###打印样式
三种方式可以将打印样式关联到页面，如下。而几乎所有人都会使用link的方式，所以，你也不必过于纠结使用哪个方式——Just link！

	<style type="text/css" media="print">...</style>
	<link rel="stylesheet" type="text/css" media="print" href="print.css">
	@import url(print.css) print;