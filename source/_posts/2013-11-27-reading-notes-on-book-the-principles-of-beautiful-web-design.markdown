---
layout: post
title: "《完美网页的视觉设计法则》笔记 "
date: 2013-11-27 11:06
comments: true
keywords: the principles of beautiful web design, 完美网页的视觉设计法则, web前端, 设计, 切图
categories: Reading-Notes
---

###什么是全面虚拟？
> Comp是comprehensive dummy（全面虚拟）的缩写，这个术语来自于打印设计领域。是一种在进行打印之前，先将已经创建好的、用于打印的布局完全模拟的过程。将这个词移植到网页设计中，comp就是在我们开始用HTML进行原型设计之前的某个布局的图像。

在web前端开发中，“全面虚拟”就是指用Photoshop建模的过程了。之前我一直不鸟这部分内容，直到昨天面试被鄙视。。。
<!-- more -->
###尽可能考虑黄金比例
0.618

###960 Grid System
这是一种固定宽度、通常居中的网页布局框架。

人人网也采用类似的思路，但是其主体的宽度改为了980px：

	.layout_home3cols #main{
		width: 980px;
		padding-bottom: 20px;
	}
然后再分为三栏：左栏160px，中间540px，右侧栏240px。