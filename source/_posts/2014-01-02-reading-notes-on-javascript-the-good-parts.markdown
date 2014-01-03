---
layout: post
title: "《JavaScript语言精粹》笔记"
date: 2014-01-02 14:37
comments: true
keywords: javascript the good parts, JavaScript, JavaScript语言精粹
categories: JavaScript
published: true
---
<a href="http://book.douban.com/subject/3590768/" class="douban_book" name="3590768" target="_blank" title="《JavaScript语言精粹》">《JavaScript语言精粹》</a>

<a href="http://blog.jobbole.com/53199/" target="_blank">伯乐在线 - 给JavaScript初学者的24条最佳实践</a>

<!--more-->

##第3章 对象
###检索
优先考虑使用`.`表示法，因为它更紧凑且可读性更好。

尝试从`undefined`的成员属性中取值将会导致TypeError异常，这时可以通过`&&`运算符来避免错误。
###引用
对象通过引用来传递。它们永远不会被复制。
###原型
Prototype

所有通过对象字面量创建的对象都连接到`Object.prototype`，它是JavaScript中的标配对象。

原型连接在更新时是不起作用的。当我们对某个对象做出改变时，不会触及该对象的原型。原型链只有在检索值的时候才被用到。

``` javascript 使用某对象作为原型创建新对象
if(typeof Object.create !== 'function'){   // 此处中文版有错误，不知为何，Object.create被印刷成Object.beget。可参加英文原版
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}

var person = {
	'first-name': 'Zilong',
	'last-name' : 'Wang',
	age : 25,
	sayName     : function(){
		console.log('My name is '+ this['first-name'] + ' ' + this['last-name'] + '.');
	}
};

// 以person对象为原型的新对象
var another_person = Object.create(person);

another_person.sayName();                // => My name is Zilong Wang.
another_person['first-name'] = 'San';
another_person['last-name'] = 'Zhang';

another_person.sayName();                // => My name is San Zhang.
person.sayName();                        // => My name is Zilong Wang.

// 对原型的更新会立即对所有基于此原型创建的对象可见
person.address = 'Beijing';
console.log(another_person.address);     // => Beijing

// 不过在检查自有属性的时候，address并不在another_person中
// hasOwnProperty方法不会检查原型链
console.log(another_person.hasOwnProperty('address'));      // => false
```

##第4章 函数
###函数对象
> JavaScript设计得最出色的就是它的函数的实现。它几乎接近完美。但是，想必你也能预料到，JavaScript的函数也存在瑕疵。

JavaScript中的函数就是对象。对象是“名/值”对的几何并拥有一个连接到原型对象的隐藏连接。对象字面量产生的对象连接到`Object.prototype`。函数对象连接到`Function.prototype`（该对象本身连接到`Object.prototype`）。每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。

这里涉及的原型链如下图所示。

<embed src="{{ root_url}}/images/blog/javascript/20140102/prototype_chain.svg" type="image/svg+xml">

另外，每个函数在创建时也随配有一个`prototype`属性。它的值是一个拥有`constructor`属性且值即为该函数的对象。这和隐藏连接到`Function.prototype`完全不同。

一个内部函数除了可以访问自己的参数和变量，同时它也能自由访问把它嵌套在其中的付函数的参数与变量。通过函数字面量创建的函数对象包含一个连到外部上下文的连接。这被称为闭包（closure）。它是JavaScript强大表现力的来源。

###调用（Invocation）

JavaScript一共有4种函数调用模式：

+ 方法调用模式（the method invocation pattern）
+ 函数调用模式（the function invocation pattern）
+ 构造器调用模式（the constructor invocation function）
+ apply调用模式（the apply invocation pattern）

####构造器调用模式
如果在一个函数前面带上 `new` 来调用，那么背地里将会创建一个连接到该函数的`prototype`成员的新对象，同时`this`将被绑定到那个新对象上。

``` javascript
var Quo = function(string){
	this.status = string;
};

// 因为 Quo.prototype 是所有用 new 关键字来调用时创建的新对象的原型
// 所以，这样给Quo的所有实例提供一个名为 get_status 的公共方法：
Quo.prototype.get_status = function(){
	console.log(this.status);
};

var myQuo = new Quo("confused");

myQuo.get_status();                 // => confused
```

<strong>我的感觉是：通过构造器函数实现继承的方式，是提供给那些无法接受原型继承思想的程序员来用的。</strong>

####Apply调用模式
函数是对象，所以函数可以拥有方法。

``` javascript
var add = function(a,b){
	return a+b;
};

var array = [3, 4];
var sum = add.apply(null,array);

var statusObject = {
	status: 'A-OK'
};

// statusObject 并没有继承自 Quo.prototype，但我们可以在statusObject上调用
// get_status 方法，尽管 statusObject 并没有一个名为 get_status 的方法
// 原因就是 apply 调用将 get_status 内的 this 值绑定到传递给它的对象上了
Quo.prototype.get_status.apply(statusObject);   //=> A-OK
```

###关于返回值
一个函数总是会返回一个值。如果没有指定返回值，则返回 `undefined`。

如果函数调用时在前面加上了 `new`前缀，且返回值不是一个对象，则返回 `this`（该新对象）。

###扩展类型的功能

JS允许给语言的基本类型扩充功能。例如通过给Function.prototype增加方法来使得该方法对所有函数可用：

``` javascript
// 只有在确定没有改方法时添加它
Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
	return this;
};

// JavaScript缺少一个移除字符串收尾空白的方法，可用这样弥补：
// 由于在ECMAScript 5 规范中，已经为String对象添加了trim方法，所以先检测有没有原生的
if(!String.trim){
	String.method('trim', function(){
		return this.replace(/^\s+|\s+$/g, '');
	});
}

var str1 = '  aa ';
var str2 = str1.trim();
console.log(str1.length);     // => 5
console.log(str2.length);     // => 2
```

###递归（Recursion）

