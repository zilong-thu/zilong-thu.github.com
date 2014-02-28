function calc(){
	var salary_in, salary_res, ins={}, tax,
		START = 3500;
	salary_in = document.getElementById('salary-in').value;

	ins.old = document.getElementById('insurance_old').value;
	ins.loseJob = document.getElementById('insurance_loseJob').value;
	ins.medical = document.getElementById('insurance_medical').value;
	ins.baby = document.getElementById('insurance_baby').value;
	ins.injure = document.getElementById('insurance_injure').value;

	ins.total = (ins.old + ins.loseJob + ins.medical + ins.baby + ins.injure)* 0.01 * salary_in;
	
	//应纳税额
	var moneyForTax =  salary_in - ins.total ;
	moneyForTax = moneyForTax>3500 ? ( moneyForTax-3500 ) : 0;

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

	salary_res = salary_in - ins.total - tax;

	var str = '';
	str += '<div>应纳税额： '+ moneyForTax +' 元</div>';
	str += '<div>应个人所得税： '+ tax +' 元</div>';
	str += '<div>税后实际收入为： '+  salary_res +' 元</div>';

	document.getElementById('result').innerHTML = str;
}