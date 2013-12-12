---
layout: post
title: "*JavaScript继承机制研究"
date: 2013-12-12 10:19
comments: true
keywords: JavaScript Inheritance, JavaScript继承方式研究
categories: JavaScript
---
JavaScript有多种实现继承的方式。许多从C++、Java过渡而来的程序员希望看到基于类的继承机制，JavaScript可以用很难看的方式实现。作为比C++、Java更为高级的语言（根据Lisp大师Paul Graham的说法），JavaScript则提供了更为便捷的继承模式。二者的区别体现在程序语言设计理念的不同。

<!--more-->
###基于原型的继承
【待研究】
###基于函数的继承
函数继承：functional inheritance。参考：<a href="http://book.douban.com/subject/10742066/" class="douban_book" name="10742066" target="_blank">JavaScript高效图形编程</a>。

下面的代码很重要的一点是：legs变量是私有的。如果尝试从Cat外部“修改”不存在的公共legs属性，仅导致创建一个公有属性legs。私有的legs值被安全地保存在Pet的getDetails()方法创建的闭包内部。闭包（getDetails()）在函数（Pet()）执行结束后，保持了函数（Pet()）的局部变量。只有在构建一个对象的时候，能够生成私有和特权成员，公有成员可以随时添加。

闭包是JavaScript最强大的特性之一（有没有之一？）：内部的函数总是能够访问其外部函数的变量和参数，即便是在外部函数已经返回之后。
``` javascript
// Pet成为一个构造函数
// 由于闭包，legs变量成为Pet对象的一个外部无法访问的属性（私有成员）
var Pet = function(name, legs){
    var that = {
        name: name,
        getDetails: function(){
        	// Due to JavaScript's scoping rules, the legs variable
        	// will be available in here (a closure) despite being
        	// inaccessible from outside the Pet object.
            return that.name + ' has '+legs+ ' legs.';
        }
    };
    
    return that;
}

// Cat继承自Pet
var Cat = function(name){
    var that = Pet(name,4);
    that.action = function(){
        return 'Catch a bird';
    };
    
    return that;
}

// Create an instance of Cat in petCat
var petCat = Cat('Felix');

console.log(petCat.getDetails());          // => Felix has 4 legs.
console.log(petCat.legs);                  // => undefined
console.log(petCat.action());              // => Catch a bird
for(var prop in petCat){
 console.log(prop);
}                                          // => name  getDetails  action

petCat.name = 'Sylvester';
petCat.legs = 7;
console.log(petCat.getDetails());          // => Sylvester has 4 legs.
console.log(petCat.legs);                  // => 7

for(var prop in petCat){
 console.log(prop);                        // => name  getDetails  action  legs
}

```

###基于对象的继承