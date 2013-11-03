---
layout: post
title: "《编写可维护的JavaScript》读书笔记"
date: 2013-11-02 22:23
comments: true
keywords: JavaScript, 编程规范, Maintainable JavaScript, JavaScript代码规范
categories: 
---
“程序是写给人读的，只是偶尔让计算机执行一下。”

——Donald Knuth

+ ###换行
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

+ ###注释
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

+ ###花括号的对齐方式
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

+ ###switch的default
如果switch的default分支什么也不做，那还要不要留着default？Nicholas大神认为这时候应该直接省略掉defaul，因为这可以节省一些字节。

想想像谷歌、百度这样的网站吧，节省一个单词 default，说不定就可以因为加快网站的加载速度而留住了更多的用户。

网站在真正发布后，注释是会全部被删掉的。所以开发人员不必关心注释的字节数——个人观点。

+ ###for-in循环
for-in循环是用来遍历（说成是“枚举”也许更合适——个人观点）对象属性的，不应用来遍历数组。

for-in循环总是会遍历对象的全部属性——包括从原型继承来的属性。当遍历自定义对象的属性时，往往会因为意外的结果而终止。因此，最好使用hasOwnProperty()方法来为for-in循环过滤出实例属性（instance property）。例如：

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

+ ###变量声明与函数声明
1. 总是将局部变量的定义作为函数内第一条语句

2. 使用单var语句——又一种减少代码字节数的方法——每个变量的初始化独占一行；对于那些没有进行初始化的变量，它们应当出现在var语句的尾部

3. 哪怕是写在for循环里临时使用的变量，也最好放到函数顶部的变量声明语句中。

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

+ ###严格模式