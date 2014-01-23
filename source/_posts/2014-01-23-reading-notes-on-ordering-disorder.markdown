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
<p><a href="http://book.douban.com/subject/6393626/" class="douban_book" name="6393626" target="_blank">——《秩序之美》</a></p>
</blockquote>

这本书对网格布局系统的推崇，与<a href="http://book.douban.com/subject/3323633/" class="douban_book" name="3323633" target="_blank" title="《写给大家看的设计书（第3版）》">《写给大家看的设计书（第3版）》</a>中“对齐”规则是相呼应的。没有对齐，就会产生混乱。

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

可以用Canvas绘制一个近似的斐波纳契螺旋。

