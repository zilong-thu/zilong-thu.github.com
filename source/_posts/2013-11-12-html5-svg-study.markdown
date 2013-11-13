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
	<g id="hands" filter="url(#hand-shadow)">
		<line id="hourhand" x1="50" y1="50" x2="50" y2="28" style="stroke-width: 5;"/>
		<line id="minutehand" x1="50" y1="50" x2="50" y2="24" style="stroke-width: 3;"/>
		<polygon id="secondhand" points="50,58 49,50 50,16 51,50" style="fill:red;stroke:red;"/>
	</g>
</svg>
</div>

###例3：Adobe Illustrator导出SVG
在本博文中尝试导入Illustrator输出的SVG文件到HTML中。是一朵花。

<embed src="{{ root_url}}/svg/flower.svg" type="image/svg+xml">

成功了。这是从Illustrator CS6 自带的模板里摘出来的（要不然原始模板太大）。这个SVG文件大小为49KB，却是完全矢量化的。比位图的优势大太多了。

###例4：SVG的交互设计
这应该是最有应用价值的部分了。待研究。

已知的一个很好的Web应用是<a href="https://moqups.com/" target="_blank">moqups</a>。