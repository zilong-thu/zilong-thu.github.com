var Tax = {
	salary_in: 0 ,
	salary_res: 0 ,
	insurance : 0 ,
	moneyForTax : 0 ,
	tax: 0 ,
	START: 3500 ,
	// 五险一金计算方法
	insuranceMethod: 'user',
	insuranceCity: {
		// 顺序： 养老，医疗，失业，工伤，生育，公积金
		Beijing: [8, 2, 0.2, 0, 0, 12],
		Shanghai: [8, 2, 1, 0, 0, 7],
		Nanjing: [8, 2, 1, 0, 0, 8]
	},

	// 获取税前月收入
	getSalaryIn : function(){
		var s = document.getElementById('salary-in').value || 0;
		this.salary_in = parseFloat(s).toFixed(2);
		return this;
	},

	// 获取界面上的五险一金数额
	getInsurance : function(){
		var s = document.getElementById('insurance').value || 0;
		this.insurance = parseFloat(s).toFixed(2);
		return this;
	},

	// 根据各项百分比计算五险一金数额
	calcInsurance : function(){
		var ins={},
			insurance_tmp = 0,
			s_in;

		s_in = document.getElementById('salary-in').value || 0;

		ins.old = document.getElementById('insurance_old').value;
		ins.loseJob = document.getElementById('insurance_loseJob').value;
		ins.medical = document.getElementById('insurance_medical').value;
		ins.baby = document.getElementById('insurance_baby').value;
		ins.injure = document.getElementById('insurance_injure').value;
		ins.provident = document.getElementById('insurance_providentFund').value;

		for(p in ins){
			ins[p] = ins[p] || "0" ;
			insurance_tmp += parseFloat( ins[p] ) * 0.01 * s_in;
		}

		document.getElementById('insurance').value = insurance_tmp.toFixed(2);

		return this;
	},

	// 计算税
	calcTax : function(){
		var self = this, tax;
		//应纳税额
		var moneyForTax =  self.salary_in - self.insurance -self.START ;
		moneyForTax = ( ( moneyForTax > 0 ) ? moneyForTax : 0 ).toFixed(2);

		if(moneyForTax){
			if(moneyForTax <= 9000){
				if(moneyForTax > 4500){
					tax = 555 + 0.2*(moneyForTax-4500);
				} else if(moneyForTax > 1500){
					tax = 105 + 0.1*(moneyForTax-1500);
				} else{
					tax = 0.03*moneyForTax;
				}
			} else {
				if (moneyForTax <= 55000) {
					if(moneyForTax > 35000){
						tax = 2755+ 0.3*(moneyForTax-35000);
					}else{
						tax =1005 + 0.25 * (moneyForTax - 9000);
					}
				} else if(moneyForTax <= 80000){
					tax = 5505 + 0.35*(moneyForTax-55000);
				} else{
					tax = 13505 + 0.45 * (moneyForTax - 80000);
				}
			}
		} else{
			tax = 0;
		}

		tax = tax.toFixed(2);

		self.tax = tax;

		self.salary_res =  ( self.salary_in - self.insurance - self.tax ).toFixed(2);

		// 输出结果
		var str = '';
		str += '<label class="label title">计算结果</label>';
		str += '<div><span class="label">计税额度</span>  = <span class="hight-lite">&nbsp;'+ moneyForTax +'</span> 元</div>';
		str += '<div><span class="label">应纳个税</span>  = <span class="hight-lite">&nbsp;'+ tax +'</span> 元</div>';
		str += '<div><span class="label">税后收入</span>  = <span class="hight-lite">&nbsp;'+  self.salary_res +'</span> 元</div>';

		var dom_result = document.getElementById('result');
		dom_result.innerHTML = str;

		// 保存输入数据
		self.saveInput();

		return this;
	},

	saveInput: function(){
		if(window.localStorage){
			var self = this;
			var data = {
				salary_in: self.salary_in,
				insurance: self.insurance,
				insuranceMethod: self.insuranceMethod
			};
			localStorage.taxInput = JSON.stringify(data);
		}
	},
	getInput: function(){
		if(window.localStorage && localStorage.taxInput){
			var data = JSON.parse(localStorage.taxInput);
			document.getElementById('salary-in').value = data.salary_in;
			document.getElementById('insurance').value = data.insurance;
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
	var calcButton = document.getElementById('calc-button');
	calcButton.onclick = function(e){
		var e = EventUtil.getEvent(e);
		if(Tax.insuranceMethod === 'user'){
			Tax.getSalaryIn().getInsurance().calcTax();
		} else {
			Tax.getSalaryIn().calcInsurance().getInsurance().calcTax();
		}
		
		EventUtil.stopPropagation(e);

	};

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

			// 使详细计算div可见
			var insDetails = document.getElementById('insurance-details');
			if(target.dataset['name'] === 'user'){
				Tax.insuranceMethod = 'user';
				insDetails.setAttribute('style', 'display: none;');
			} else{
				Tax.insuranceMethod = 'city';
				insDetails.setAttribute('style', '');
			}
		}
	}, false);

	// 根据城市，计算计税额度
	var selectCity = document.getElementById('select-city');
	selectCity.onchange = function(e){
		var city = selectCity.value;
		var inputElements = document.querySelectorAll('#insurance-details input[class="input-m"]');
		var insCity = Tax.insuranceCity[city];
		if(insCity){
			for(var i=0, len= inputElements.length; i< len; i++){
				inputElements[i].value = insCity[i];
			}

			Tax.calcInsurance();
		}
	};

	// 改变税前收入时，更新计税额度
	var input_salaryIn = document.getElementById('salary-in');
	input_salaryIn.onchange = function(e){
		if(Tax.insuranceMethod === 'city'){
			var city = selectCity.value;
			if(city !== '---'){
				Tax.calcInsurance();
			}
		}
	};

	window.onload = function(){
		Tax.getInput();
	};
})();