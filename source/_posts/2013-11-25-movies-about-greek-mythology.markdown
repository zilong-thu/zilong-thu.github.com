---
layout: post
title: "关于希腊神话与传说的电影集锦"
date: 2013-11-25 17:03
comments: true
keywords: 希腊神话, 电影, Greek Mythology
categories: Movies
---

效果页面：<a href="{{ root_url }}/blog/impressPages/greek_mythology_movies.html" target="_blank" style="font-size:1.5em;color:#32cd32;">关于希腊神话与传说的电影集锦</a>

这是一个用impress.js模板写成的页面，整理了一下我看过的希腊神话相关的电影，会有短评、推荐指数等。不过……尚未完工。神啊，再给我10个小时！！！

暂时只找到了7部电影。都是自己看过的。下面是一些技术细节的记录。
<!-- more -->

###在老旧浏览器中优雅降级
虽然不想支持，但是仍然没有办法，给每个幻灯片页（`div.step`）添加了一个`.group`类，就是上一篇博文里提到的用于清除浮动的类。然后每页就可以流动地下来显示了。

其实严格意义上讲这都称不上“优雅”，完全是对IE浏览器的歧视~~不过我的小米手机在MIUI V5下的安卓浏览器也不支持，嗯，【待研究】。

###目前浏览器支持度

+ win8 IE10，NO
+ iPad4 iOS7 Safari，OK
+ MIUI v5 安卓浏览器，NO
+ Chrome，OK
+ Firefox，OK

###性能优化
####主页面
该页面html文件大小为11KB，额外HTTP请求13次。暂时没有做优化。

####压缩代码
从Github上拉去过来的impress.js项目文件带有大量注释，所以推到网站上时务必要进行压缩。

使用Uglify对impress.js进行压缩。压缩前33KB，压缩后7KB。下载也快了不少。

####压缩图片
电影海报的样式是这样的：

	img.poster{
	    max-width: 200px;
	    max-height: 300px;
	    float: left;
	    margin: 10px 20px 5px 0;
	    box-shadow: 2px 2px 6px #999;
	}

然后我把图片的宽度都统一调到了200px，于是海报图的总体积从854KB降到了253KB。

###如何判断支持度？
impress.js是这样来进行支持度检测的：

	var body = document.body;
	var ua = navigator.userAgent.toLowerCase();
	var impressSupported = 
	                      // browser should support CSS 3D transtorms
	                      // 浏览器应该支持CSS3的3D变形
	                       ( pfx("perspective") !== null ) &&
	                       
	                      // and `classList` and `dataset` APIs
	                       ( body.classList ) &&
	                       ( body.dataset ) &&
	                       
	                      // but some mobile devices need to be blacklisted,
	                      // because their CSS 3D support or hardware is not
	                      // good enough to run impress.js properly, sorry...
	                      // 作者还将移动设备排除在外了。。。
	                       ( ua.search(/(iphone)|(ipod)|(android)/) === -1 );
	
	if (!impressSupported) {
	    // we can't be sure that `classList` is supported
	    body.className += " impress-not-supported ";
	} else {
	    body.classList.remove("impress-not-supported");
	    body.classList.add("impress-supported");
	}

在使用当前模板的前提下，将移动设备的那句正则表达式中安卓设备测试去掉后在我的手机上访问该网页，完全没有效果。所以说，目前impress.js还是只能针对PC、平板这样的大屏幕设备运行。毕竟是个类PPT应用，也没有支持小屏幕的必要。