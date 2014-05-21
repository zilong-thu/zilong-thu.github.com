---
layout: post
title: "用Node.js生成Plot3D网格文件"
date: 2014-04-21 15:15
comments: true
keywords: Node.js, Plot3D, JavaScript
categories: NodeJS
---
上一篇博客是读Plot3D网格，这一篇差不多。根据NACA翼型生成程序给出的点坐标，拉伸为三维机翼。

只要了解正则表达式的语法就OK。

<!--more-->

###翼型数据格式
NACA系列翼型由这个程序生成。

<a href="/files/exefiles/naca.zip" download="NACA翼型生成程序">NACA翼型生成程序</a>

生成的翼型数据并不直接就是下图的样子，用excel什么的稍微格式化一下就好了。

<img src="/images/blog/node/airfoil_data_format.png" title="翼型文件数据格式"/>

生成的网格大概这个样子：
<img src="/images/blog/node/wing_mesh.png" title="三维机翼网格"/>

###Node代码

```javascript
var fs = require('fs');

var data = fs.readFileSync('naca_airfoil.txt', 'utf8');

var outStream = fs.WriteStream('wing.xyz');
var dataArray = data.split(/\r\n/);

	// 网格
var grid = {
		X: [],
		Y: [],
		Z: []
	},

	// 翼型数据
	airfoil = {
		x: [],
		z: []
	};

// 获取翼型坐标
(function(){
	var x, z;
	for (var i = 0, length = dataArray.length; i < length; i++) {
		x = parseFloat( dataArray[i].split(/\s+/)[0] );
		z = parseFloat( dataArray[i].split(/\s+/)[1] );
		airfoil.x.push(x);
		airfoil.z.push(z);
	};
})();

var WINGSPAN = 4.0,  // 翼展
	JMAX = 41;  // 展向节点数

// 根据翼型生成一个三维机翼
var IMAX=airfoil.x.length;
for(var j=0; j<JMAX; j++){
	for(var i=0; i<IMAX; i++){
		grid.X.push(airfoil.x[i]);
		grid.Z.push(airfoil.z[i]);
		grid.Y.push(WINGSPAN/(JMAX-1)*j);
	}
}

// 写入Plot3D文件
outStream.write('1\r\n'+IMAX+'\t'+JMAX+'\t1\r\n');
for(var i=0; i<IMAX*JMAX; i++){
	outStream.write(grid.X[i]+'\t');
}
outStream.write('\r\n');
for(var i=0; i<IMAX*JMAX; i++){
	outStream.write(grid.Y[i]+'\t');
}
outStream.write('\r\n');
for(var i=0; i<IMAX*JMAX; i++){
	outStream.write(grid.Z[i]+'\t');
}

outStream.end();

console.log('NACA arifoil wing mesh generation finished.');
```