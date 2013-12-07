---
layout: post
title: "《JavaScript编程精解》笔记"
date: 2013-12-06 13:28
comments: true
keywords: eloquent javascript, JavaScript编程精解
categories: Reading
---
<a href="http://book.douban.com/subject/19933548/" class="douban_book" target="_blank" name="19933548">《JavaScript 编程精解》</a>书很薄，160多页，适合一两天看完，查漏补缺之用。据说此书的亮点是，通过用JavaScript来解决许多算法问题，来讲解JavaScript核心技术。

作者“警告”说：学习编程时总是需要探索新的挑战、新的领域，拒绝不断探索的程序员必定会停滞不前、忘记编程的快乐并失去编程的意志（或成为管理人员）。嗯，我会争取做十年程序员，然后……成为管理人员或者成为一个写书的人吧~~

<!-- more -->

###关于自动类型转换
作为弱类型语言，JavaScript有一套复杂的自动类型转换规则。

最为重要的有这样几个：

1. 任意值向布尔值的类型转换
2. 任意值与字符串相加（或者应该叫做字符串拼接）时，任意值将会转换为字符串
3. 数字与字符串乘、除、减时，JavaScript将尝试把字符串转换为数字

``` javascript
false == 0;  // => true
'' == 0;     // => true
'5' == 5;    // => true

console.log(null + 'abc');  // => 'nullabc'
console.log(5*'abc');       // => NaN
console.log(5 - '3');       // => 2
console.log(5 + '3');       // => '53'
console.log(5/'3');         // => 1.6666666666666667
console.log(5%'3');         // => 2

console.log(NaN == NaN);    // => false
console.log(NaN === NaN);   // => false
```
###函数与闭包
JavaScript函数是first-class functions (functions as first-class objects)。详见<a href="http://en.wikipedia.org/wiki/Funarg_problem" target="_blank">Wikipedia: Funarg problem</a>。

函数栈的特性及其将函数用作对象的能力带来一个有趣的问题：如果创建的局部变量的函数调用不在栈上了，那局部变量会发生什么变化？如：

``` javascript
function createFunction(){
	var local = 100;
	return function(){
		return local;
	};
}
```
一旦调用了`createFunction`函数，它就会创建一个局部变量`local`，并返回一个函数。如何处理这一情况就是向上函数变元问题（upwards funarg problem）。JavaScript是从一种能够解决这个问题的语言演变而来的，只要这个局部变量是可达的，就会尽力保存局部变量。

<strong>包裹一些局部变量的一个函数叫做一个闭包。</strong>

``` javascript
function makeAdder(amount){
	var local = 20;

	return function(number){
		return number + amount;
	};
}

var addTwo = makeAdder(2);
addTwo(3);    // => 25
```

纯函数：当使用函数的时候，同样的参数总是返回同样的值，而没有副作用。

用递归解决一个算法问题：

> 从数字1开始，重复执行加5或者乘3这个步骤，会产生无穷多个数字。如何编写函数，使其能够找出恰当的加法和乘法运算序列，以产生指定数字？例如，数字13=1*3+5+5。而数字15则没办法实现。

``` javascript 解决方案
function findSequence(goal){
	function find(start, history){
		if(start == goal){
			return history;
		}else if(start>goal){
			return null;
		}else{
			return find(start+5, '('+history + '+ 5 )') || find(start*3, '('+history+' * 3 )');
		}
	}

	return find(1, '1');
}

findSequence(34);    // => "(((((1 * 3) + 5) * 3) + 5) + 5)"
```
此方案找出的未必是最短的运算序列，只是找出一种序列而已。

这样的递归非常消耗资源，例如，在Firebug里运行`findSequence(8001); `很快出结果，但是运行`findSequence(80001);`就会让火狐死掉，然后以“ too much recursion”为由不再继续进行运算。后者也会让Chrome很崩溃：“RangeError: Maximum call stack size exceeded”。

作者在书里还非常推崇这种简洁美。我觉得，用递归实现算法原理设计，然后用循环取代之，才能放在项目里使用——这才是正经的程序员修炼之道。

###对象属性的命名
中括号内的部分可以为任意表达式，中括号会将表达式转换为字符串来判断对象中是否有该属性的名称。所以，变量名称也可以当成属性名称。
```javascript
var gf = {"my girlfriend name":"coco", age:19, 5:"25"};
console.log(gf.age);                       // => 19
console.log(gf["5"]);                      // => 25
console.log(gf[1+2+2]);                    // => 25
console.log(gf["my girlfriend name"]);     // => "coco"

var propertyName = "my girlfriend name";
console.log(gf[propertyName]);             // => "coco"
```

###对象的存储与引用
对象本身存储在堆上，而声名的变量只是对这个位置的引用。
```javascript obj、obj1、obj2是对完全相同的一个对象的引用
var obj = {age:19};
var obj1 = obj,
    obj2 = obj1;
var obj3 = {age:19};

console.log(obj2 == obj);        // => true;
console.log(obj3 == obj);        // => false;

obj1.age=18;
console.log(obj2.age);           // => 18
console.log(obj["age"]);         // => 18
```

###抽象
程序员一直在寻找尽可能降低程序复杂度的方法，其中很重要的一点就是努力让程序变得更抽象。对于JavaScript，有两种常用的抽象方法：函数式编程和面向对象编程。
###高阶函数
高阶函数：操作其他函数的函数称为高阶函数。
####（1）修改函数
``` javascript
function negate(func){
	return function(x){
		return !func(x);
	};
}

var str1 = '246',
    str2 = 245;
var isNotNaN = negate(isNaN);

console.log(isNaN(str1));              // => false
console.log(isNaN(str2));              // => false
console.log(isNotNaN(str2));           // => true
console.log(isNotNaN(NaN));            // => false
```

####（2）归约函数
####（3）映射数组
映射数组算法遍历数组，将函数应用于每个元素（例如`forEach`），并返回新的数组。

``` javascript
function map(func, array){
	var result = [];
	array.forEach(function(element){
		result.push(func(element));
	});
	return result;
}

map(Math.round, [0.01,0.2, 2, 9.89, Math.PI]);
```

###对象即词典
###原型继承
###JavaScript正则表达式来历
JavaScript的正则表达式使用的语法是Perl兼容正则表达式（Perl Compatible Regular Expressions）。

> 该语法非常含糊，以至于在前10次（或更多次）使用的时候，不得不去查看正则表达式的细节。持之以恒，就可以编写出非常复杂、神秘的表达式了。