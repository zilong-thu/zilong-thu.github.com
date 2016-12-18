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
		for(var row=0; row