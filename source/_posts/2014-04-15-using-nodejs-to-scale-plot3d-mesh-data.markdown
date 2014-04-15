---
layout: post
title: "用Node.js处理Plot3D格式的网格数据"
date: 2014-04-15 23:17
comments: true
keywords: Node.js, Plot3D
categories: NodeJS
---
上周六中午踢球崴脚，成为失足青年，导致无缘本周四的决赛，并且去一家创业公司实习的机会也泡汤了。于是，只好将全部精力放在写毕业论文，继续学习Node.js……以及每周看《冰与火之歌》S04、《生活大爆炸》、《神盾局特工》，以及跟女友聊天等等上面。

之前用Node.js写过一个Plot3D格式的曲面网格，感觉用JS写科学计算代码还是很有成就感的。这回是读文件，处理数据，然后写文件。

这篇博文的主题是，用Node.js读取Plot3D格式的网格文件，将每个点坐标放大一定倍数，然后写入到新的网格文件中。只要保证在运行的时候，aerostat.xyz存在且符合Plot3D格式就行。

<!--more-->

###关于Plot3D网格格式

Plot3D格式源于NASA，广泛用于规则网格的CFD数据文件。Plot3D网格数据格式说明：

<img src="/images/blog/node/plot3d-description.png" />


要转换的网格是这个样子的，一个倒Y型尾翼布局的系留艇。

<img src="/images/blog/node/aerostatMesh.png" />

###代码

```javascript 读取Plot3D面网格并进行缩放转换的app.js代码
var fs = require('fs');
var outStream = fs.WriteStream('scaled_mesh.xyz');

var data = fs.readFileSync('aerostat.xyz', 'utf8');

var dataArray = data.split(/\r\n/);

// block个数
var NBlock = dataArray[0];

// 在整个数组中搜索第一个包含小数点的项所在的位置
// 从这个项开始往后，全部是网格点
// gridStartIndex : 坐标数据起始点在数组dataArray中的下标
var gridStartIndex,
	reg = /\./;
for(var j=0, len=dataArray.length; j<len; j++){
	if(reg.test(dataArray[j])){
		gridStartIndex = j;
		break;
	}
}

console.log(gridStartIndex);

// 得到新数组
var gridArray = dataArray.slice(gridStartIndex);

for (var i = 0; i < gridStartIndex; i++) {
	outStream.write(dataArray[i]+'\r\n');
};

// 对网格进行缩放
// 并写入到另一个文件中
var scaleFactor = 66.8;
for (var i = 0, length = gridArray.length; i < length; i++) {
	gridArray[i] = gridArray[i]*scaleFactor;
	outStream.write(gridArray[i]+'\r\n');
};


outStream.end();

console.log('Mesh data scaling finished.');
```