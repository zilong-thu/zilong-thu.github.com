---
layout: post
title: "HTML5 SVG 初步学习"
date: 2013-11-12 14:28
comments: true
keywords: SVG, HTML5
categories: HTML5
---

HTML5将XML和HTML的区别进一步缩小，表现在：它允许SVG（和MathML）标记直接在HTML文件中使用，而不需要命名空间的声明或者标签前缀。

这里演示的前两个例子来自《JavaScript权威指南·第六版》page 618.代码有些许优化。第三个例子根据<a href="http://book.douban.com/subject/1246981/" target="_blank">基于XML的SVG应用指南</a>介绍的方法，利用Illustrator CS6 自带的模板生成SVG，然后导入到HTML中。

初步感觉，SVG的基本绘图方法如`path`、 `arc`、 `move to`、 `line to`等都与`HTML5 canvas`很相似。

<!-- more -->
###例1：饼状图
<div id="pieChartContainer"></div>
<script type="text/javascript" src="{{ root_url }}/javascripts/mylibs/pieChart.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var svgPieChart = pieChart([12,24,33,65], 640, 400, 200, 200, 150,
					  ['red','blue','yellow','green'],
					  ['North','South','East','West'],
					  400, 100);
	var pieChartContainer = document.getElementById('pieChartContainer');
	pieChartContainer.appendChild(svgPieChart);

	drawTicks(50,50,48,'ticks');

	// 运行矢量时钟
	 updateTime();

	// 为房子和树注册事件处理程序
	var tree_hat_01 = document.getElementById('tree_hat_01');

	tree_hat_01.onclick = function(e){
		e.preventDefault();

		if(!myVariables.isVibrating){
			myVariables.id_of_setinterval = setInterval('sinVibration()',50);
		} else{
			clearInterval(myVariables.id_of_setinterval);
		}

		myVariables.isVibrating = !myVariables.isVibrating;
	};
});
</script>

###例2：SVG模拟时钟
从这个例子则可以看出`svg`与`canvas`除了“矢量图与位图的区别”外，另一个明显区别：前者可对文档结构进行属性操作从而产生动画，而后者的动画则是基于像素的。

<div>
<svg id="svg-clock" viewBox="0 0 100 100" width="350" height="350" style="stroke: black; stroke-linecap: round; fill: #eef;">
	<defs>
		<filter id="hand-shadow" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
			<feOffset in="blur" dx="1" dy="1" result="shadow"/>
			<feMerge>
				<feMergeNode in="SourceGraphic"/><feMergeNode in="shadow"/>
			</feMerge>
		</filter>
	</defs>
	<circle id="face" cx="50" cy="50" r="48" style="stroke-width:3;"/>
	<g id="ticks"></g>
	<g id="numbers" style="font-family: sans-serif; font-size: 7pt; font-weight: bold; text-anchor: middle; stroke: none; fill: black;">
		<text x="50" y="15">12</text>
		<text x="88" y="53">3</text>
		<text x="50" y="91">6</text>
		<text x="12" y="53">9</text>
	</g>
	<g id="hands">
		<line id="hourhand" filter="url(#hand-shadow)" x1="50" y1="50" x2="50" y2="28" style="stroke-width: 5;"/>
		<line id="minutehand" filter="url(#hand-shadow)" x1="50" y1="50" x2="50" y2="24" style="stroke-width: 3;"/>
		<polygon id="secondhand" points="50,58 49,50 50,16 51,50" style="fill:red;stroke:red;"/>
	</g>
</svg>
</div>

###例3：Adobe Illustrator导出SVG
在本博文中尝试导入Illustrator输出的SVG文件到HTML中。是一朵花。

<embed src="{{ root_url}}/svg/flower.svg" type="image/svg+xml">

成功了。这是从Illustrator CS6 自带的模板里摘出来的（要不然原始模板太大）。这个SVG文件大小为49KB，却是完全矢量化的。比位图的优势大太多了。

###例4：SVG的交互设计
这应该是最有应用价值的部分了。

已知的一个很好的Web应用是<a href="https://moqups.com/" target="_blank">moqups</a>。

在这里我也做了一个小例子出来。图像是根据<a href="http://book.douban.com/subject/24303555/" target="_blank">《从新手到高手：IllustratorCS6中文版从新手到高手》</a>最开始的介绍画的。这本书也提到了图像的SVG格式：

> SVG是目前最火热的图像文件格式之一，它的英文全称为Scalable Vector Graphics，意思为可缩放的矢量图形。它是基于XML（Extensible Markup Language），由World Wide Web Consortium（W3C）联盟进行开发的。严格来说XML是一种开放标准的矢量图形语言，可设计出高分辨率的Web图形页面。用户可以直接用代码来描绘图像，可以用任何文字处理工具打开SVG图像，通过改变部分代码来使图像具有交互功能，并可以随时插入到HTML中通过浏览器来观看。
> 
> SVG文件比JPEG和GIF格式的文件要小很多，因而下载也很快。可以相信，SVG的开发将会为Web提供新的图像标准。

然后我用Illustrator CS6从零开始画了个简单例子：树和房子。大小只有5KB左右。直接写在HTML里。结果如下，鼠标单击左侧的树（绿色部分），树冠会以正弦规律摆动；再点击，则停止摆动。

