---
layout: post
title: "《秩序之美》笔记"
date: 2014-01-23 10:22
comments: true
keywords: ordering disorder, 秩序之美
categories: Web-FE
---

<blockquote>
<p>无论如何，最成功的设计可以简化为一种最为本质的目的：在混沌中创造秩序。</p>
<p>——<a href="http://book.douban.com/subject/6393626/" class="douban_book" name="6393626" target="_blank">《秩序之美》</a></p>
</blockquote>

这本书对网格布局系统的推崇，与<a href="http://book.douban.com/subject/3323633/" class="douban_book" name="3323633" target="_blank" title="《写给大家看的设计书（第3版）》">《写给大家看的设计书（第3版）》</a>中“对齐”规则是相呼应的。没有对齐，就会产生混乱。

<!--more-->

###斐波纳契数列与黄金比例
黄金比例是1:1.618，而斐波纳契数列则无限逼近一个以1.618为公比的等比数列。用下面的JavaScript程序在Node里或者浏览器里运行，对斐波纳契数列前500项之比的计算，得到的结果是1.618033988749895。以JavaScript的精度，也只能算到这个值了。

``` javascript
var fibonacci = function(m){
	var invocation_count = 0;
	var memo = [0, 1];
	var start, end;
	var fib = function(n){
		var res = memo[n];
		if(typeof res !== 'number'){
			res = fib(n-1) + fib(n-2);
			memo[n] = res;
		}
		invocation_count++;
		return res;
	};

	start = +new Date;
	for(var i=0; i<=m; ++i){
		fib(i);
	}

	for(var i=1; i<=m; ++i){
		console.log( fib(i)/fib(i-1) );
	}

	end = +new Date;
	
	console.log('Fibonacci数列前'+ m +'项之比计算，耗时： '+ (end - start) + ' ms');
};

fibonacci(500);
```

另见：<a href="http://www.matrix67.com/blog/archives/5221" target="_blank">为什么Fibonacci数列相邻两项之比会趋于0.618？</a>

###横向网格分栏数
这本书的项目例子使用了16单元。内容区10单元，右侧两单元为空白；右侧文章导航、广告、用户登录区等占用4单元。尽量营造2:1的布局格式（接近黄金分割比）。

###字体
博客文章字体为衬线字体，其他的如标题、署名、图片题注、页面部件的字体，都是无衬线字体。以便将内容与背景区分开来。

###自己的思考
网站的设计应该按照这样的顺序：

用户需求、目标 --> 交互设计师给出线框图、每一页的草图 --> 前端工程师从草图（或者切图）开始设计，确定模板，提出各部分对后端的数据需求 --> 服务器端开发人员根据前端人员的需求编写服务器代码，并向前端工程师提供API

总体来说，这本书给出了一个多页面网站界面的设计步骤示意，每一个页面都按照各自的功能进行个性化设计。不过值得注意的是，现在更为流行单页面应用的开发——尽可能通过Ajax进行数据交换，而不是刷新到不同的路由下来更新数据。更像软件的网页应用可以提高用户体验、减少服务器载荷，是一大趋势。