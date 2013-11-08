---
layout: post
title: "《编写可维护的JavaScript》读书笔记"
date: 2013-11-02 22:23
comments: true
keywords: JavaScript, 编程规范, Maintainable JavaScript, JavaScript代码规范
categories: Reading-Notes
---
“程序是写给人读的，只是偶尔让计算机执行一下。”

——Donald Knuth

###换行
逗号也是运算符，例如下面，逗号应该作为前一行的结尾。如果把它拿到下面作为第二行的开始，ASI(Automatic Semicolon Insertion，自动分号插入)机制会在某些场景下在前一行结束的位置自动插入分号，于是导致错误的发生。

<pre>
<code>
// 好的代码风格
function(document, element, window, strings, navigator, context,
		div_somediv){
	// Here is some code of this function
}

// 不好的代码风格
function(document, element, window, strings, navigator, context
		, div_somediv){
	// Here is some code of this function
}
</code>
</pre>

<!-- more -->

###注释
单行注释前应该有一个空行。多行注释最好如下所示进行标注与缩进。

<pre>
<code>
function(document, element, window, strings, navigator, context,
		div_somediv){

	// 这里是一个单行注释
	mix(strings, context);
}

function(document, element){

	/*
	 * 这里是多行注释
	 * 星号后面有个空格
	 */
	print(document.text);
}
</code>
</pre>

###花括号的对齐方式
之前我也没在意过这个问题，读到这一节才明白一件事：对于JavaScript，花括号最好放在块语句中第一句代码的末尾，原因与就是对于换行规范的解释：避免错误的分号自动插入。Google JavaScript风格指南则明确禁止将左花括号放在块语句首行的下一行：

<pre>
<code>
// 推荐的做法
if (condition){
	doSomething();
}
else{
	doSomethingElse();
}

// 不好的做法，单纯地模仿C#风格而已，却可能导致自己出现错误
if (condition)
{
	doSomething();
}
else
{
	doSomethingElse();
}
</code>
</pre>

###switch的default
如果`switch`的`default`分支什么也不做，那还要不要留着`default`？Nicholas大神认为这时候应该直接省略掉defaul，因为这可以节省一些字节。

想想像谷歌、百度这样的网站吧，节省一个单词 `default`，说不定就可以因为加快网站的加载速度而留住了更多的用户。

网站在真正发布后，注释是会全部被删掉的。所以开发人员不必关心注释的字节数——个人观点。


###for-in循环
`for-in`循环是用来遍历（说成是“枚举”也许更合适——个人观点）对象属性的，不应用来遍历数组。

`for-in`循环总是会遍历对象的全部属性——包括从原型继承来的属性。当遍历自定义对象的属性时，往往会因为意外的结果而终止。因此，最好使用`hasOwnProperty()`方法来为`for-in`循环过滤出实例属性（instance property）。例如：

<pre>
<code>
/* 这个代码是对书中的修正
 * var prop =>改为  var object
 * 因为for-in方法中的prop不需要用var来声明
 */
var objec = {id: 30, value: 'good'};
for ( prop in objec){
    if (objec.hasOwnProperty(prop)){
    	console.log('Property name is ' + prop);
    	console.log('Property value is ' + objec[prop]);
	}
}
</code>
</pre>

###变量声明与函数声明
1. 总是将局部变量的定义作为函数内第一条语句

2. 使用单`var`语句——又一种减少代码字节数的方法——每个变量的初始化独占一行；对于那些没有进行初始化的变量，它们应当出现在`var`语句的尾部

3. 哪怕是写在`for`循环里临时使用的变量，也最好放到函数顶部的变量声明语句中。

4. 函数声明不应当出现在语句块之内。例如

<pre>
<code>
// bad idea...
if (condition){
	function doSomething(){
		alert('Hi!');
	}
} else {
	function doSomething(){
		alert('Yo!');
	}
}
</code>
</pre>

###严格模式

###原始包装类型（primitive wrapper types）
JavaScript有三种原始包装类型：`String`、`Boolean`和`Number`。每种类型都代表全局作用域中的一个构造函数，并分别表示各自对应的原始值的对象。

<pre>
<code>
var name = 'Nicholas';
name.author = 'yes';
console.log(name.author);  // =>undefined
</code>
</pre>

第二行，JavaScript引擎会根据name的上下文类型临时创建了`String`对象，为这个临时对象添加了一个 autor属性，但在这一句执行结束后，临时的`String`对象就被销毁了。

不推荐使用`new`关键字来创建原始包装类型对象。

###将CSS从JavaScript中抽离
JavaScript不应当直接操作样式，以便保持和CSS的松耦合。在JavaScript中将样式添加至元素的几种方法：

