---
layout: post
title: "JavaScript数组去重方法汇总"
date: 2013-12-09 09:47
comments: true
keywords: JavaScript数组去重, 词典法去重, 排序算法去重
categories: JavaScript
---
摘要：本文主要内容包括：生成纯数值数组方法、生成数值与字符串混合的随机数组的方法，基于遍历、基于排序、基于词典的数组去重方法，这些去重方法、排序算法的复杂度分析、在浏览器中的性能测试分析。
<!-- more -->

##1. 生成测试用的数组
测试使用的数组有两类：纯数值类型的数组，混合了数字与字符串的数组。

###1.1 纯数值数组生成方法：
```javascript
// 生成一个m、n之间的整数 
function random(m,n){ 
	var i=Math.random(); 
	return Math.round((n-m)*i+m); 
}

// l：生成的数组的长度 
function getRandomArr(m,n,l){ 
	var resultArr=[]; 
	for(var i=0;i<l;i++){ 
		resultArr.push(random(m,n));
	} 
	return resultArr; 
} 
```

###1.2 生成含有随机长度字符串的混合数组
参考<sup>[3]</sup>。生成随机字符串的思路很简单：先准备一个数组，含有 0~9、A~Z、a~z 这些字符；随机生成一个数字，根据用户设定的最大字符串长度，确定当前字符串的长度；根据这个长度进行循环，每次循环都随机生成一个数字，将其映射到该数组的下标，读取该下标的值，即为字符串当前位置处的一个字符。

``` javascript
// length: 字符串的长度，如果未定义，则随机生成
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    var chars_length = chars.length;
    
    if (! length) {
        length = Math.floor(Math.random() * chars_length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars_length)];
    }
    return str;
}
```
注：貌似针对混合数组进行去重的应用例子不多，所以下面也不具体研究了。

##2. 去重方法
###2.1 使用indexOf()进行数组遍历
思路：
<ol>
<li>构建一个新的数组存放结果</li>
<li>for循环中每次从原数组中取出一个元素，用indexOf查找新数组中是否有该元素</li>
<li>若没有，则存到结果数组中</li>
</ol>

``` javascript
function delrep1() {
    var res = [];

    this.forEach(function(v) {
        if (res.indexOf(v) == -1) 
            res.push(v);
    })  
    return res;
}
```
复杂度分析：

按最坏的情况，数组里没有任何重复元素，则需要进行 n 次indexOf()运算，但indexOf()本身的复杂度为 i，所以总体数组下标查询次数为 1+2+3+...+ (n-1)=(n-1)n/2，于是复杂度为O(n2)。可见这并不是一个高效的算法。

###2.2 先排序再遍历
思路：
<ol>
<li>先将原数组进行排序</li>
<li>检查原数组中的第i个元素 与 结果数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置</li>
<li>如果不相同，则将该元素存入结果数组中</li>
</ol>
####2.2.1 sort()方法
javascript内置了sort()方法，用于对数组进行排序。但其具体使用何种排序算法，取决于javascript引擎。
``` javascript 某种使用sort()的排序去重算法
function delrep2(){
    this.sort(function(a,b){return a-b});    //先排序
    var res = [this[0]];
    for(var i = 1; i < this.length; i++){
        if(this[i] !== res[res.length - 1]){
            res.push(this[i]);
        }
    }
    return res;
}
var arr = [1,0,10, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0, 3,'b', 'd',  11, 12, 20];

/* 使用sort()对arr排序，在不同浏览器下得到不同结果：
 * Firefox =>  [0, 1, 3, "e", "e", "d", "b", "a", "a", 0, 1, 10, 11, 12, 20, "d", "b"]
 * Chrome  =>  [0, 0, 1, 1, 3, 10, 11, 12, 20, "a", "a", "b", "b", "d", "d", "e", "e"]
 */
console.log(arr.sort(function(a,b){return a-b}));

/* 去重的结果也不同：
 * Firefox =>  ["b", "d", 0, 1, 10, 11, 12, 20, "a", "b", "d", "e", 0, 1, 3]
 * Chrome  =>  [0, "e", 1, 3, 10, 11, 12, 0, "a", "b", "d", "e", 20]
 */
console.log(delrep2.call(arr));
```
####2.2.2 内置sort()方法纯数值数组排序速度测试
部分内容参考这篇文章：[4]。以该作者当时的机器与浏览器水平，对1~999999之间的长度为30000的随机数组的排序，火狐2.0居然要300多毫秒，现在火狐25.0.1在我台式机i5 CPU上，只需要3毫秒就完成同样规模的数组排序（外加去重，当然，去重的复杂度只有n，影响不大）。

