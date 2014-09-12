var Loan = {
	amount: 0,
	annualInterest : 6.55,
	period : 0,
	interestValues:[0.7, 0.8, 0.85, 0.9, 1, 1.1, 1.2, 1.3],
	interestLabels: [
		'最新基准利率7折',
		'最新基准利率8折',
		'最新基准利率8.5折',
		'最新基准利率9折',
		'最新基准利率',
		'最新基准利率1.1倍',
		'最新基准利率1.2倍',
		'最新基准利率1.3倍'],
	selectInterest: 1,
	periodLabels: ['6个月', '1年', '2年', '3年', '4年', '5年', '10年', '15年', '20年', '25年', '30年'],
	periodValues: [0.5, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30],

	loanAmountMethod: 'byLoanAmount',

	// 基准利率，是贷款年限的函数
	benchmarkRate: 0,

	area: 0,
	price: 0,
	downPayment: 0,

	canvas_DefaultWidth: 400,


	// 根据贷款年限，计算基准利率
	calcBenchmarkRate: function(p){
		var b = 6.55;
		if(p > 3){
			if(p>5){
				b = 6.55;
			}else{
				b = 6.4;
			}
		} else{
			if(p>1){
				b = 6.15;
			} else if(p==1){
				b = 6;
			} else{
				b = 5.6;
			}
		}

		this.benchmarkRate = b;

		return b;
	},

	// 生成利率下拉表单
	generateInterestList : function(){
		var dom_selectInterest = document.getElementById('selectInterest');
		var str = '', labels = this.interestLabels, values = this.interestValues;
		var label, value;

		for(var i=0, len = labels.length; i<len; i++){
			label = labels[i];
			value = values[i];
			str += '<option value="'+  value +'">'+ label +'</option>';
		}

		dom_selectInterest.innerHTML = str;
	},

	// 生成贷款期限下拉表单
	generatePeriodList: function(){
		var dom_selectPeriod = document.getElementById('select-period');
		var str = '', labels = this.periodLabels, values = this.periodValues;
		var label, value;

		for(var i=0, len = labels.length; i<len; i++){
			label = labels[i];
			value = values[i];
			str += '<option value="'+  value +'">'+ label +'</option>';
		}

		dom_selectPeriod.innerHTML = str;
	},

	saveInput: function(){
		if(window.localStorage){
			var self = this;
			var data = {
				amount: self.amount,
				period: self.period,
				selectInterest: self.selectInterest,
				annualInterest: self.annualInterest
			};
			localStorage.loanInput = JSON.stringify(data);
		}
	},
	getInput: function(){
		var dom_selectPeriod = document.getElementById('select-period');
		var dom_selectInterest = document.getElementById('selectInterest');
		var dom_annualInterest = document.getElementById('annual-interest');

		if(window.localStorage && localStorage.loanInput){
			var data = JSON.parse(localStorage.loanInput);
			document.getElementById('amount').value = data.amount;
			dom_selectPeriod.value = data.period;
			Loan.calcBenchmarkRate(data.period);

			dom_selectInterest.value = data.selectInterest ;
			dom_annualInterest.value = data.annualInterest ;
		} else {
			dom_selectPeriod.value = '20';
			dom_selectInterest.value = '1';
			dom_annualInterest.value = Loan.calcBenchmarkRate(20);
		}
	},

	// 根据浏览器大小，调整canvas的宽度
	adjustCanvas: function(){
		var graph = document.getElementById("graph"); 
		var graphWidth = window.innerWidth * 0.92 ;
		var h = graphWidth * 0.618;

		var dpr = window.devicePixelRatio || 1;

		if(graphWidth < 640 ){
			graph.style.width  = graphWidth + 'px';
			graph.style.height = h + 'px';

			graph.width  = graphWidth * dpr;
			graph.height = h * dpr;
		} else {
			graph.style.width  = 640+ 'px';
			graph.style.height = 640 * 0.618 + 'px';

			graph.width  = 640 * dpr;
			graph.height = 640 * 0.618 * dpr;
		}
		
	},
};

// 跨浏览器事件对象
var EventUtil = {
	getEvent: function(event){
		return event ? event : window.event;
	},
	getTarget : function(event){
		return event.target || event.srcElement ;
	},
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		} else{
			event.returnValue = false;
		}
	},
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else {
			event.cancelBubble = true;
		}
	},
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		} else{
			element["on"+type] = handler;
		}
	}
};

