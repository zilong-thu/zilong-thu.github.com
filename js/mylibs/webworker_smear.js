onmessage = function(e){ postMessage(smear(e.data)); };

function smear(obj){
	var pixels = obj.pixels;
	var data = pixels.data,
		width = pixels.width,
		height = pixels.height,
		direct = obj.direct;
		n = 10, 
		m = n-1;
	
	if (direct==='right') {
		for(var row=0; row<height; row++){
			var i = row*width*4 + 4;
			for(var col=1; col<width; col++, i+=4){
				data[i]  = (data[i] + data[i-4]*m)/n;
				data[i+1]  = (data[i+1] + data[i-3]*m)/n;
				data[i+2]  = (data[i+2] + data[i-2]*m)/n;
				data[i+3]  = (data[i+3] + data[i-1]*m)/n;
			}
		}
	} else if(direct === 'left'){
		for(var row=0; row<height; row++){
			var i = row*width*4 + 4;
			for(var col=1; col<width; col++, i+=4){
				data[i-4]  = (data[i-4] + data[i]*m)/n;
				data[i-3]  = (data[i-3] + data[i+1]*m)/n;
				data[i-2]  = (data[i-2] + data[i+2]*m)/n;
				data[i-1]  = (data[i-1] + data[i+3]*m)/n;
			}
		}
	} else {
		for (var i=0, len = data.length; i<len; i+=4){
			var average = Math.floor((data[i] + data[i+1] + data[i+2])/3);
			data[i] = average;
			data[i+1] = average;
			data[i+2] = average;
		}
	}
	
	return pixels;
}