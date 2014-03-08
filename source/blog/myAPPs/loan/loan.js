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
		'最新基准利率1倍',
		'最新基准利率1.1倍',
		'最新基准利率1.2倍',
		'最新基准利率1.3倍'],
	selectInterest: 1,
	periodLabels: ['6个月', '1年', '2年', '3年', '4年', '5年', '10年', '15年', '20年', '25年', '30年'],
	periodValues: [0.5, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30],

	// 基准利率，是贷款年限的函数
	benchmarkRate: 0,

	area: 0,
	price: 0,
	downPayment: 0,

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
	}
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
	}
};


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
		str += '<div>等额本息还款法</div>';
		str += '<div><span class="label">月还款额</span> = <span class="hight-lite">'+ monthly +'</span> 元</div>';
		str += '<div><span class="label">支付总利息</span> = <span class="hight-lite">'+ totalInterest +'</span> 元</div>';
		str += '<div><span class="label">总还款额</span> = <span class="hight-lite">'+ total +'</span> 元</div>';
		
		dom_result.innerHTML = str;
		dom_result.scrollIntoView();

		Loan.saveInput();
	};

	// 初始化

	window.onload = function(){
		Loan.getInput();
	};
})();