// chart函数摘自《JavaScript权威指南（第六版）》第一章末的示例
// Chart monthly loan balance, interest and equity in an HTML <canvas> element.
// If called with no arguments then just erase any previously drawn chart.
function chart(principal, interest, monthly, payments) {

	var dpr = window.devicePixelRatio || 1;

	var baseFontSize = 14;

    var graph = document.getElementById("graph"); // Get the <canvas> tag
    graph.width = graph.width;  // Magic to clear and reset the canvas element

    // 设置其样式
    graph.setAttribute('class', 'canvas');

    // If we're called with no arguments, or if this browser does not support
    // graphics in a <canvas> element, then just return now.
    if (arguments.length == 0 || !graph.getContext) return;

    // Get the "context" object for the <canvas> that defines the drawing API
    var g = graph.getContext("2d"); // All drawing is done with this object
    var width = graph.width, height = graph.height; // Get canvas size

    // These functions convert payment numbers and dollar amounts to pixels
    function paymentToX(n) { return n * width/payments; }
    function amountToY(a) { return height-(a * height/(monthly*payments*1.05));}

    // Payments are a straight line from (0,0) to (payments, monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0));         // Start at lower left
    g.lineTo(paymentToX(payments),                 // Draw to upper right
             amountToY(monthly*payments));
    g.lineTo(paymentToX(payments), amountToY(0));  // Down to lower right
    g.closePath();                                 // And back to start
    g.fillStyle = "#f88";                          // Light red
    g.fill();                                      // Fill the triangle
    g.font = 'normal ' + Math.ceil(baseFontSize*dpr) +'px sans-serif';               // Define a font
    g.fillText("支付本息和", 20 * dpr,20 * dpr);  // Draw text in legend

    // Cumulative equity is non-linear and trickier to chart
    var equity = 0;
    g.beginPath();                                 // Begin a new shape
    g.moveTo(paymentToX(0), amountToY(0));         // starting at lower-left
    for(var p = 1; p <= payments; p++) {
        // For each payment, figure out how much is interest
        var thisMonthsInterest = (principal-equity)*interest;
        equity += (monthly - thisMonthsInterest);  // The rest goes to equity
        g.lineTo(paymentToX(p),amountToY(equity)); // Line to this point
    }
    g.lineTo(paymentToX(payments), amountToY(0));  // Line back to X axis
    g.closePath();                                 // And back to start point
    g.fillStyle = "#7BA0B1";                         // 暗蓝色
    g.fill();                                      // And fill area under curve
    g.fillText("支付本金", 20 * dpr,40 * dpr);             // Label it in 暗蓝色

    // Loop again, as above, but chart loan balance as a thick black line
    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0),amountToY(bal));
    for(var p = 1; p <= payments; p++) {
        var thisMonthsInterest = bal*interest;
        bal -= (monthly - thisMonthsInterest);     // The rest goes to equity
        g.lineTo(paymentToX(p),amountToY(bal));    // Draw line to this point
    }
    g.lineWidth = 3 * dpr;                               // Use a thick line
    g.strokeStyle = "#A6FF2E";                         // 亮绿色
    g.stroke();                                    // Draw the balance curve
    g.fillStyle = "#A6FF2E";                         // 文本，亮绿色
    g.fillText("贷款尾款", 20 * dpr, 60 * dpr);             // Legend entry

    // Now make yearly tick marks and year numbers on X axis
    g.fillStyle = "black";   
    g.textAlign="center";                          // Center text over ticks
    var y = amountToY(0) * dpr;                          // Y coordinate of X axis
    g.fillText("年份", 20 * dpr, (y -5) ); // Label the axis
    for(var year=1; year*12 <= payments; year++) { // For each year
        var x = paymentToX(year*12) * dpr;               // Compute tick position
        g.fillRect(x -0.5,y-3,1,3);                 // Draw the tick
        if (year % 5 == 0 && year*12 !== payments) // Number every 5 years
            g.fillText(String(year), x , (y-5) );
    }

    // Mark payment amounts along the right edge
    g.textAlign = "right";                         // Right-justify text
    g.textBaseline = "middle";                     // Center it vertically
    var ticks = [monthly*payments, principal];     // The two points we'll mark

    var colors = ["#f88", "#0047B3"];
    var rightEdge = paymentToX(payments);          // X coordinate of Y axis
    for(var i = 0; i < ticks.length; i++) {        // For each of the 2 points
        var y = amountToY(ticks[i]);               // Compute Y position of tick
        g.fillStyle = colors[i]; 
        g.fillRect( (rightEdge-3), y-0.5, 3,1);       // Draw the tick mark
        g.fillText(String(ticks[i].toFixed(0)),    // And label it.
                   (rightEdge-10) , y);
    }
}



var Debug = {
	getScreenSize: function(){
		var windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			dom_debugDIV = document.getElementById('debugDIV');

		var dpr = window.devicePixelRatio || 1;

		dom_debugDIV.innerHTML = '<p><span class="title">浏览器视窗尺寸</span><br/>屏幕宽度：'+
		                          windowWidth + ' px <br/>屏幕高度：' + windowHeight +' px</p>' +
		                          '<p>屏幕的物理像素与视口像素之比（即window.devicePixelRatio） = '+ dpr +'</p>';
	},
};



