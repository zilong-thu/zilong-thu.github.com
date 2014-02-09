---
layout: post
title: "《JavaScript高级程序设计》笔记"
date: 2014-01-25 11:22
comments: true
keywords: JavaScript, professional javascript for web developers
categories: JavaScript
---

<!-- more -->

##第4章
###4.1 基本类型和引用类型的值
在复制某个保存着对象的变量时，操作的是对象的引用；但在通过这些变量为对象添加属性时，操作的是实际的对象。
####4.1.3 传递参数
ECMAScript中的所有函数参数的传递都是按值传递的。即，把函数外部的值复制给函数的形参（形参是局部变量），就跟把值从一个变量复制到另一个变量一样。

``` javascript
function setName(obj){
	obj.name = 'Nicholas';
	obj = new Object();
	obj.name = 'Greg';
}

var person = new Object();
setName(person);
console.log(person.name);  // => Nicholas
```

####4.1.4 检测类型
`typeof`运算符用来检测变量是什么基本类型，而`instanceof`运算符可用来检测是哪种对象类型。

``` javascript
var person = {
        name: 'Wang Zilong',
        age: '25'
    };
var colors = ['red', 'green', 'blue', 'yellow'];
var func = function(){
    console.log('I am a function');
}
var now = new Date();

console.log(person instanceof Object);
console.log(colors instanceof Array);
console.log(func instanceof Function);
console.log(now instanceof Date);

console.log(typeof func);
console.log(typeof now);
```

####4.2.2 没有块级作用域

<blockquote>
<p>变量查询也不是没有代价的。很明显，访问局部变量要比访问全局变量更快，因为不用向上搜索作用域链。JavaScript引擎在优化标识符查询方面做得不错，因此这个差别在将来恐怕可以忽略不计了。</p>
</blockquote>

我觉得，这一点的启示重要的不是局部变量优势不再，而是以后在使用闭包时可以不必太担心性能问题。因为闭包总是在访问外部变量。

###4.3 垃圾收集
标记清除是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。

2008年为止，IE、Firefox、Opera、Chrome和Safari的JavaScript实现使用的都是标记清除式的垃圾收集策略（或类似的策略），只不过垃圾收集的时间间隔互有不同。

##第5章 引用类型
####5.2.5 重排序方法
`sort()`方法默认情况下会调用每个数组项的`toString()`转型方法，然后比较得到的字符串，以确定如何排序。即使数组的每一项都是数值，`sort()`方法比较的也是字符串。

####5.2.6 操作方法
`splice()`方法是功能最强大的数组方法了。语法：

splice(操作位置下标, 要删除的项的数目, 要插入的项)

###5.3 Date类型
ECMAScript添加了 Date.now() 方法，返回表示调用这个方法时的日期和时间的毫秒数。与 +new Date() 结果相同。

###5.5 函数
####5.5.2 函数声明与函数表达式
解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

####5.7.1 Global对象
<blockquote>
<p>Global对象可以说是ECMAScript中最特别的一个对象了，因为不管你从什么角度上看，这个对象都是不存在的。</p>
</blockquote>

####5.7.2 Math对象
要找到数组中的最大或最小值，可以如下使用`apply()`方法：

``` javascript
var values = [1,2,3,4,5,6,7,8,9];
var max = Math.max.apply(Math, values);
```

##第6章 面向对象的程序设计
####6.2.1 工厂模式
工厂模式解决了创建多个相似对象的问题，但没有解决对象识别的问题（即怎样知道一个对象的类型）。
####6.2.2 构造函数模式


##第7章 函数表达式
###7.2 闭包
####7.2.1 闭包与变量
为何感觉这一节的内容似曾相识？好像是在《JavaScript语言精粹》里面也有讲。果然，读书有一个规律：读两本书每本书只读一边，不如读一本书读两遍效果好。

废话少说，敲代码，试例子。

``` javascript 失败了的闭包
function createFunctions(){
	var result = new Array();

	for (var i = 0; i<10; i++){
		result[i] = function(){
			return i;
		};
	}

	return result;
}

var res = createFunctions();
for(var i=0, length = res.length; i<length; i++){
	console.log(res[i]());
}
```

``` javascript 成功的闭包
function createFunctions(){
	var result = new Array();

	for (var i = 0; i<10; i++){
		result[i] = function(num){
			return function(){
				return num;
			};
		}(i);
	}

	return result;
}

var res = createFunctions();
for(var i=0, length = res.length; i<length; i++){
	console.log(res[i]());
}
```

####7.2.2 关于this对象
每个函数在被调用时都会自动获得两个特殊变量：`this`和`arguments`。匿名函数的执行环境通常具有全局性，因此其`this`值通常指向`window`。当然，在通过`call()`或者`apply()`方法改变函数执行环境的情况下，`this`就会指向其他变量。

``` javascript 原始的闭包
var name = "The window";

var obj = {
	name: 'My object',
	getName: function(){
		return function(){
			return this.name;
		};
	}
};

console.log(obj.getName()());
```

``` javascript 修正1
var name = "The window";

var obj = {
	name: 'My object',
	getName: function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};

console.log(obj.getName()());
```

``` javascript 作为方法的函数
var name = "The window";

var obj = {
	name: 'My object',

	// 函数作为对象的方法时，其内部的this值默认指向该对象实例
	// 《JavaScript语言精粹》
	getName: function(){
		return this.name;
	}
};

console.log(obj.getName());
```

###7.3 模仿块级作用域

``` javascript
function func(){
	// 这里是块级作用域
}();    // 出错！
```
上面的代码会出错，是因为JavaScript会将`function`关键字当做一个函数声明的开始，而函数声明后面是不能跟函数调用符号（圆括号）的。然而，函数表达式后面是可以跟圆括号的。这样就是行得通的：

``` javascript 块级作用域技术
(function func(){
	// 这里是块级作用域
	// 通常称为私有作用域
})();
```

这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。

##第8章 BOM
###8.3 location对象
2013年10月份的百度前端开发笔试试题就有一道是考`location`对象的查询字段参数获取方法的。在此记录一下：

``` javascript
function getQueryStringArgs(){
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
		args = {},
		items = qs.length ? qs.split("&") : [] ,
		item = null,
		name = null,
		value = null,
		i = 0,
		len = items.length;

	for (i=0; i< len; i++){
		item = items[i].split("=");

		// 查询字符串应该是编码过了的
		// 所以要解码
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);

		if (name.length){
			args[name] = value;
		}
	}

	return args;
}
```

###8.3 navigator对象
####8.3.1 检测插件

``` javascript 非IE浏览器下检测插件
function hasPlugin(name){
    name = name.toLowerCase();
    
    for (var i=0, len=navigator.plugins.length; i<len; i++){
        if (navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
            return true;
        }
    }
    
    return false;
}

console.log(hasPlugin("Flash"));
console.log(hasPlugin("QuickTime"));
```

例如火狐浏览器下查看QQ2013插件：

<img src="{{root_url}}/images/blog/javascript/20140128/qq2013plugin_in_firefox.PNG">

##第11章 DOM扩展
###11.3 HTML5
####11.3.7 scrollIntoView()方法
经测试，现在的Chrome浏览器也已经支持scrollIntoView()方法了。