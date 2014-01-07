---
layout: post
title: "《jQuery Cookbook 中文版》笔记"
date: 2014-01-06 19:48
comments: true
keywords: jQuery Cookbook, 中文版
categories: JavaScript
---
<a href="http://book.douban.com/subject/23774480/" class="douban_book" name="23774480" target="_blank" title="jQuery Cookbook 中文版">《jQuery Cookbook 中文版》</a>

仅摘记自己陌生的、新学到的知识点。

##第1章：jQuery基础
###关于ready()方法
`jQuery(document).ready(function(){})`方法可以在DOM加载之后、整个页面加载之前执行JS代码。与之相比，window.onload属性则是在页面全部加载完后（包括图片、SWF等）才被触发。

所以ready()比较贴合实际。但是它也不是必须的：

> 这个定制的jQuery事件只有在JavaScript必须嵌入到页面顶端的文档流并封装在`<head>`元素里时才有必要。我只需将JavaScript文件包含和内联代码放在`<body>`结束标签之前，就能避免使用`ready()`事件。原因有二。
> 
> 一，现代优化技术已经断言，当JavaScript代码放在页面解析的最后由浏览器加载时，页面的加载速度就会变得更快。
>
> 二，ready()方法一定程度上增加了代码量，这样不好。代码越少，网页运行得总是越快。

<!--more-->

###jQuery的选择器引擎
jQuery的选择器引擎是<a href="http://sizzlejs.com" target="_blank">Sizzle</a> —— A pure-JavaScript CSS selector engine
designed to be easily dropped in to a host library.

###克隆DOM元素
先克隆，再移动，最后删除原有的DOM元素，就可以实现DOM元素及其事件处理函数的移动了。 

###html()方法机理
jQuery的html()方法会尽量使用DOM的innerHTML属性来获取和设置HTML块（从其源代码即可看出来）。html()方法在XML文档中不可用，但是可用于XHTML文档。

值得注意的是，html()方法与text()方法只有一点不同：后者会对HTML进行转义（将`<`和`>`替换为HTML实体`&lt;`和`&gt;`）。

##第2章：用jQuery选择元素
###使用上下文参数
jQuery()可以接受第二个参数，指定上下文。jQuery将在这个上下文中搜索匹配选择器表达式的元素。

jQuery使用的默认上下文是document，使用上下文时的执行逻辑可以按照如下方式表达：

``` javascript
jQuery( context ).find( selector );
```

——这就是jQuery在后台所做的事情。

所以，如果已经有了对上下文的引用，那么应该传递这个引用而不是选择器——让jQuery再次经历选择过程是浪费时间。

##第3章：超越基础
###将选中的jQuery对象转换为原始的DOM对象
使用jQuery(selector).get()即可得到DOM对象。或者使用`[]`符号进行下标访问，也可以获得原始DOM对象。

###从现有数组中建立独特的数组
jQuery的工具方法`$.map(array, function(item, index){})`。

``` javascript
$.map([1,2,3], function(n, i){ return n+i; });    // => 返回一个新数组[1,3,5]
```

###避免jQuery与其他程序库冲突
一般是指Prototype库。可以在jQuery库加载代码后面立即运行 `jQuery.noConflict();`，用以释放`$`变量，然后jQuery就只能用jQuery变量了。

也可以声明自己的jQuery简写名：

``` javascript
var jq = jQuery.noConflict();
```

还有一种更高级的方法：在闭包中封装jQuery代码：

``` javascript
jQuery.noConflict();

(function($){
	$('#some_id').css('font-weight', 'bold');
})(jQuery);
```

##第5章：更快、更简单、更有趣
我觉得这一章是精华。本章以几个常见的jQuery错误为例，从JavaScript层面上进行了详细的解释。

> 这不是jQuery，而是JavaScript。

对JavaScript理解不深的人也可以用jQuery做出炫丽的效果来。但是，理解jQuery的本质，才可以成为更好的程序员。

###从其他程序库借用代码
jQuery.fn与jQuery.prototype引用同一个对象。

> 当用jQuery()或$()创建一个jQuery对象时，实际上调用的是`new jQuery()`（jQuery库自动为你添加`new`操作）。……所以，编写jQuery.fn插件，实际上进行的是传统的面向对象JavaScript编程，用构造器的原型向对象添加一个方法。