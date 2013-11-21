---
layout: post
title: "HTML5 SVG交互实例：转动的风车"
date: 2013-11-15 15:44
comments: true
keywords: HTML5, SVG, SVG交互
categories: HTML5
---
在HTML里读取外部的一个SVG文件，这个外部SVG文件包含内置的JavaScript控制交互操作：用户点击风车的任何一个叶子，风车会转起来，如果再点一下叶片，就会停止转动。

风车是我用Adobe Illustrator，仿照随便百度来的一个位图画的。

<embed  src="{{ root_url}}/svg/windmill.svg" type="image/svg+xml">
<!-- more -->
###SVG文件内部脚本嵌入方式
在SVG文件里这样嵌入JavaScript脚本：

	<script><![CDATA[

		// 这里是脚本
		......
	]]>
	</script>

###加载顺序
如果使用`<embed>`进行外部SVG文件的加载，同时使用诸如`window.onload = function(){// Event Handler ...};`或者)`$(document.ready(function(){});`进行事件处理函数注册，那么SVG的加载与事件处理函数的注册是异步的。
所以我暂时将脚本放在SVG文件里了。这样当然很不好，内容、行为没有很彻底的分离。

###SVG与CSS
SVG内部可以添加`<style>`标签包含的样式表，例如在这个风车的例子里，给四个叶子添加`:hover`伪类样式，鼠标悬停时将描边的颜色改为灰色：

	<style type="text/css">
		#wings{
			cursor: pointer;
		}
		#wings:hover{
			stroke: #999999;
		}
		#wings:hover{
			stroke: #333333;
		}
	</style>

###循环动画的实现
目前暂时使用`setInterval`来实现动画，每隔35毫秒让风车的四个叶子顺时针旋转1°，于是帧速率约等于28帧（根据《高性能JavaScript》的介绍，`setInterval`方法是不精确的，所以说“约等于”）。等有时间再研究如何使用`requestAnimationFrame()`方法实现动画。

###3D效果
作为一个引子，下篇博文将研究Illustrator绘制具有3D效果的矢量图并将其输出为SVG后，其元素的交互性能，以及与3ds max的关系。

<embed src="{{ root_url}}/svg/starIn3D.svg">