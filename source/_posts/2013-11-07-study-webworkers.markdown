---
layout: post
title: "学习HTML5 Web Worker"
date: 2013-11-07 00:36
comments: true
keywords: Web Worker, HTML5
categories: 
---
以下摘自《JavaScript权威指南·第6版》

客户端JavaScript的一个基本特性就是单线程，现在是，恐怕将来几十年也仍然是。之所以设计成单线程，是基于这样的理论：客户端的JavaScript必须不能运行太长时间，否则会导致循环事件，Web浏览器无法对用户输入做出相应。

Web Workers起初是作为HTML5标准的一部分，但是后来独立成一份相近的标准。

Wikipedia上面也有很不错的入门级概念解释。 [Wikipedia: Web worker](http://en.wikipedia.org/wiki/Web_worker)

Web Workers处在一个自包含的执行环境中，无法访问Window对象和Document对象，与主线程之间的通信业只能通过异步消息传递机制来实现。因此，并行地修改DOM是不可能的——不过，Web Workers的设计初衷也并不是去修改DOM，而是提供一种可以长时间运行JavaScript代码却不导致循环事件、也不导致浏览器崩溃的解决方案。

Web Workers本身也不是轻量级的线程，因此创建一些新的Worker去处理次要操作是不划算的。
<!-- more -->

<script type="text/javascript">
	function smear(img){
		var canvas = document.createElement("canvas"),
			width = img.width,
			height = img.height;

		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');			
		context.drawImage(img, 0, 0);
		var pixels = context.getImageData(0,0,width, height);

		// 将像素信息传递给Worker线程
		var worker = new Worker('/javascripts/example/webworker_smear.js');
		worker.postMessage(pixels);

		worker.onmessage = function(e){
			var smeared_pixels = e.data;
			context.putImageData(smeared_pixels, 0, 0);
			img.src = canvas.toDataURL();
			worker.terminate();
			canvas.width = canvas.height =0;
		}
	}
</script>

###例1 多线程图片处理技术
本例来自《JavaScript权威指南·第6版》$22.4节。

`'/javascripts/example/webworker_smear.js'`中的代码如下。

	// 从主线程中获得ImageData对象，对其进行处理并将它传递回去
	onmessage = function(e){ postMessage(smear(e.data)); };

	// 将ImageData对象中的像素信息向右涂抹，产生动态模糊效果
	function smear(pixels){
		var data = pixels.data,
			width = pixels.width,
			height = pixels.height,
			n = 10, 
			m = n-1;		
		for(var row=0, i; row<height; row++){
			i = row*width*4 + 4;
			for(var col=1; col<width; col++, i+=4){
				data[i]  = (data[i] + data[i-4]*m)/n;
				data[i+1]  = (data[i+1] + data[i-3]*m)/n;
				data[i+2]  = (data[i+2] + data[i-2]*m)/n;
				data[i+3]  = (data[i+3] + data[i-1]*m)/n;
			}
		}		
		return pixels;
	}

在本博文里的脚本则如下：

	function smear(img){
		var canvas = document.createElement("canvas"),
			width = img.width,
			height = img.height;

		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');			
		context.drawImage(img, 0, 0);
		var pixels = context.getImageData(0,0,width, height);

		// 将像素信息传递给Worker线程
		var worker = new Worker('/javascripts/example/webworker_smear.js');
		worker.postMessage(pixels);

		worker.onmessage = function(e){
			var smeared_pixels = e.data;
			context.putImageData(smeared_pixels, 0, 0);
			img.src = canvas.toDataURL();
			worker.terminate();
			canvas.width = canvas.height =0;
		}
	}

<img src="/images/blog/football.jpg" onclick="smear(this)" title="单击以运行worker线程" />