<pre>
<code>
// 好的写法 - 原生JS
element.className += ' reveal';

// 好的写法 - HTML5
element.classList.add('reveal');

// 好的写法 - jQuery
$(element).addClass('reveal');

// 好的写法 - YUI
Y.one(element).addClass('reveal');

// 好的写法 - Dojo
dojo.addClass(element, 'reveal');
</code>
</pre>

###将HTML从JavaScript中抽离
【待实践】

在HTML中使用占位符预先写好文档结构（模板），然后使用JS根据模板动态生成页面。

这一节的技术是比较新潮的。复杂客户端模板可参考Handlebars所提供的解决方案。

###单全局变量模式
单全局变量模式已经在各种流行的JavaScript类库中广泛使用了。

单全局变量模式是指，整个上下文中，只创建一个全局变量；它不会和内置的API冲突，并将你所有的功能代码都挂载到这个全局对象上。

> + YUI定义了唯一一个YUI全局对象
> + jQuery定义了两个全局对象，$和jQuery。只有在$被其他的类库使用了的情况下，为了避免冲突而使用jQuery。
> + Dojo定义了一个dojo全局对象。
> + Cloure类库定义了一个goog全局对象。

关于模块，提到了两个：YUI模块和AMD模块（Asynchronous Module Definition，异步模块定义）。

现在比较好的一个物理效果引擎，[PhysicsJS](http://wellcaffeinated.net/PhysicsJS/)，就采用了AMD模式。

{%img /images/blog/phisicsJS.PNG %}

短小的代码则可以考虑采用“零全局变量”方式嵌入到页面中。

###检测引用值
引用值也称作对象（`object`）。在JavaScript中除了5种原始类型外的值都是引用。

JavaScript内置引用类型：

+ Object
+ Array
+ Date
+ Error
+ Regexp
+ Function

检测某个引用值类型的最好方法是使用`instanceof`运算符，此运算符的返回值类型是Boolean。注意：所有的对象都被认为是`Object`的实例。

关于检测数组，ECMAScript 5 将`Array.isArray()`正式引入JavaScript，唯一的目的就是准确地检测一个值是否为数组。

不过此前Kangax提出的优雅的解决方案还是值得欣赏的：

	function isArray(){
		return Object.prototype.toString.call(value) === "[object Array]";
	}

在当前，可以这样实现数组检测：

	function isArray(value) {
		if (typeof Array.isArray === "function") {
			return Array.isArray(value);
		} else {
			return Object.prototype.toString.call(value) === "[object Array]";
		}
	}

###关于继承
（1）基于对象的继承

基于对象的继承也叫做“原型继承”，一个对象继承另外一个对象（的属性和方法）是不需要调用构造函数的。ECMAScript 5 的`Object.create()`方法是实现这种继承的最简单的方式。例如：

	var person = {
		name: "Nicholas",
		sayName: function(){
			alert(this.name);
		}
	};

	var myPerson = Object.create(person);
	myPerson.sayName();

myPerson会自动继承所有来自person的属性和方法，而如果myPerson重新实现sayName方法，则myPerson.sayName()会自动切断对person.sayName()的访问。

（2）基于类型的继承

###ECMAScript 5 阻止修改策略

+ 防止扩展
+ 密封
+ 冻结

##总结
对于纯粹学习JavaScript的人来说，可以只阅读本书的第一部分和第二部分。第三部分“自动化”，讲在团队开发中如何组织文件管理、文件合并、校验与测试等。

Nicholas写在引言中的话也让人印象深刻。[这里](http://book.51cto.com/art/201303/385990.htm)可以看到引言的网页版。强烈推荐想读此书或者在犹豫要不要买此书的人都先去读一读这篇引言。

总体而言，收获很大。我一边读，就一边觉得，其实像《编写可维护的JavaScript》《JavaScript经典实例》《JavaScript核心技术》这些小部头的书，所讲的内容在《JavaScript权威指南》也大都提到过了，仅仅由于《JavaScript权威指南》是我学习JavaScript时读的第一本书，况且又如此大部头，因而没能读仔细、读透彻的缘故。

读了《JavaScript权威指南》之后我读了《JavaScript核心概念及实践》《高性能JavaScript》，然后现在又读了《编写可维护的JavaScript》，感觉后面这几本可以称为《JavaScript权威指南》的辅助读本，也是进阶读本。
现在觉得当时如果买Nicholas的《JavaScript高级程序设计》作为学习JavaScript的第一本书，效果可能会更好。因为《JavaScript权威指南》确实偏晦涩。