---
layout: post
title: "《CSS3实战：开发与设计》读书笔记"
date: 2013-11-05 14:55
comments: true
keywords: practical css3, develop and design, CSS3, 前端
categories: Reading-Notes
---
本文记录我在读《CSS3实战：开发与设计》时新掌握的知识点，并且不少技术我都用代码进行了测试，效果可以直接在本文看到。本书详细信息可以参见[豆瓣读书：《CSS3实战：开发与设计》](http://book.douban.com/subject/24745215/)。

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

<p class="myFont" style="font-size: 2em;">This is some text using font format <i>UglyQua</i>.</p>

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

<span class="multi-shadow" style="font-size:2em;">Multiple Text Shadows!</span>

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

	text-overflow: clip | ellipsis | string;

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

###CSS3 transition
下面是7种不同的timing-function属性值的实验。鼠标悬浮于上即可看到在3秒内不同timing-function产生的过渡动画效果。

<div id="transition-example-div">
	<div class="linear">linear</div>
	<div class="ease">ease</div>
	<div class="ease-out">ease-out</div>
	<div class="ease-in">ease-in</div>
	<div class="ease-in-out">ease-in-out</div>
	<div class="steps">steps(5)</div>
	<div class="cubic-bezier">cubic-bezier(0.25, 0.1, 0.25, 1.0)</div>
</div>

###CSS3 animation
下面我们将上面制作的火焰文字动起来。

<div class="burning_text">燃烧的文字动画</div>

CSS代码如下。截止到发文时（2013年11月6日），Chrome目前必须使用`@-webkit-keyframes text-flames`定义的样式（且整个规则copy一遍），Firefox最新版和IE10(WIN8平台下的)则已经支持不带前缀的`@keyframes`规则了。

	@keyframes text-flames{
	    0%  { text-shadow: 0 0 4px white, 0 -5px 4px #ffff33, 2px -10px 6px #ffdd33,
	                     -2px -15px 11px #ff8800, 2px -25px 18px #ff2200;}
	    19% {text-shadow: 0 0 4px white, 0 -5px 4px #ffff33, 2px -10px 6px #ffdd33,
	                     -2px -15px 11px #ff8800, 2px -25px 18px #ff2200;}
	    20% {text-shadow: 0 0 4px white, 0 -4px 3px #ffff44, 3px -9px 7px #ffdd33,
	                     -3px -14px 12px #ff9900, 3px -24px 19px #ff3300;}
	    39% {text-shadow: 0 0 4px white, 0 -4px 3px #ffff44, 3px -9px 7px #ffdd33,
	                     -3px -14px 12px #ff9900, 3px -24px 19px #ff3300;}
	    40% {text-shadow: 0 0 4px white, 0 -5px 4px #ffff33, 3px -8px 8px #ffdd44,
	                     -3px -12px 11px #ff8800, 2px -25px 20px #ff3300;}
	    59% {text-shadow: 0 0 4px white, 0 -5px 4px #ffff33, 3px -8px 8px #ffdd44,
	                     -3px -12px 11px #ff8800, 2px -25px 20px #ff3300;}
	    60% {text-shadow: 0 0 5px white, 0 -6px 5px #ffff55, 2px -7px 7px #ffdd33,
	                     -5px -13px 15px #ff7700, 4px -24px 19px #ff4411;}
	    79% {text-shadow: 0 0 5px white, 0 -6px 5px #ffff55, 2px -7px 7px #ffdd33,
	                     -5px -13px 15px #ff7700, 4px -24px 19px #ff4411;}
	    80% {text-shadow: 0 0 4px white, 0 -5px 4px #ffff33, 5px -8px 6px #ffee33,
	                     -4px -12px 13px #ff8822, 2px -26px 18px #ff2200;}
	    100% {text-shadow: 0 0 4px white, 0 -5px 4px #ffff33, 5px -8px 6px #ffee33,
	                     -4px -12px 13px #ff8822, 2px -26px 18px #ff2200;}
	}
	div.burning_text{
		-webkit-animation: text-flames 0.6s infinite;
	    animation: text-flames 0.6s infinite;
	    font-size: 3em;
	    color: orange;
	    line-height: 2em;
	    font-family: sans-serif;
	    font-weight: bold;
	}

当然了，将动画用于使文字呈现闪烁功能，有点像回到了以前文本的`blink`噩梦时代。还是得将动画的精力放在其他上面。动画的精髓应该在于：如何安排关键帧属性。

###CSS3与图标
约定俗成的图标能比文字更快更准确地传达信息。讲CSS的书很少专门讲图标，不过相信讲“交互设计”这类主题的书籍应该会非常强调图标的重要性。

这应该涉及符号学与人类学、语言学。图标传达信息非常直接，与人类早期创造象形文字的原因是一样的。文字后来才出现，可以弥补象形符号的不足，使其更准确——但仍不够精确，无法完全避免误解。

图标应作为背景图片而不是img元素放入页面，并且，在CSS3之前，就已经有针对背景图片的优化技术：CSS Sprite。最主要目的就是减少HTTP请求数目。

另外一个非常赞的做法是，使用纯HTML+CSS制作的图标。我已知的例子是三角形的制作以及由其进阶衍生的气泡提示框的制作（来自另一本CSS3的入门书籍：[《CSS3实用指南》](http://book.douban.com/subject/10482084/) by 吉伦瓦特）。

Lucian Martin提供了一套成熟的图标集。见 [Peculiar](http://lucianmarin.com/peculiar)

{%img /images/blog/Peculiar.PNG %}

###弹性盒子：flexbox
CSS3为`display`属性添加了一个新的值：`flex`。`flex-flow`定义了弹性盒子里面子元素的流动方向。

	// css code
	section{
		display: flex;
		flex-flow: row;
	}
	article{
		width: 30%;
		padding: 1em;
	}

	// html code
	<section>
		<article></article>
		<article></article>
		<article></article>
		<article></article>
		<article></article>
	</section>

##响应式布局之媒介查询
	
	@media screen and (max-width: 800px){
		/* some code here */
	}

该代码意思是：当且仅当设备是屏幕媒体类型并且浏览器窗口宽度不超过800px时，应用代码块里的样式。

然而移动设备的浏览器有时候是个骗子：它会按照假设的宽度去渲染网页，而不是使用设备的宽度。解决此问题的方法是使用`viewport`。在HTML的`<head>`里添加：

	 <meta name="viewport" content="width=device-width, initial-scale=1">

这段代码会视情况来触发媒介查询从而让浏览器已自身的实际宽度来渲染网页。

##总结
★★★★☆（其实不到四星，也就3.7星这样）

总体而言，这本书文笔不是特别晦涩，书里面没有放置完整的代码，而是放在网站上，因此节省了空间；对于CSS3的主要特性都讲到了，也给出了很好的演示例子。错误不多。作者目前就职于Opera，很多例子都会涉及到代码在Opera浏览器下的表现以及与其他浏览器的差异，算是视角比较独特，因为Opera的用户群比Firefox，Chrome，Safari都要少。

如果你想学习CSS3，又完全没有读过任何一本CSS3方面的书籍，可以从这本入手。

{%img /images/blog/browser-market-share-2013-11-6.PNG %}

（桌面浏览器全球市场份额，截止到2013-11-06）