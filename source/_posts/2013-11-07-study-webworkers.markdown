---
layout: post
title: "学习HTML5 Web Worker"
date: 2013-11-07 00:36
comments: true
keywords: Web Worker, HTML5
categories: HTML5
---
###关于Web Workers
以下例子根据<a href="http://book.douban.com/subject/10549733/" class="douban_book" name="10549733" target="_blank">《JavaScript权威指南·第六版》</a>进行改写。

客户端JavaScript的一个基本特性就是单线程，现在是，恐怕将来几十年也仍然是。之所以设计成单线程，是基于这样的理论：客户端的JavaScript必须不能运行太长时间，否则会导致循环事件，Web浏览器无法对用户输入做出相应。

Web Workers起初是作为HTML5标准的一部分，但是后来独立成一份相近的标准。

Wikipedia上面也有很不错的入门级概念解释。 [Wikipedia: Web worker](http://en.wikipedia.org/wiki/Web_worker)

Web Workers处在一个自包含的执行环境中，无法访问Window对象和Document对象，与主线程之间的通信业只能通过异步消息传递机制来实现。因此，并行地修改DOM是不可能的——不过，Web Workers的设计初衷也并不是去修改DOM，而是提供一种可以长时间运行JavaScript代码却不导致循环事件、也不导致浏览器崩溃的解决方案。

Web Workers本身也不是轻量级的线程，因此创建一些新的Worker去处理次要操作是不划算的。
<!-- more -->
<script type="text/javascript">
(function(){
	var url = '{{root_url}}/stylesheets/widgets.css';
	var link =  document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	document.head.appendChild(link);
})();
</script>

###例1 图像处理
本例来自《JavaScript权威指南·第6版》$22.4节。

用到的Canvas API getImageData()，该方法在<a href="http://book.douban.com/subject/10546125/" class="douban_book" name="10546125" target="_blank">《JavaScript高级程序设计（第3版）》</a>的15章15.2.10节（460页）介绍地很详细。该书给出的是灰阶过滤器的例子，见例2。

getImageData()方法返回一个ImageData对象，该对象的每个实例都有三个属性：width、height和data。其中data属性是一个数组，保存着图像中每一个像素的数据。在data数组中，每一个像素用四个元素来保存，分别表示红、绿、蓝和透明度值。因此，第一个像素的数据就保存在数组的第0到第三个元素中，第二个像素的数据在第4到第7个元素中，往后以此类推。数组中每个元素的值都介于0和255之间（包括0和255）。

<button id="run_left" class="run-button">向左模糊</button> <button id="run_right" class="run-button">向右模糊</button>

<img id="img_for_smear" src="/images/blog/football.jpg"/>

####worker线程处理图像数据的JS代码
``` javascript worker线程中的代码， 
// 从主线程中获得ImageData对象，对其进行处理并将它传递回去
onmessage = function(e){ postMessage(smear(e.data)); };

// 将ImageData对象中的像素信息向左或者右涂抹，产生动态模糊效果
function smear(obj){
	var pixels = obj.pixels;
	var data = pixels.data,
		width = pixels.width,
		height = pixels.height,
		direct = obj.direct;
		n = 10, 
		m = n-1;
	
	if (direct=='r') {
		for(var row=0, i;row<height;row++){
			i = row*width*4 + 4;
			for(var col=1; col<width; col++, i+=4){
				data[i]  = (data[i] + data[i-4]*m)/n;
				data[i+1]  = (data[i+1] + data[i-3]*m)/n;
				data[i+2]  = (data[i+2] + data[i-2]*m)/n;
				data[i+3]  = (data[i+3] + data[i-1]*m)/n;
			}
		}
	} else{
		for(var row=0, i;row<height;row++){
			i = row*width*4 + 4;
			for(var col=1; col<width; col++, i+=4){
				data[i-4]  = (data[i-4] + data[i]*m)/n;
				data[i-3]  = (data[i-3] + data[i+1]*m)/n;
				data[i-2]  = (data[i-2] + data[i+2]*m)/n;
				data[i-1]  = (data[i-1] + data[i+3]*m)/n;
			}
		}
	}
	
	return pixels;
}
```
``` javascript 在本博文里的脚本, master线程
$(document).ready(function(){
	var img = document.getElementById('img_for_smear');

	$('#run_left').click(function(){
		smear(img,'l');
	});

	$('#run_right').click(function(){
		smear(img,'r');
	});
});

// 抹除函数
function smear(img, direct){
	var canvas = document.createElement("canvas"),
		width = img.width,
		height = img.height;

	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');			
	context.drawImage(img, 0, 0);
	var pixels = context.getImageData(0,0,width, height);

	var worker = new Worker('/javascripts/mylibs/webworker_smear.js');
	worker.postMessage({pixels:pixels, direct: direct});

	worker.onmessage = function(e){
		var smeared_pixels = e.data;
		context.putImageData(smeared_pixels, 0, 0);
		img.src = canvas.toDataURL();
		worker.terminate();
		canvas.width = canvas.height =0;
	}
}
```

###例2 灰阶过滤器

<img id="img_for_gray" src="/images/blog/football.jpg"/>

<button id="run_gray" class="run-button">变为黑白风格</button>

###例3 大规模计算

如：<a href="http://www.atopon.org/mandel/#" target="_blank">Mandelbrot集合</a>


<script type="text/javascript">
$(document).ready(function(){
	var img = document.getElementById('img_for_smear');

	var img2 = document.getElementById('img_for_gray');

	$('#run_left').click(function(){
		smear(img,'left');
	});

	$('#run_right').click(function(){
		smear(img,'right');
	});

	$('#run_gray').click(function(){
		smear(img2, 'gray');
	});
});

// 抹除函数
function smear(img, direct){
	var canvas = document.createElement("canvas"),
		width = img.width,
		height = img.height;

	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');			
	context.drawImage(img, 0, 0);
	var pixels = context.getImageData(0,0,width, height);

	var worker = new Worker('/javascripts/mylibs/webworker_smear.js');
	worker.postMessage({pixels:pixels, direct: direct});

	worker.onmessage = function(e){
		var smeared_pixels = e.data;
		context.putImageData(smeared_pixels, 0, 0);
		img.src = canvas.toDataURL();
		worker.terminate();
		canvas.width = canvas.height =0;
	}
}
</script>