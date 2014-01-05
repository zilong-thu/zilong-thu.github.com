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

<strong>我的感觉是：通过构造器函数实现继承的方式，是提供给那些无法接受原型继承思想的程序员来用的。</strong>JavaScript风格的“构造函数”应该是闭包（Closure）形式的、不使用new关键字。

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
####汉诺塔

``` javascript 汉诺塔问题的寻常解
var hanoi = function(disc, src, aux, dst){
	if(disc > 0){
		hanoi(disc-1, src, dst, aux);
		console.log('Move disc '+ disc + ' from '+ src + ' to '+ dst);
		hanoi(disc-1, aux, src, dst);
	}
};

hanoi(3, 'Src', 'Aux', 'Dst');
```

####DOM遍历
递归函数可以非常高效地操作树形结构，比如浏览器端的文档对象模型（DOM）。每次递归调用时处理指定的树的一小段。下面的代码实际上解释了jQuery库中属性选择器的工作原理。

``` javascript DOM遍历代码示例
var walk_the_DOM = function walk(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node, func);
		node = node.nextSibling;
	}
};

function getElementsByAttribute(att, value){
	var results = [];

	walk_the_DOM(document.body, function(node){
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && (actual === value || typeof value !== 'string')){
			results.push(node);
		}
	});

	return results;
}

$(document).ready(function(){
	$('#test_DOM_walker').click(function(){
		var text_success = document.createTextNode('---- ^_^ 嗯，找到这个id为test_myAttribute的元素节点了 ~~~~ ');
		var text_failed  = document.createTextNode('---- 不妙，没有找到这个节点诶 ………… ');
		var p = getElementsByAttribute('id', 'test_myAttribute')[0];
		if(p){
			p.appendChild(text_success);
		}else{
			p.appendChild(text_failed);
		}
		
	});
});
```
<button id="test_DOM_walker" type="button" class="btn btn-primary" style="font:0.9em sans-serif;padding:0.5em 1.5em;">运行测试代码</button>
<p id="test_myAttribute" class="output" myAttribute="x">some test paragraph.寻找本页面DOM中id属性为test_myAttribute的元素节点，如果成功找到了，就在本段落后面附上一段成功提示。否则，提示失败。</p>

####尾递归优化

``` javascript 什么是尾递归？
// 这是一个尾递归
var factorial = function factorial(n, a){
	a = a || 1;
	if(n<2){
		return a;
	}
	return factorial(n-1, a*n);
};

// 返回的是n*fact(n-1)，而不是递归函数自身调用的结果
// 因此这个不是尾递归
function fact(n){
	if(n>1){
		return n*fact(n-1);
	}else if(n<0 ){
		return 0;
	} else{
		return 1;
	}
};
```
尾递归优化：如果一个函数返回自身递归调用的结果，那么这个调用的过程总是可以被替换为一个循环，从而可以显著提高速度，这就是尾递归优化。

不过貌似到目前为止，依旧没有任何JavaScript解释器提供尾递归优化。深度递归的函数可能会因为堆栈溢出而运行失败。

###闭包（Closure）
函数作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量（除了`this`和`arguments`）。

闭包的特征之一就是：

> 内部函数拥有比它的外部函数更长的生命周期。

<p id="test_fade" class="output">点击下面按钮，本段落背景色先变黄，然后渐变为白色。</p>
<button id="button_test_fade" type="button" class="btn btn-primary" style="font:0.9em sans-serif;padding:0.5em 1.5em;">运行背景色渐变代码</button>

###模块（Module）
> 模块的一般形式是：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的特权函数；最后返回这个特权函数，或者把它保存到一个可访问的地方。
>
> 使用模块模式就可以摒弃全局变量的使用。它促进了信息隐藏和其他优秀的设计实践。对于应用程序的封装，或者构造其他单例对象，模块模式非常有用。

###柯里化（curry）
###记忆（Memoization）
记忆是一种优化方法：函数将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。

``` javascript 未经优化的Fibonacci数列计算
var fibonacci = function(){
	// 记录fibonacci 函数的调用次数
	var invocation_count = 0;

	var fib = function(n){
		++invocation_count;

		return n<2 ? n: fib(n-1) + fib(n-2);
	};

	for(var i=0; i<=10; ++i){
		console.log(fib(i));
	}

	console.log(invocation_count);    // => 453
}();
```

使用闭包存储一个结果数组，每次调用fib函数时，先检查当前n值是否已经存在于数组中，如果已经存在，就立即返回这个结果。

``` javascript 使用记忆方法对Fibonacci递归算法进行优化
var fibonacci = function(){
	var invocation_count = 0;
	var memo = [0, 1];
	var fib = function(n){
		var res = memo[n];
		if(typeof res !== 'number'){
			res = fib(n-1) + fib(n-2);
			memo[n] = res;
		}
		invocation_count++;
		return res;
	};

	for(var i=0; i<=10; ++i){
		console.log(fib(i));
	}

	console.log(invocation_count);    // => 29
}();
```

##第5章 继承
###伪类
这一节的主要目的是，让大家不要使用伪类方式去实现继承。

###



<script type="text/javascript">
//========= walk DOM 例子 =============
var walk_the_DOM = function walk(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node, func);
		node = node.nextSibling;
	}
};

function getElementsByAttribute(att, value){
	var results = [];

	walk_the_DOM(document.body, function(node){
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && (actual === value || typeof value !== 'string')){
			results.push(node);
		}
	});

	return results;
}

//===========  闭包，渐变背景色例子  ============
var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.background = '#FFFF' + hex + hex;
		if(level < 15){
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

// ========== 注册事件处理函数 ===========
$(document).ready(function(){
	$('#test_DOM_walker').click(function(){
		var text_success = document.createTextNode('---- ^_^ 嗯，找到这个id为test_myAttribute的元素节点了 ~~~~ ');
		var text_failed  = document.createTextNode('---- 不妙，没有找到这个节点诶 ………… ');
		var p = getElementsByAttribute('id', 'test_myAttribute')[0];
		if(p){
			p.appendChild(text_success);
		}else{
			p.appendChild(text_failed);
		}
		
	});

	$('#button_test_fade').click(function(){
		var p = document.getElementById('test_fade');
		fade(p);
	});
});
</script>