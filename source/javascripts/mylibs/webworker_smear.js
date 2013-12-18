onmessage = function(e){ postMessage(smear(e.data)); };

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