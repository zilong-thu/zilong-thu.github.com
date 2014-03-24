/*
 * drawTree函数摘自《JavaScript高效图形编程》一书
 * page141
 * ISBN: 978-7-115-27881-4
 * Author: Raffaele Cecco
 * 人民邮电出版社
 */
var drawTree = function(ctx, startX, startY, length, angle, depth, branchWidth){
	var rand = Math.random,
		newLength, newAngle, newDepth, maxBranch = 3,
		endX, endY, maxAngle = 2*Math.PI/4,
		subBranches, lenShrink;

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	endX = startX + length * Math.cos(angle);
	endY = startY + length * Math.sin(angle);
	ctx.lineCap = 'round';
	ctx.lineWidth = branchWidth;
	ctx.lineTo(endX, endY);

	if(depth <= 2){
		ctx.strokeStyle = 'rgb(0,' + ((128 + ( rand()*64 ))>>0) + ',0)';
	} else {
		ctx.strokeStyle = 'rgb(' + ((64 + ( rand()*64 ))>>0) + ',50,25)';
	}

	ctx.stroke();

	newDepth = depth -1;
	if(!newDepth){
		return;
	}

	subBranches = rand() * (maxBranch-1) + 1 ;
	branchWidth *= 0.7 ;

	for(var i=0; i<subBranches; i++){
		newAngle = angle + rand() * maxAngle - maxAngle*0.5;
		newLength = length*(0.7 + rand()*0.3);
		drawTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth);
	}
};

function prepareCanvas(canvas, ifclear){
	var width, height;
	var ctx = canvas.getContext('2d');
	if(ifclear){
		width = canvas.width;
		height = canvas.height;
		ctx.clearRect(0,0,width, height);
	}
}

(function(){
	var dom_button = document.getElementById('redrawButton');
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var dom_time_consumed = document.getElementById('time-consumed');

	var dom_checkbox = document.getElementById('ifclear');


	dom_button.onclick = function(e){
		var start = +new Date();

		var ifclear = dom_checkbox.checked ? false : true;
		prepareCanvas(canvas, ifclear);
		drawTree(ctx, 480, 540, 70, -Math.PI/2, 12, 14);

		var end = +new Date();

		dom_time_consumed.innerHTML = '耗时' + (end-start) + '毫秒';
	};

	// initialize
	drawTree(ctx, 480, 540, 70, -Math.PI/2, 12, 14);
})();