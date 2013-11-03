---
layout: post
title: "《编写可维护的JavaScript》读书笔记"
date: 2013-11-02 22:23
comments: true
keywords: JavaScript, 编程规范, Maintainable JavaScript
categories: 
---
“程序是写给人读的，只是偶尔让计算机执行一下。”

——Donald Knuth

---------------------------------------

####换行
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
---------------------------------------

####注释
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

---------------------------------------

####花括号的对齐方式
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