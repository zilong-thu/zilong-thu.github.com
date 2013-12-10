---
layout: post
title: "《C++ Primer》笔记"
date: 2013-12-10 19:37
comments: true
keywords: c++ primer 4th edition, c++ primer中文版第四版, 学习笔记
categories: CPP
---
三年前就买了<a href="http://book.douban.com/subject/1767741/" class="douban_book" name="1767741" target="_blank">《C++ Primer·中文版·第四版》</a>，但只是把它当做偶尔翻翻的工具书，一直没认真读。接下来的几个月得做硕士论文的课题，又不想继续像以前那样对C++浑浑噩噩地使用，所以，计划用30天的时间，读一遍这本书。

目标：粗读，复习标准库类型、类、容器，学习泛型编程，尽可能细读高级主题。

<!--more-->
##Chapter 2. 变量和基本类型
C++是一门静态类型语言，在编译时会做类型检查。

###一些基本概念。
<dl>
<dt>左值</dt>
<dd>左值可以出现在赋值语句的左边或右边。例如变量（variable）。</dd>
<dt>右值</dt>
<dd>右值只能出现在赋值语句的右边，不能出现在赋值语句的左边。例如字面量常值（literal constant）。</dd>
<dt>对象</dt>
<dd>一般而言，对象（object）就是内存中具有类型的区域。具体一些，计算左值表达式就会产生对象。</dd>
<dt>定义</dt>
<dd>为了让多个文件访问相同的变量，C++区分了声明和定义。变量的定义（definition）用于为变量分配存储空间，还可以为变量指定初始值。在一个程序中，变量有且仅有一个定义。在C++中，变量必须且仅能定义一次，而且在使用变量之前必须定义或声明变量。</dd>
<dt>声明（declaration）</dt>
<dd>声明用于向程序表明变量的类型和名字。定义也是声明：当定义变量时我们声明了它的类型和名字。程序中变量可以声明多次，但只能定义一次。如果声明有初始化式，那么它可以被当做是定意思，即使声明标记为extern。</dd>
</dl>

###关于作用域
C++的作用域研究的是“名字”，而非“变量”。作用域：用来区分名字的不同意义的上下文称为作用域（scope）。

<dl>
<dt>全局作用域</dt>
<dd>global scope，定义在所有函数之外的名字，具有全局作用域。</dd>
<dt>局部作用域</dt>
<dd>local scope。出现在for(){}循环的条件语句中。</dd>
<dt>语句作用域</dt>
<dd>statement scope</dd>
<dt>类作用域</dt>
<dd>class scope</dd>
<dt>命名空间作用域</dt>
<dd>namespace scope</dd>
</dl>

###const限定符
`const`限定符把一个对象`o`转换成一个常量，但这个对象依然是一个左值。

const对象默认为文件的局部变量。要使const变量能够在其他的文件中访问，必须显式地指定它为`extern`（非const变量默认为extern）。

###引用
<strong>引用（reference）就是对象的另一个名字。</strong>

在实际程序中，引用主要用作函数的形式参数。引用是一种复合类型（compound type），通过在变量名前添加`&`符号来定义。JavaScript是词法作用域，非常简单。C++……好复杂啊。我得弄个abc的例子提醒一下自己了：
``` cpp
#include <iostream>
using namespace std;

void func(int &a, int b);

int main(){
	int a=0, b=1, c=3;
	for (int d=0; d<3; d++){
		a += d;
	}

	cout<< "a = " <<a<<endl;    // => a = 3
	func(a,b);
	cout<< "a = " <<a<<endl;    // => a = 4
	return 0;
}

void func(int &a, int b){
	a = a+b;
}
```