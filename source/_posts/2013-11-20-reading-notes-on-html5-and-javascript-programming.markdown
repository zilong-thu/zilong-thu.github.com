---
layout: post
title: "*《HTML5与JavaScript程序设计》笔记"
date: 2013-11-20 20:33
comments: true
keywords: HTML5,程序设计,web前端
categories: Reading-Notes
---
##以及对前端知识的思考随笔

这些天想通过读一本书，来发散式地对前端只是进行调研、思考，选的是<a href="http://book.douban.com/subject/20430370/" target="_blank" title="去豆瓣">《HTML5与JavaScript程序设计》</a>。

这本书是国内的陈爽和贺荣两人所著，在如今译作大行其道的时代，实属难得。只是碰巧在图书馆瞄到了这个标题，就借了来看看。预计4天读完，主要任务是读代码。书中的例子如果顺便练习，代码也会顺便贴到本文里。书中确实有不少错误，而且不仅是印刷错误那么简单的，希望他们以后会出修订版或者第二版。

除非特别声明，所有代码均在Firefox V25.0.1+ 浏览器的Firebug控制台下测试。

OK, GO!
<!-- more -->

###HTML5发展历程
+ 超文本标记语言（第一版），1993年6月作为IETF工作草案发布
+ HTML2.0， 1995年11月作为RFC1866发布
+ HTML3.2， 1996年1月14日发布
+ HTML4.0， 1997年12月18日发布
+ HTML4.01，1999年12月24日发布，HTML4.0的微小改进
+ HTML5， 2008年1月22日公布第一份正式草案

###V8引擎
V8引擎在运行之前将JavaScript编译成机器码，而非字节码或是直译它，以此提升性能。更进一步，使用了如内联缓存（inline caching）等方法来提高性能。有了这些功能，JavaScript程序与V8引擎的速度媲美二进制编译。（来自Wikipedia，看上去《HTML5与JavaScript程序设计》这书的不少内容也是直接摘抄自维基百科。）

###乔布斯：对Flash的思考
2010年4月，乔帮主的一篇文章——<a href="http://www.apple.com/hotnews/thoughts-on-flash/" target="_blank" title="原文地址">Thoughts on Flash（对Flash的思考）</a>——将原本只是在开发人员中知名的HTML5推向主流媒体。乔帮主指出，指出随着HTML5的发展，观看视频或其它内容时，Adobe Flash将不再是必须的。

这篇文章让我对开源、标准化有更深的理解了。

###判断奇偶数
现在知道取余数运算`%`是可以非常精确的，但也会有误差，例如：

	var n = 102;
	console.log(n%2===0);

运行结果为`true`。但是：

	var n = 102.00000000000001;
	console.log(n%2===0);

结果为`false`，而

	var n = 102.000000000000001;
	console.log(n%2===0);

运行结果是`true`。所以我认为，这里面应该有个截断误差的问题，好比小于10-5次方的部分就会被舍弃。当然，如果知道自己使用取余数运算符时传给它的数总是整数，那就没有任何问题。对小数取余也没什么实际意义，当用户给`%`一个小数时，JavaScript只是不得不对它计算一下而已。

###函数参数传递
JavaScript大部分参数是值传递，而对function、object、array类型，则是引用传递。例如

	var arr = [0,1,2,3];
	function test(array){
	    array.push(4);
	}
	test(arr);
	console.log(arr);  // =>  [0, 1, 2, 3, 4]

###void函数与死链接
void是一个操作符，它计算一个表达式，但是不返回值。可以用来实现死链接，下面是三种实现死链接的方法——不过，话说死链接是干嘛用的？嗯，这种hack不可取，知道就行了。

	<a href="JavaScript:void(0)">死链接</a>  // 单击没有任何作用
	<a href="JavaScript:void((function(){alert('hello');})())">死链接</a>  // 单击会运行该函数
	<a href="#">死链接</a>  // #默认的锚点是#top，未必如愿

###有限的栈空间与函数递归
浏览器的栈空间是有限的，递归应尽量使用迭代来代替。

###eval动态执行
这是JavaScript的强大之处吧，eval方法（全局方法）铸就了JSON以及Ajax的牛逼。

	var str = '{"name":"lili","sex":"male"}';
	var jsonObj = eval('('+str+')');
	console.log(jsonObj.name);  // => lili