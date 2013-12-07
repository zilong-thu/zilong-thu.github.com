---
layout: post
title: "使用script标签在博客中跨域调用豆瓣API"
date: 2013-12-04 14:39
comments: true
keywords: Ajax,douban book api,豆瓣API,跨域HTTP请求
categories: Ajax
---
摘要：本文介绍如何在个人博客中为一些读过的图书添加Ajax实时请求：当鼠标点击该书名链接时，发起异步跨域HTTP请求，获得该书在豆瓣的基本信息，并显示在鼠标附近。另外，为保证“优雅降级”，该链接在用户禁用JavaScript时会直接去往豆瓣该书的页面。

参考<a href="http://book.douban.com/subject/4719162/" class="douban_book" target="_blank" name="4719162">《高性能网站建设进阶指南》</a>介绍的六种无阻塞加载脚本技术，本文使用的技术应该是“Script DOM Element”方法。

图书信息展示方式使用与豆瓣读书相同的布局，但不提供用户操作的选项，例如“写书评”“写读书笔记”等功能。

<img src="{{root_url}}/images/blog/20131204_doubanAPI_target_result.png" alt="希望做成的效果图，与豆瓣读书类似">

<!-- more -->
###1. 框架与模块化
思路：任意博文，指向豆瓣书籍页面的链接按照一定的格式书写，然后我的JS代码即可在加载时为其注册鼠标悬停/点击事件处理程序。

要尽可能使此功能模块与我的博客分离开来，因此将尽量不共用CSS、不在博文中添加过多的标签。

考虑Octopress博客框架的模块化，可以将消息容器div、调用我自己写的js文件的`<script>`块统一放到`octopress\source\_includes\custom\after_footer.html`文件里。这样，只需在写博客的时候将希望显示豆瓣图书信息的超链接按照一定的格式书写即可。

####1.1 HTML文档
在博文HTML文档中，书写书籍链接时的格式如下，其中`class`和`name`属性是必须的。考虑可访问性，`href`属性也是必须的。
``` html
<a class="douban_book" href="http://book.douban.com/subject/bookID/" name="bookID">bookName</a>
```
####1.2 CSS样式表
在`_style.scss`里添加：
``` css div_douban_wrapper容器的样式
#div_douban_wrapper{
	display: none;
	position: fixed;
	left: 30%;
	top: 20%;
	border: none;
	z-index: 2;
	box-shadow: 1px 1px 15px #333;
	padding: 1em;
	background-color: #fff;
}
```

####1.3. `<script>`标签实现跨域HTTP请求
参考<a class="douban_book" href="http://book.douban.com/subject/10747833/" name="10747833" target="_blank">精彩绝伦的jQuery</a>，使用如下代码即可为指向豆瓣读书的书名超链接添加Ajax请求：

``` javascript
// 为HTML里的豆瓣图书超链接注册事件处理函数
function registerDoubanBookEventHanler(){
	var a = $('a.douban_book');

	for(var i=0, length=a.length;i<length;i++){
		a[i].onmouseover = function(){
			requestBookInfo(this);
			return false;
		};

		a[i].onmouseout = function(){
			setTimeout("$('#div_douban_wrapper').fadeOut(600);",1200);
			return false;
		};
	}
}

// 请求豆瓣图书数据
// element为事件的target元素
function requestBookInfo(element){
	var bookID = element.name;
	var url = 'https://api.douban.com/v2/book/'+bookID+'?apikey=yourAPIKey&callback=showBookInfo';
	var script =  document.createElement("script");
	script.src = url;
	script.setAttribute("class","script_for_ajax");  // 设置class属性是为了在完成Ajax请求后将其删除
	document.body.appendChild(script);
}
```

####1.4. 在Octopress博文中使用自己的js插件
将自定义的div容器和所需的js代码放在博客的框架中。调用自己写的js文件，也是通过`<script>`标签的`src`属性来实现。

``` html 放在octopress/source/_includes/custom/after_footer.html文件中
<div id="div_douban_wrapper">
<span class="douban_close" title="close"></span>
<div id="div_douban_content" class="group"></div>
<div class="douban_footer">Powered by <a href="http://www.douban.com/" target="_blank">Douban</a></div>
</div>
<script type="text/javascript">
$(document).ready(function(){
	(function(){
		var url = '{{root_url}}/javascripts/mylibs/bouban_book.js';
		var script =  document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
	})();
});
</script>
```
###2. 将信息框放在鼠标旁边
待商榷。

###3. 悬停还是点击？
考虑禁用JS的情况，此时用户鼠标悬停于其上时不会出现提示框，但是点击超链接，仍然会访问到豆瓣读书的页面。这里就有一个行为一致性的问题，即应该尽量保证禁用和不禁用JS时，都是通过点击来获得信息。

另外，这也是博主不希望读者离开本博客的理由~~能在本页面获取的信息，就尽量在当前页面获取。

###4. 为超链接添加豆瓣logo
可以弹出图书基本信息的超链接既然在功能上与普通链接不同，那么最好对其进行视觉上的处理。另外一方面，这也可以作为自己的脚本加载并运行成功的提示。

由于本博客目前使用的多说评论系统带有一个16×16的豆瓣logo，于是为了避免过多请求资源，就用那个url，在每个注册了自定义点击事件的图书链接后面插入一个豆瓣logo。

``` javascript
var icon_url = 'http://static.duoshuo.com/images/service-icons-color.png';
var str_douban_icon_style = 'display:inline-block;width:16px;height:16px;background:url(\'' +
							 icon_url + '\') 2px -96px no-repeat transparent;padding: 0 2px;';
$(a).after('<span style="'+str_douban_icon_style+'"></span>');
$(a).attr('title','点击查看该书基本信息');
```

###5. 为提示框添加响应式布局样式
在PC端，屏幕横向分辨率一般大于1024px，这样的提示框宽度往往没有问题。要处理的是在移动设备下的宽度（我可以测试的仅有iPad与安卓手机）。
下面的解决方案还不完美，等找到更好的解决方案后再替换掉。

``` css 在#div_douban_wrapper之后声明以下媒体查询样式
@media screen and (max-width: 600px){
  #div_douban_wrapper{
    left: 5%;
    right: 5%;
    padding: .5em;
  }
}
@media screen and (min-width: 601px) and (max-width: 768px){
  #div_douban_wrapper{
    left: 10%;
    right: 10%;
    padding: .5em;
  }
}
```
###6. 进一步的优化
这样就行了吧。这样就行了吗？还可以更好。
####6.1 宽度过渡平滑
为`#div_douban_wrapper`添加`transition`属性，使得在随着浏览器窗口宽度变化时，该div的宽度也平滑地过渡。但这就跟视差滚动效果一样：只有在用户主动改变浏览器窗口大小时才有可能发现这个平滑地过渡效果。虽然如此，我还是必须得这样做。

``` css
#div_douban_wrapper{
	transition: left 0.5s, top 0.5s;
}
```
###6.2 点击页面空白处关闭消息框
【待研究】