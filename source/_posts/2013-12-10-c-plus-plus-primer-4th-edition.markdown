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

##Chapter 3. 标准库类型
两种最重要的标准库类型是`string`和`vector`。`string`类型支持长度可变的字符串，`vector`可用于保存一组指定类型的对象。

###string类
字符串的下标操作的返回值是个左值。
``` cpp
string str("Ha");
str[1] = 'f';             // => str变成"Hf"
```

C++的一个不足是，字符串字面值之间无法连接：

``` cpp
// VS2010下会这样报错
// error C2110: “+”: 不能添加两个指针
string s3 = "i am a string." + "ss";
```
总的来说（以我目前掌握的知识水平来判断），与JavaScript相比，string不够强大，但相比于C确实是很不错了。希望以后C++标准库能够更强吧。

###vector类模板
vector是同一类型的对象的集合，每个对象都有一个对应的整数索引值。

vector是一个类模板（class template）。vector不是一种数据类型。

vector对象（以及其他标准库容器对象）的重要属性就在于可以在运行时高效地添加元素。

vector中的对象是没有命名的，只能通过下标进行访问。与string类型的下标操作符一样，vector下标操作的返回值也是一个左值，因此可以进行写入（通过复制操作）。

作者说：“像size()这样的小库函数几乎都定义为内联函数，所以每次循环过程中调用它的运行时代价是比较小的。”我对此比较疑惑，因为在JavaScript中，这种类似size()的运算与读取变量值相比，都是要消耗更多性能的。不过后来大牛说C++中这样做确实不太消耗性能，就释然了。只是不明白size()如何实现的。

###缓冲区溢出
vector容器的下标操作不能进行元素添加操作。

试图对不存在的元素进行下标操作是程序设计过程中经常会犯的严重错误。所谓的“缓冲区溢出”错误就是对不存在的元素进行下标操作的结果。这样的缺陷往往导致PC机和其他应用中最常见的安全问题。

> 总的来说，相对于C++内置数据类型的数组和指针而言，程序员应优先使用标准库类类型。设计良好的程序只有在强调速度时才在类实现的内部使用数组和指针。

##Chapter 4. 数组和指针
与vector类型相比，数组的显著缺陷在于：数组的长度是固定的，而且程序员无法知道一个给定数组的长度。数组没有获取其容量大小的size操作，也不提供push_back操作在其中自动添加元素。如果需要更改数组长度，程序员只能创建一个更大的数组，然后把原数组的所有元素复制到新数组空间中去。

###数组的定义和初始化
数组的维数必须用值大于1的常量表达式。此常量表达式只能包含整型字面值常量、枚举常量或者用常量表达式初始化的整型const对象。非const变量以及要到运行阶段才知道其值的const变量都不能用于定义数组的维数。

`&`符号是取地址（address-of）操作符，当次操作符用于一个对象上时，返回的是该对象的存储地址。取地址操作只能用于左值，因为只有当变量用作左值时，才能取其地址。

<strong>建议：尽量避免使用指针和数组。</strong>

C++不允许void*指针操作它指向的对象。

``` cpp string变量的可以随时动态修改的
void func(){
	string s("this is some text.");
	string *ps = &s;
	cout <<"length of string \""<< (*ps) <<"\" is "<<(*ps).size() <<endl;

	*ps = "goodbye";
	cout <<"length of string \""<< s <<"\" is "<<s.size() <<endl;
}

// 运行结果：
// length of string "this is some text." is 18
// length of string "goodbye" is 7
```
