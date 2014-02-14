---
layout: post
title: "利用JSONP访问跨域数据"
date: 2013-12-28 13:58
comments: true
keywords: JSONP, accessing cross-site data with jsonp, 跨域数据
categories: JavaScript
---
在我的博文<a href="{{ root_url }}/blog/2013/12/04/douban-book-api-ajax-request-using-script-tag/">《使用script标签在博客中跨域调用豆瓣API》</a>中，介绍了发起跨域数据请求的最直接的方法。然后我博客下的引用了豆瓣书籍的地方都根据豆瓣API添加了书籍基本信息查询的功能。不过除了这种原生的方法，还可以使用jQuery对它们进行的封装（虽然与Ajax不是完全相同，但jQuery还是将其封装到ajax函数中去了）发起JSONP跨域请求。

原生方法很直观，适用于不采用jQuery库的网站。

参考资料：

<ul>
<li><a href="http://book.douban.com/subject/24697944/" class="douban_book" name="24697944" target="_blank">《Web开发秘方》</a></li>
<li><a href="http://book.douban.com/subject/10546125/" class="douban_book" name="10546125" target="_blank">《JavaScript高级程序设计（第3版）》</a></li>
</ul>

<!--more-->
##原生JSONP方法
JSONP是 JSON with padding（填充式JSON或参数式JSON）的简写，是应用JSON的一种新方法。JSONP由两部分组成：回调函数和数据。回调函数是当响应到来时，应该在页面中调用的函数。回调函数的名字一般是在请求中指定的，而数据就是传入回调函数中的JSON数据。

据Nicholas Zakas说，JSONP的使用总是通过动态`<script>`元素进行的，使用时为`src`属性指定一个跨域URL。这个请求过程也是异步非阻塞的。

严格来讲，JSONP并不属于Ajax技术，因为Ajax都是通过XMLHttpRequest来进行的。但我觉得，由于JSON的火爆，Ajax这个词到如今已经不限于XMLHttpRequest方法了，只要是JavaScript发起的、异步的HTTP请求，就可以归到Ajax技术中去。

``` javascript 原生JSONP方法实现
var url = 'https://api.douban.com/v2/book/'+bookID+'?callback=showBookInfo';
var script =  document.createElement("script");
script.src = url;
document.body.appendChild(script);
```

###JSONP技术的缺点
基于script标签的JSONP技术要求回调函数必须预先由你的代码提供并且设为全局可访问的。这样不太好。而jQuery对其封装后，回调函数被隐藏了，因此减少了对全局命名空间的污染。个人觉得，如果网站使用了jQuery，那么涉及跨域访问的都最好使用jQuery封装过的ajax方法来实现。

##jQuery封装的JSONP方法

用jQuery进行JSONP数据请求的代码如下所示。可以看到，在url的查询字段中不必写`callback=mycallback`了，只需指定`success`函数即可。另外，貌似jQuery还实现了错误处理（但因为没有进行测试，不知是否可正常运行）。

``` javascript jQuery封装到ajax函数中的JSONP方法
function ajax_douban_movie(){
	$('#request_button').click(function(){
		var url = 'https://api.douban.com/v2/movie/subject/3804891';
		var p = $('#response_data');
		$.ajax({
			type: 'get',
			url: url,
			dataType: 'jsonp',
			jsonp:'callback',
			success: function(data){
				var data = data;

				// 序列化JS对象
				// 传入三个参数：JS对象，函数，缩进空格数
				// 只要传入有效的控制缩进的参数值，结果字符串就会包含换行符
				// （因为只缩进而不换行意义不大）
				var jsonText = JSON.stringify(data,null,4);  
				p.html(jsonText);
			},
			error: function(){
				var html_error = '<span style="color:red;font-family:sans-serif;">这个例子遇到网络错误，没法给你演示喽~先去玩点别的吧~~</span>';
				p.html(html_error);
			}
		});
	});
}

$(document).ready(function(){
	ajax_douban_movie();
});
```

##示例
点击下面按钮，运行jQuery封装了是JSONP跨域请求。如果成功，可以看到豆瓣返回的JSON数据。

<button id="request_button" class="btn btn-primary">查询电影《无人区》的基本信息</button>
<h4>结果：</h4>
<p id="response_data" 
style="display:none;
font-size:0.9em;
color:#444;
border:6px solid #ccc;
padding:1em;
border-radius: 1em;
background-color:#fff;">
</p>

<script type="text/javascript">
function ajax_douban_movie(){
	$('#request_button').click(function(){
		var url = 'https://api.douban.com/v2/movie/subject/3804891';
		var p = $('#response_data');
		$.ajax({
			type: "get",
			url: url,
			dataType: 'jsonp',
			jsonp:'callback',
			success: function(data){
				var data = data;
				var jsonText = JSON.stringify(data,null,4);
				p.html(jsonText).slideDown();
			},
			error: function(){
				var html_error = '<span style="color:red;font-family:sans-serif;">这个例子遇到网络错误，没法给你演示喽~先去玩点别的吧~~</span>';
				p.html(html_error).slideDown();
			}
		});
	});
}

$(document).ready(function(){
	ajax_douban_movie();
});
</script>