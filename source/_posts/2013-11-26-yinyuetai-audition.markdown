---
layout: post
title: "音悦台面试笔记"
date: 2013-11-26 17:53
comments: true
keywords: audition, 面试题目,音悦台,web前端
categories: Web-FE
---
在58同城上投了几份简历，很有幸被叫去参加面试了，虽然最后仍然是悲剧，但面试经历又增加了，找工作就像谈恋爱，爱要越挫越勇~~

下面回忆几个自己不会的不确定的题目。
<!-- more -->
###又是关于JavaScript的词法作用域
问下面的代码会输出什么结果：
``` javascript
var tt = 'a';
function test(){
    console.log(tt);
    var  tt = 'b';
    console.log(tt);
}

test();

(function test_again(){
   var tt = 'c';
   test();
})();
```
毫无压力，两次运行test()的结果是一样的。

###如何反转字符串
当时答了上来，但是对于具体所用的方法名没有说对。

准确答案应该是这样：
``` javascript
var str = 'abcdefg';
var array = str.split('');
str = array.reverse().join('');
console.log(str);  // => 'gfedcba'
```
###如何实现数组元素去重
之前确实没有关注过JS算法方面的问题，当时就完全没有回答上来，甚至连暴力算法也没敢提。然后回来Google，找到两篇好的参考文章：

<a href="http://www.ituring.com.cn/article/49791" target="_blank">图灵社区-WEB前端-JavaScript数组去重</a>

<a href="http://www.nowamagic.net/javascript/js_RemoveRepeatElement.php" target="_blank">JavaScript数组去重的几种方法</a>

常规方法是这样的：
``` javascript
// 字符串是26个小写英文字母的无序、重复集合
var str = 'asdfkjasqwertyuioppoiubnmzxcvbnmasdfghjklldjfjksdaifafnvdioasdfoiasnngsjdaiofjjioadfnaskdfkjsfoiasjfjiof';
var a = str.split('');
function ov2(a) {
	    var a1=((new Date).getTime());
	    var b = [], n = a.length, i, j;
	    for (i = 0; i < n; i++) {
	        for (j = i + 1; j < n; j++){
	            if (a[i] === a[j]){
	            	j=false;break;
	            }
	        }
	        if(j){
	        	b.push(a[i]);
	        }
	    }
	    console.info((new Date).getTime()-a1);
	    console.log(b.length);
	    return b.sort(function(a,b){return a-b});
	}
ov2(a);
```

与这段代码等价：
``` javascript
function ov3(a) {
    // var a1=((new Date).getTime());
    var b = [], n = a.length, i, j;
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++){
	        if (a[i] === a[j]){
	        	j=++i;
	        }
	    	b.push(a[i]);
	    }
    }
    // console.info((new Date).getTime()-a1);  
    return b.sort(function(a,b){return a-b});
}
```
当然还有什么字典方法，利用对象属性唯一的特点，遍历对象属性，即可做到数组去重。

【补充】已经整理到一篇文章中：<a href="{{root_url}}/blog/2013/12/09/javascript-array-unique/">JavaScript数组去重方法汇总</a>。（2013-12-09）

###关于JavaScript函数上下文
问：JavaScript如何使对象element成为func函数内的上下文（即this的值）？

答案：来自<a href="http://book.douban.com/subject/10549733/" class="douban_book" target="_blank" name="10549733">《JavaScript权威指南（第六版）》</a>。

> JavaScript中的函数也是对象，和其他JavaScript对象没什么两样，函数对象也可以包含方法。其中两个方法call()和apply()可以用来间接地调用所需的this值，也就是说，任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。
> 
> call()和apply()的第一个实参是要调用的函数的母对象，它是调用上下文，在函数体内通过this来获得对它的引用。要想以对象o的方法来调用函数f()，可以这样使用call()和apply()：

``` javascript
f.call(o);
f.apply(o);
```

每行代码和下面的代码功能类似（假设对象o中原先不存在名为m的属性）。

``` javascript
o.m = f;          // => 将f存储为o的临时方法
o.m();            // => 调用它，不传入参数
delete o.m;       // => 将临时方法删除
```

###*JavaScript如何实现继承
需要做框架的人才会去使用继承，所以我不会。

【待复习】

###*常见的网页布局有哪几种
纳尼，流式、浮动式、定位式，还有啥？

【待学习】

###如何使用jQuery制作焦点图
当时太紧张，就没答上来。出了人家门口才想起来：擦，我甚至用原生JS做出过类似效果啊。无非是使用jQuery的fadeIn()、fadeOut()外加用setInterval()或者setTimeout()自定义一个操作图片left值的函数罢了（图片的定位是position:relative，刚开始设得稍大，动画结束时将left设为0即可）。

###会PS切图吗？
不会。

【待学习】

最后，面试官建议学学PS切图，根据切图做网页，然后接点私活儿……嗯，我投百度失败，笔试小米搜狗失败，面试小公司又失败了，现在沦落到只能考虑接私活儿了……好吧，还有6个月的时间呢。就让我继续在学渣的路上挣扎吧。