<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="640px" height="480px" viewBox="0 0 640 480" style="enable-background:new 0 0 640 480;" xml:space="preserve">
<path id="tree_hat_01" style="fill:#39B54A;" d="M96.136,306.18c-6.919,5.519-25.795,20.166-42.913,4.713c-18.935-17.094,0-41.396,0-41.396 s-21.088,0.554-23.072-14.349c-2.539-19.069,18.854-24.837,18.854-24.837s-14.886-23.74,4.466-34.78 c22.325-12.735,29.771,19.318,29.771,19.318s23.816-12.142,33.244,2.769c6.459,10.216-1.489,26.484-1.489,26.484 s29.517,1.38,27.035,34.742c-1.877,25.242-21.732,27.635-28.53,25.955c-6.005-1.484-8.187-6.884-8.187-6.884 S107.383,297.209,96.136,306.18z"/>
<path style="fill:#603813;" d="M63.891,228.647c0,0,10.424,6.177,17.174,17.047c5.886,9.479,12.375,20.003,16.041,26.196 c6.762,11.424,9.338,16.74,11.937,31.518c4.466,25.387-6.946,67.592-6.946,67.592H86.715c0,0,14.389-44.965,12.9-63.727 c-0.736-9.285-10.453-33.917-18.86-53.683C74.15,238.063,63.891,228.647,63.891,228.647z"/>
<path style="fill:#603813;" d="M86.736,255.149c2.444-10.324,2.329-9.484,3.056-11.56c1.559-4.455,7.583-17.158,7.583-17.158	s-3.946,17.012-4.706,23.188c-1.518,12.336,0,14.908,0,14.908L86.736,255.149z"/>
<path style="fill:#603813;" d="M94.607,288.273"/>
<path style="fill:#603813;" d="M93.119,282.479c0,0,0.015-2.203-10.56-2.854c-6.768-0.415-17.436,1.462-17.436,1.462	c4.521-1.554,4.16-2.193,15.63-4.967c8.463-2.046,10.448,0,10.448,0L93.119,282.479z"/>
<path style="fill:#603813;" d="M107.39,295.073c0,0-1.629-1.109,7.886-9.317c5.046-4.353,15.841-11.307,15.841-11.307	s-11.914,14.461-15.181,19.043c-6.894,9.665-6.085,16.482-6.085,16.482"/>
<path id="tree_hat_02" style="fill:#39B54A;" d="M550.136,287.967c-6.918,5.518-25.795,20.165-42.912,4.712c-18.936-17.094,0-41.396,0-41.396	s-21.089,0.554-23.072-14.349c-2.538-19.069,18.854-24.837,18.854-24.837s-14.886-23.74,4.466-34.778	c22.324-12.736,29.771,19.317,29.771,19.317s23.816-12.142,33.244,2.769c6.46,10.215-1.488,26.483-1.488,26.483	s29.516,1.38,27.035,34.742c-1.879,25.242-21.732,27.636-28.529,25.956c-6.007-1.485-8.188-6.883-8.188-6.883	S561.383,278.995,550.136,287.967z"/>
<path style="fill:#603813;" d="M517.89,210.434c0,0,10.426,6.179,17.175,17.047c5.886,9.479,12.375,20.004,16.041,26.197	c6.763,11.423,9.338,16.346,11.938,31.123c4.466,25.391-6.947,67.199-6.947,67.199h-15.381c0,0,14.389-44.57,12.899-63.334	c-0.735-9.283-10.451-33.72-18.859-53.485C528.149,219.652,517.89,210.434,517.89,210.434z"/>
<path style="fill:#603813;" d="M540.736,236.938c2.444-10.325,2.331-9.485,3.056-11.563c1.561-4.454,7.584-17.157,7.584-17.157	s-3.946,17.013-4.707,23.188c-1.518,12.336,0,14.909,0,14.909L540.736,236.938z"/>
<path style="fill:#603813;" d="M548.608,270.06"/>
<path style="fill:#603813;" d="M547.12,264.265c0,0,0.014-2.203-10.56-2.853c-6.769-0.416-17.435,1.46-17.435,1.46	c4.521-1.553,4.16-2.193,15.629-4.967c8.463-2.045,10.447,0,10.447,0L547.12,264.265z"/>
<path style="fill:#603813;" d="M561.39,276.859c0,0-1.629-1.108,7.887-9.316c5.045-4.354,15.84-11.308,15.84-11.308	s-11.912,14.463-15.18,19.043c-6.894,9.665-6.085,16.482-6.085,16.482"/>
<polygon style="fill:#003874;stroke:#000000;stroke-miterlimit:10;" points="446.5,184.224 321.5,86.532 196.5,184.224 196.5,353.5 446.5,353.5 "/>
<polygon style="fill:#42210B;stroke:#000000;stroke-miterlimit:10;" points="321.344,86.174 167.933,207.428 127.276,208.23	204.331,144.535 204.308,77.5 234.451,77.5 234.6,124.571 321.157,55.346 510.194,207.5 471.126,207.5 "/>
<rect x="286.5" y="240.5" style="fill:#F2F2F2;stroke:#000000;stroke-miterlimit:10;" width="67" height="113"/>
<rect x="294.5" y="246.5" style="fill:#603813;stroke:#000000;stroke-miterlimit:10;" width="52" height="95"/>
<rect x="286" y="341" style="fill:#999999;" width="69" height="6"/>
<rect x="280" y="347" style="fill:#666666;" width="81" height="7"/>
<line style="fill:#F2F2F2;stroke:#F2F2F2;stroke-miterlimit:10;" x1="301.5" y1="289" x2="301.5" y2="309"/>
</svg>