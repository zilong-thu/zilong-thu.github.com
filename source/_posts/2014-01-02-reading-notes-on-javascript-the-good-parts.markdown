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

``` javascript
if(typeof Object.beget !== 'function'){
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

var another_person = Object.create(person);

another_person.sayName();                // => My name is Zilong Wang.
another_person['first-name'] = 'San';
another_person['last-name'] = 'Zhang';

another_person.sayName();                // => My name is San Zhang.
person.sayName();                        // => My name is Zilong Wang.
```