// 注册事件处理程序等
(function(){
	Loan.generateInterestList();
	Loan.generatePeriodList();

	var dom_selectPeriod = document.getElementById('select-period');
	var dom_selectInterest = document.getElementById('selectInterest');
	var dom_annualInterest = document.getElementById('annual-interest');
	var dom_calcButton = document.getElementById('calc-button');
	var dom_inputAmount = document.getElementById('amount');

	dom_inputAmount.onchange = function(e){
		Loan.amount = dom_inputAmount.value;
	};

	// 响应自制的radio按钮
	document.addEventListener('click', function(e){
		var e = EventUtil.getEvent(e);
		var target = EventUtil.getTarget(e);
		var parent = target.parentNode,
			spans  = parent.children;

		// 响应自制的radio按钮
		if(parent.className === 'radio-group'){
			for(var i=0, length = spans.length; i<length; i++){
				spans[i].setAttribute('class', 'radio');
			}
			target.setAttribute('class' , 'radio radio-selected');

			// 使相应div可见
			var dom_divByHouseArea = document.getElementById('by-houseArea');;
			if(target.dataset['name'] === 'user'){
				dom_divByHouseArea.setAttribute('style', 'display: none;');
				Loan.loanAmountMethod = 'byLoanAmount';
			} else{
				dom_divByHouseArea.setAttribute('style', '');
				Loan.loanAmountMethod = 'byHouseArea';
			}
		}
	}, false);

	// 若选择按面积计算
	var dom_input_house_area = document.getElementById('house_area');
	var dom_input_house_price = document.getElementById('house_price');
	var dom_select_downPayment = document.getElementById('downPayment');
	var dom_span_downPayment = document.getElementById('span_downPayment');

	EventUtil.addHandler(document, 'change', function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var area, price, downPayment, totalHousePrice;

		switch(target.id){
			case 'house_area':
			case 'house_price':
			case 'downPayment':
				area = parseFloat( dom_input_house_area.value ) || 0;
				price = parseFloat( dom_input_house_price.value ) || 0;
				downPayment = parseFloat( dom_select_downPayment.value )*0.01;
				totalHousePrice = (area * price ).toFixed(2) ;

				document.getElementById('totalHousePrice').innerHTML = '总房价： <span class="high-lite"> &yen;' + totalHousePrice + '</span>';
				Loan.amount = ( totalHousePrice * ( 1 - downPayment ) ).toFixed(2) ;

				dom_inputAmount.value = Loan.amount;

				dom_span_downPayment.innerHTML =  ' &yen;' + (totalHousePrice*downPayment).toFixed(2) ;

			break;
			default:
				return;
		}

		EventUtil.stopPropagation(event);
	});


	// 根据贷款年限计算基准利率
	dom_selectPeriod.onchange = function(e){
		var e = EventUtil.getEvent(e);
		var period = EventUtil.getTarget(e).value;
		Loan.calcBenchmarkRate(period);

		Loan.period = period;

		dom_annualInterest.value = (dom_selectInterest.value * Loan.benchmarkRate).toFixed(2);
	};
	
	// 选择利率水平
	dom_selectInterest.onchange = function(e){
		var val = dom_selectInterest.value;
		Loan.selectInterest = val;
		dom_annualInterest.value = (val*Loan.benchmarkRate).toFixed(2);
	};

	// 计算利息
	dom_calcButton.onclick = function(e){
		Loan.amount = parseFloat(dom_inputAmount.value);
		Loan.annualInterest = parseFloat(dom_annualInterest.value);
		Loan.period = parseFloat(dom_selectPeriod.value);
		Loan.selectInterest = dom_selectInterest.value;

		var principal = Loan.amount;
		var interest = Loan.annualInterest / 100 / 12 ;
		var payments = Loan.period * 12 ;

		var x = Math.pow( 1 + interest, payments );
		var monthly = ( (principal *x * interest) /(x-1) ).toFixed(2);
		var totalInterest = ((monthly*payments) - principal ).toFixed(2);
		var total = (monthly * payments).toFixed(2);

		var dom_result = document.getElementById('result');
		var str = '';
		str += '<div>等额本息还款法：</div>';
		str += '<div><span class="label">每月还款</span> = <span class="high-lite">'+ monthly +'</span> 元</div>';
		str += '<div><span class="label">支付总利息</span> = <span class="high-lite">'+ totalInterest +'</span> 元</div>';
		str += '<div><span class="label">总还款额</span> = <span class="high-lite">'+ total +'</span> 元</div>';
		
		dom_result.innerHTML = str;

		Loan.saveInput();

		chart(principal, interest, monthly, payments);
	};

	// 初始化
	window.onload = function(){
		Loan.getInput();
		Loan.adjustCanvas();

		Debug.getScreenSize();
	};
})();