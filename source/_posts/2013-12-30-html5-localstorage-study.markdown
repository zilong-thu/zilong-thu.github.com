---
layout: post
title: "html5 localStorage初探"
date: 2013-12-30 21:38
comments: true
keywords: html5 localStorage, HTML5本地存储
categories: HTML5
---
HTML5 Web Storage的目的是克服cookie的一些限制：当数据需要被严格控制在客户端上时，无须持续地将数据发送回服务器。这里只初步研究一下localStorage属性。要访问同一个localStorage对象，页面必须来自同一个域名（子域名无效），使用同一种协议，在同一个端口上。

<blockquote>
	<p> Web Storage的两个主要目标是：
		<ul>
		<li>提供一种在cookie之外存储会话数据的途径；</li>
		<li>提供一种存储大量可以跨会话存在的数据的机制。</li>
		</ul>
	</p>
	<p>——<a href="http://book.douban.com/subject/10546125/" name="10546125" class="douban_book" target="_blank">《JavaScript高级程序设计》</a></p>
</blockquote>

对HTML5 localStorage属性介绍比较早且比较好的一篇文章：

<a href="http://www.cnblogs.com/xiaowei0705/archive/2011/04/19/2021372.html" target="_blank">HTML5 LocalStorage 本地存储 - xiaowei0705 - 博客园 - 20110419</a>。

当然了，更权威的是W3C的规范文档：

<a href="http://www.w3.org/TR/webstorage/" target="_blank">Web Storage - W3C Recommendation 30 July 2013</a>

###存储位置
Q：localStorage文件存储在哪里？

A：Windows 8 下，Chrome浏览器将本地存储文件放在`C:\Users\username\AppData\Local\Google\Chrome\User Data\Default\Local Storage`目录下。如下图所示。

<img src="{{root_url}}/images/blog/html5/20131230/chrome_localstorage_dir.PNG" title="localStorage of Chrome on win8">

用记事本打开任何一个文件，可以看到里面都是十六进制码。
<!--more-->

遍历localStorage实例：

<p id="enum_localstorage" class="output"></p>

记录访问本页面的次数：

<p id="readCountRes_p" class="output"><span id="readCountRes"></span>对于同一个浏览器，你每进入本页面一次，相应的记录会增加1。关掉浏览器、关掉电脑都木有影响。</p>

<script type="text/javascript">
$(document).ready(function(){
	readCount();
});

function readCount(){
	if(window.localStorage){
	   //支持localStorage
	   var length = localStorage.length;
	   var count = localStorage['count'];
	   	if(count == null){
	   		count = 1;
	   	}else{
	   		count = Number(count) + 1;
	   	}

	   	// 遍历并输出当前localStorage对象中的属性
	   	var html_enum_ls ='';
	   	html_enum_ls += '本页面的localStorage对象共有<span style="font-weight:bold;color:blue;font-size:1.2em;"> ' + length +' </span>个属性，它们是：'
	   	html_enum_ls += '<ul>';
	   	for (var key in localStorage){
		   html_enum_ls += '<li>' + key + ' : ' + localStorage[key] +'</li>';
		}
		html_enum_ls += '</ul>';
	   	$('#enum_localstorage').html(html_enum_ls);

	   	// 输出访问本页面的次数
	   	$('#readCountRes').html('根据localStorage里的数据我们知道，你的浏览器访问本页面共计<span style="font-weight:bold;color:blue;font-size:1.2em;"> '+ (count-1) +' </span>次。');
	   	localStorage.count = count;
	}else {
		$('#readCountRes_p').html('你的浏览器不支持localStorage特性……换个更新的浏览器吧~~');
	}
}
</script>

###存储期限
Q：能保存多久？

A：存储在localStorage中的数据遵循这样的规则：数据保留到通过JavaScript删除或者是用户清除浏览器缓存。

<img src="{{root_url}}/images/blog/html5/20131230/clearCache.PNG" title="clear localStorage Cache of Chrome on win8">

注意：仅仅勾选“清空缓存”并不能删除localStorage中的数据，起作用的是上面那项——“删除Cookie以及其他网站数据和插件数据”。

###其他
Kayo的文章<a href="http://kayosite.com/web-app-by-jquery-mobile-and-html5-web-storage.html" target="_blank">《使用 jQuery Mobile 与 HTML5 开发 Web App —— HTML5 Web Storage》</a>介绍了三个安全隐患。但从Chrome的那个local storage目录里可以看到，有1500多项，也就是说我这四个月（重装win8后）访问的700多个网站都使用了Web Storage特性（？）。总的磁盘占用量也不大，目前就用了12.8MB而已。