结论：

先排序再去重能够提高复杂度，就是因为在遍历原数组以决定是否要把原数组中的某个元素放入新数组时，不必再遍历已生成的新数组，而是只需要判断该元素是否等于新数组的最后一个元素即可。

对于纯数值类型的数组，可以考虑使用sort()方法减少代码量，此时要注意一定要自己指定传递给sort()方法的参考函数。但是对于数字与字符串混合的数组，不宜使用sort()方法，因为不同浏览器使用了不同的算法，会得到不同的排序结果（例如Chrome可以得到正确的排序结果，而火狐就不行）。此时应该使用自己定义的排序算法。

###2.3 基于基数排序的词典法
如果认为一个混合数组中，元素1和元素"1"不相同，即要求区数组元素的类型，那么应该使用`typeof()`运算符将类型记忆下来。

``` javascript 不考虑类型的词典法
function delrep3() {
    var obj = {},
        res = [] ;

    this.forEach(function(v){
        if (!obj[v]) {
            obj[v] = true;
            res.push(v);
        }
    });
    return res ;
}
```
``` javascript 区分类型的词典法
function delrep4() {
    var obj = {},
        res = [] ;

    this.forEach(function(v){
        if (!obj[typeof(v) + v]) {
            obj[typeof(v) + v] = true;
            res.push(v);
        }
    });
    return res ;
}
```
##3. 性能测试
###3.1 测试代码
``` javascript 测试模块代码
function readClock(func,arr){
    var start = +new Date();
    var res = func.call(arr);
    console.log(+new Date() - start);
    console.log(res.slice(0,10));  // 只输出前10个元素
}

var arr = getRandomArr(0,9999,30000);
readClock(delrep1,arr);
readClock(delrep2,arr);
readClock(delrep3,arr);
readClock(delrep4,arr);
```
###3.2 测试结果：

（1）var arr = getRandomArr(0,9999,30000);

单位：毫秒

Chrome：  delrep1 222，delrep2 18, delrep3 4, delrep4 21

Firefox： delrep1 6037，delrep2 8, delrep3 24, delrep4 47


（2）var arr = getRandomArr(0,9999,500000);不运行readClock(delrep1,arr);

单位：毫秒

Chrome：  delrep2 174, delrep3 41, delrep4 155

Firefox： delrep2 110，delrep3 379, delrep4 555

###3.3 初步结论
对于相同的、不使用JS内置算法（如sort()）的情况下，谷歌浏览器的JS解释引擎比火狐快一个量级。

火狐浏览器对sort()方法的实现，很可能使用了快速排序算法，才使得其如此之快。但从前面的混合数组例子来看，V8的sort()算法考虑更周全。

Chrome的词典法去重，速度非常快。所以如果是运行于服务器端，使用Node.js，那么可以考虑优先采用词典法去重。

##参考文章：

[1] <a href="http://www.ituring.com.cn/article/49791" target="_blank">图灵社区-WEB前端-JavaScript数组去重</a>

[2] <a href="http://www.nowamagic.net/javascript/js_RemoveRepeatElement.php" target="_blank">JavaScript数组去重的几种方法</a>

[3] <a href="http://liunian.info/generate-random-string-in-javascript.html" target="_blank">使用 JavaScript 生成随机字符串</a>

[4] <a href="http://www.jb51.net/article/6136.htm" target="_blank">数据排序谁最快(javascript中的Array.prototype.sort PK 快速排序)</a>