---
layout: post
title: "通过递减循环变量提高JavaScript循环性能"
date: 2014-01-16 20:48
comments: true
keywords: JavaScript循环优化, javascript loop optimization
categories: JavaScript
---
<a href="http://book.douban.com/subject/4719162/" class="douban_book" target="_blank" name="4719162">《高性能网站建设进阶指南》</a>第95页提到：

> 另外一种提高性能的简单有效的方式是将循环变量递减到0，而不是递增到总长度。根据每个循环的复杂性不同，这个简单的改变可以比原来节约多达50%的执行时间。

我在这几种环境下进行了简单的测试：Node.js，Chrome，Firefox，IE。在浏览器环境下，循环变量从0增长与递减到0相比会有性能损耗；但在Node中则截然相反。

<!--more-->

``` javascript 测试代码
var sum = 0;
var LENGTH = 1000000;
var arr = new Array(LENGTH);

for(var i=0; i<LENGTH; ++i){
	arr[i] = Math.random();
}
console.time('sum-loop-1');
sum = 0;
for(var i=0; i<LENGTH; ++i){
	sum+= arr[i];
}
console.timeEnd('sum-loop-1');

console.time('sum-loop-2');
sum = 0;
for(var i=LENGTH; --i;){
	sum+= arr[i];
}
console.timeEnd('sum-loop-2');
```

<table class="mytable">
<th>运行环境</th><th>Node.js</th><th>Firefox 26</th><th>Chrome 31</th><th>IE 10</th>
<tr><td>(a)循环变量递增</td><td>14 ms</td><td>756 ms</td><td>2250 ms</td><td>3380 ms</td></tr>
<tr><td>(b)循环变量递减到0</td><td>15 ms</td><td>637 ms</td><td>1610 ms</td><td>2596 ms</td></tr>
<tr><td>减少时间</td><td>基本不变</td><td>24%</td><td>(25~28)%</td><td>23%</td></tr>
</table>

将数组长度增大一个量级，var LENGTH = 50000000; 结果会有较大区别：sum-loop-1只耗时105ms，而sum-loop-2将耗时123ms。从此也看出，前端JS的性能优化，与Node中的JS性能优化还不完全是一回事。

PS：在IE10中需要改为这个代码才能运行：

``` javascript IE10控制台脚本
var sum = 0;
var LENGTH = 1000000;
var start, end;
var arr = new Array(LENGTH);

for(var i=0; i<LENGTH; ++i){
	arr[i] = Math.random();
}

start = +new Date();
sum = 0;
for(var i=0; i<LENGTH; ++i){
	sum+= arr[i];
}
end = +new Date();
console.log(end-start);

start = +new Date();
sum = 0;
for(var i=LENGTH; --i;){
	sum+= arr[i];
}
end = +new Date();
console.log(end-start);
```

进一步的优化是展开循环：

``` javascript 展开循环
console.time('sum-loop-3');
var sum = 0;
var iterations = Math.floor(LENGTH/8);
var leftover = LENGTH % 8;
var i=0;
if(leftover>0){
    do{
        sum+= arr[++i];
    }while(--leftover>0);
}
do{
   sum+= arr[++i];
   sum+= arr[++i]; 
   sum+= arr[++i]; 
   sum+= arr[++i]; 
   sum+= arr[++i]; 
   sum+= arr[++i]; 
   sum+= arr[++i]; 
   sum+= arr[++i]; 
}while(--iterations > 0);
console.timeEnd('sum-loop-3');
```
Firefox26下，前两个循环的结果分别为771ms，632ms，而展开循环后只需要577ms。这种优化在Node.js环境中也是比未展开的循环要快：同样的var LENGTH = 50000000; 算例，未展开时112ms、143ms展开循环后就只需96ms了。