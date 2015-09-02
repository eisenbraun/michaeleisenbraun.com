/* 
* Health Plan Calculator 1.0.0
* Copyright (c) 2013, Michael Eisenbraun
* Last Updated: 2013-11-03
*/
 
if(!window.console) { var console = { log: function() { } } };   

/* HEALTH PLAN CALCULATOR 
* 
*   costs (obj) - stores all the estimates cost of services and perscriptions
*   plans (array) - 
*/


var hpc = {
	dependent_limit: 10,
	costs: {		
		physician:95, 
		specialist:179, 
		xray:271, 
		urgent:184,
		outpatient:3364, 
		hospitalization:15070,
		er:1139, 
		maternity_normal:8000,
		maternity_csection:11160,
		other:0,
		rx_generic:13, 
		rx_formulary:35, 
		rx_nonformulary:60
	},
	plans: [
		{
			description: 'Medical $750/$1500 Deductible',
			premiums: {
				employee:60.00,
				employee_plus_one:117.00,
				employee_plus_family:176.00 
			}, 
			deductibles: { 
				employee:750, 
				employee_plus_one: 1500, 
				employee_plus_family: 1500
			},
			coinsurance: {
				employee:0.15, 
				employee_plus_one:0.15, 
				employee_plus_family:0.15
			},
			maxcoinsurance: {
				employee:2500,
				employee_plus_one:5000,
				employee_plus_family:5000
			},
			copay: { 
				er: 60, 
				hospitalization: 120, 
				maternity: 120	
			},
			rx_deductibles: { 
				employee:50, 
				employee_plus_one:50, 
				employee_plus_family:50
			}, 
			fsa_limit: { 
				employee:2500, 
				employee_plus_one:2500, 
				employee_plus_family:2500
			}, 
			comparisons: {
				deductible:0, 
				copay:0, 
				coinsurance:0, 
				rx_deductible:0,
				rx_copay:0, 
				total:0, 
				fsa:0
			} 
		}, 
		
		{
			description: 'Medical $1250/$2500 Deductible', 
			premiums: {
				employee:29.00,
				employee_plus_one:63.00, 
				employee_plus_family:103.00 
			}, 
			deductibles: { 
				employee:1250, 
				employee_plus_one: 2500, 
				employee_plus_family: 2500
			},
			coinsurance: {
				employee:0.15, 
				employee_plus_one:0.15, 
				employee_plus_family:0.15
			},
			maxcoinsurance: {
				employee:2500,
				employee_plus_one:5000,
				employee_plus_family:5000
			},
			copay: { 
				er: 60, 
				hospitalization: 120, 
				maternity: 120	
			},
			rx_deductibles: { 
				employee:50, 
				employee_plus_one:50, 
				employee_plus_family:50
			},
			fsa_limit: { 
				employee:2500, 
				employee_plus_one:2500, 
				employee_plus_family:2500
			}, 
			comparisons: {
				deductible:0, 
				copay:0, 
				coinsurance:0, 
				rx_deductible:0,
				rx_copay:0, 
				total:0,
				fsa:0
			}  
		}
	], 
	coveragelevel: null,
	effectivedate: null,
	effectivemonth: 0,   
    Policyholder:function(name) {
    	this.name =  (name ? name : 'Dependent'); 
    	this.qty = { 
			physician:0, 
			specialist:0, 
			xray:0, 
			urgent:0,
			outpatient:0, 
			hospitalization:0,
			er:0, 
			maternity:0,
			other:0,
			rx_generic:0, 
			rx_formulary:0, 
			rx_nonformulary:0
		}; 
		this.total = {			
			physician:0, 
			specialist:0, 
			xray:0, 
			urgent:0,
			outpatient:0, 
			hospitalization:0,
			er:0, 
			maternity_normal:0,
			maternity_csection:0,
			other:0,
			med_total:0, 
			rx_generic:0, 
			rx_formulary:0, 
			rx_nonformulary:0, 
			rx_total:0,
		};
		
		this.plan = [
			{
				deductible: 0, 
				coinsurance: 0,
				copay: 0, 
				rx_deductible: 0, 
				rx_copay: 0 
			}, 
			{
				deductible: 0, 
				coinsurance: 0,
				copay: 0,
				rx_deductible: 0, 
				rx_copay: 0 
			}
		]
	},
	policyholders: {
		employee:null,  
		dependents: 0,
		limit: 10
	}, 
	strToNum:function(str) { 
		return Number(str.replace(/(\$|,|[A-z])*/g, ''));
	},
	addCommas:function(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}, 
	numToDollar:function(num, decimal) {
		decimal = decimal ? decimal : 0;  
		return '$'+this.addCommas(num.toFixed(decimal)); 
	},
	getCoverageLevel:function() { 
	 	var $this = this; 
	 	
	 	if($this.coveragelevel) { 
	 		switch($this.coveragelevel) { 
	 			case 'employee': 
	 				return 'Employee'; 
	 				
	 			case 'employee_plus_one':
	 				return 'Employee + One'; 
	 				
	 			case 'employee_plus_family': 
	 				return 'Employee + Family'; 
	 		}
	 	} 
	 	
	 	return false; 
	},
	setTotalExpenses:function(policyholder) { 
		var $this = this, 
		med_total = 0,
		rx_total = 0;  
	
		$.each($this.policyholders[policyholder].total, function(key, value) { 
			if(key.indexOf('total') == -1) {  
				if(key.indexOf('rx_') == -1) { 
					med_total += value; 
				} else { 
					rx_total += value; 
				} 
			}
		});
		
		$this.policyholders[policyholder].total.med_total = med_total; 
		$this.policyholders[policyholder].total.rx_total = rx_total;   
	},
	getPremiumExpense:function(plan) { 
		var $this = this; 
		var effectivedate = new Date($this.effectivedate);
		$this.effectivemonth = effectivedate.getMonth(); 
		return ((12 - $this.effectivemonth) * 2) * plan.premiums[$this.coveragelevel]; 
	},
	getDeductible:function(policyholder, key) {
		var $this = this; 
		var plan = $this.plans[key]; 
		var med_total = $this.policyholders[policyholder].total.med_total,
		remaining_deductible = plan.deductibles[$this.coveragelevel] - plan.comparisons.deductible,
		employee_deductible = plan.deductibles['employee'];
		

		if(remaining_deductible > 0) {
			if(remaining_deductible > employee_deductible) {
				$this.policyholders[policyholder].plan[key].deductible = (med_total > employee_deductible ? employee_deductible : med_total );
			} else { 
				$this.policyholders[policyholder].plan[key].deductible = (remaining_deductible < med_total ? remaining_deductible : med_total );
			} 
		}
		
		$this.policyholders[policyholder].total.med_total -= $this.policyholders[policyholder].plan[key].deductible;
		plan.comparisons.deductible += $this.policyholders[policyholder].plan[key].deductible;
	}, 
	getCoinsurance:function(policyholder, key) {
		var $this = this; 
		var plan = $this.plans[key]; 
		var med_total = $this.policyholders[policyholder].total.med_total, 
		coinsurance = med_total * plan.coinsurance[$this.coveragelevel],
		remaining_coinsurance = plan.maxcoinsurance[$this.coveragelevel] - plan.comparisons.coinsurance,
		employee_coinsurance = plan.maxcoinsurance['employee']; 
		
		
		if(remaining_coinsurance > 0) {
			if(remaining_coinsurance < coinsurance) {
				$this.policyholders[policyholder].plan[key].coinsurance = remaining_coinsurance; 
			} else { 
				$this.policyholders[policyholder].plan[key].coinsurance = (coinsurance > employee_coinsurance ? employee_coinsurance : coinsurance);
			}
		}		
		
		plan.comparisons.coinsurance += $this.policyholders[policyholder].plan[key].coinsurance;		
	},
	getCopay:function(policyholder, key) {
		var $this = this,
		copay = 0; 
		
		var plan = $this.plans[key];   
		
		copay = ($this.policyholders[policyholder].qty.er * plan.copay.er) + ($this.policyholders[policyholder].qty.hospitalization * plan.copay.hospitalization); 
		
		if($this.policyholders[policyholder].qty.maternity) {
			copay += plan.copay.maternity; 
		}
		
		$this.policyholders[policyholder].plan[key].copay = copay; 
		$this.policyholders[policyholder].total.med_total = $this.policyholders[policyholder].total.med_total - copay; 
		
		
		plan.comparisons.copay += copay; 
	},
	getRxExpenses:function(policyholder, key) { 
		var $this = this, 
		rx_expenses = 0; 
		
		var plan = $this.plans[key]; 
			
		rx_expenses = $this.policyholders[policyholder].total.rx_total * (12 - $this.effectivemonth);
		
		if(rx_expenses > plan.rx_deductibles['employee']) { 
			$this.policyholders[policyholder].plan[key].rx_deductible = plan.rx_deductibles['employee']; 
			$this.policyholders[policyholder].plan[key].rx_copay = rx_expenses - plan.rx_deductibles['employee']; 
		} else { 
			$this.policyholders[policyholder].plan[key].rx_deductible = rx_expenses; 
		}
		
		plan.comparisons.rx_deductible += $this.policyholders[policyholder].plan[key].rx_deductible; 
		plan.comparisons.rx_copay += $this.policyholders[policyholder].plan[key].rx_copay; 
		
	}, 
	getComparison:function() { 
		var $this = this,
		rows = '',
		med_totals = [], 
		medicalexpense = 0, 
		rx_expenses = 0, 
		policyholder = null;
		
		var premiumexpense = 0; 
		
		$.each($this.plans, function(key, plan) { 
			
			/*calculate deductibles and coinsurance*/
			
			//reset family deductible and coinsurance to zero
			plan.comparisons.deductible = 0; 
			plan.comparisons.coinsurance = 0;
			plan.comparisons.copay = 0; 
			plan.comparisons.rx_deductible = 0; 
			plan.comparisons.rx_copay = 0; 
			rx_expenses = 0; 
			
			//loop through all policyholders
			for(var i = 0; i <= $this.policyholders.dependents; i++) {
				//determine if employee 
				if(i === 0) {
					policyholder = 'employee';
				} else {
					policyholder = 'dependent'+i;
				}
				
				//getting policyholder total expenses 
				$this.setTotalExpenses(policyholder);
				
				//reset policyholder deductible and coinsurance to zero
				$this.policyholders[policyholder].plan[key].deductible = 0; 
				$this.policyholders[policyholder].plan[key].coinsurance = 0; 
				$this.policyholders[policyholder].plan[key].copay = 0;
				
				$this.getCopay(policyholder, key);
				$this.getDeductible(policyholder, key);
				$this.getCoinsurance(policyholder, key);
				$this.getRxExpenses(policyholder, key); 
			}
			
			//getting Premium Expense
			premiumexpense = $this.getPremiumExpense(plan);
			
			//calculate total
			plan.comparisons.total = plan.comparisons.deductible + plan.comparisons.copay + plan.comparisons.coinsurance + plan.comparisons.rx_deductible + plan.comparisons.rx_copay + premiumexpense; 
			
			plan.comparisons.fsa = plan.comparisons.deductible + plan.comparisons.copay + plan.comparisons.coinsurance + plan.comparisons.rx_deductible + plan.comparisons.rx_copay;
			
			plan.comparisons.fsa = (plan.comparisons.fsa > plan.fsa_limit[$this.coveragelevel] ? plan.fsa_limit[$this.coveragelevel] : plan.comparisons.fsa);
			
			//plan description
			rows += '<tr><td>'+plan.description+'</td>'; 
			
			//premiums
			rows += '<td>'+$this.numToDollar(plan.premiums[$this.coveragelevel], 2)+'</td>'; 
			
			//medical deductible
			rows += '<td>'+$this.numToDollar(plan.comparisons.deductible, 2)+'</td>'; 
			
			//copypayment(s)
			rows += '<td>'+$this.numToDollar(plan.comparisons.copay, 2)+'</td>'; 
			
			//coinsurance
			rows += '<td>'+$this.numToDollar(plan.comparisons.coinsurance, 2)+'</td>';
			
			//RX Deductible
			rows += '<td>'+$this.numToDollar(plan.comparisons.rx_deductible, 2)+'</td>';
			
			//RX Copay
			rows += '<td>'+$this.numToDollar(plan.comparisons.rx_copay, 2)+'</td>';
			
			//total 
			rows += '<td><strong>'+$this.numToDollar(plan.comparisons.total, 2)+'</strong></td>';  
			
			//HC FSA
			rows += '<td>'+$this.numToDollar(plan.comparisons.fsa, 2)+'</td>';
			
			//close row 
			rows += '</tr>'; 
		});
		
		$('tbody', $this.el.comparisons).html(rows);
	}, 
	loadForm:function() { 
		var $this = this, 
		policyholder = this.el.policyholder.val(); 
		
		if($this.coveragelevel && $this.effectivedate) { 
			$this.el.demographics.slideUp();
			$this.el.summary.html('<p>Coverage Level: <strong>'+$this.getCoverageLevel()+'</strong>&nbsp;&nbsp;Effective Date: <strong>'+$this.effectivedate+'</strong>&nbsp;&nbsp;<a href="#" class="edit">edit</a></p>').fadeIn('slow');
			
			$this.el.policyholders.css('visibility', 'visible'); 
			
			$this.el.expenses.css('visibility', 'hidden');
			 
			$.each($this.policyholders[policyholder].qty, function(key, value) { 
				if(key == 'maternity') { 
					$this.el.maternityselect.val(value);
					$('.total .green', $this.el[key]).html($this.numToDollar(value));
				} else { 
					$('input', $this.el[key]).val(value);
					$('.total .green', $this.el[key]).html($this.numToDollar(value*$this.costs[key]));
				}
			});
			
			$(".total .green", $this.el.med_total).html($this.numToDollar($this.policyholders[policyholder].total.med_total));
			$(".total .green", $this.el.rx_total).html($this.numToDollar($this.policyholders[policyholder].total.rx_total));
			
			setTimeout("hpc.el.expenses.css('visibility', 'visible')", 100);
			$this.el.comparisons.animate({'height':'150px'});
			$this.el.banner.fadeOut();
		} 
	},
	reset:function() { 
		var $this = this; 
		
		$this.el.dialog_warning.html('<p>You are about to reset the form. All your data will be deleted.</p> <p>Do you wish to continue?<p>')
		$this.el.dialog_warning.dialog({
			dialogClass: "no-close",
			autoOpen: true, 
			modal: false, 
			buttons: { 
				"Continue": function() { 
					window.location.reload(); 
					$this.el.dialog_warning.dialog('close'); 
				}, 
				
				"Cancel": function() { 
					$this.el.dialog_warning.dialog('close');
				}
			}
		}); 
	},
	switchTabs:function(active) { 
		var $this = this;
		var policyholder = active.attr('data-policyholder'); 
		var name = active.text();  
		
		$this.el.policyholders.children().removeClass('active'); 
			
		if(policyholder == 'add') { 
			$this.policyholders.dependents++; 
			
			$this.el.policyholder_name.val('Dependent Name');  
			$this.el.dialog_policyholder.dialog('open'); 
			 
		} else { 
			active.addClass('active'); 
			$('h3 span').html(name);
			$this.el.policyholder.val(policyholder); 
			$this.loadForm();
		}
		
		
	},
	setPolicyholders:function() { 
		var $this = this; 
		var coveragelevel = $this.el.coveragelevel.val(),
		limit = 0, 
		prevLimit = $this.policyholders.limit; 
	 	
	 	//check if coveragelevel is set
	 	if(coveragelevel) { 
	 		//determine dependent limit
	 		switch(coveragelevel) { 
	 			case 'employee': 
	 				limit = 0;
	 				break;  
	 				
	 			case 'employee_plus_one': 
	 				limit = 1; 
	 				break; 
	 				
	 			case 'employee_plus_family': 
	 				limit = $this.dependent_limit;
	 				break; 
	 		}	
	 		
	 		if(limit > $this.policyholders.dependents) {
				if($this.el.add) { 
					$this.el.add.show(); 
				} else {  
					$this.el.policyholders.append('<li id="add" data-policyholder="add">+</li>'); 
					$this.el.add = $('#add');
				}
			} else { 
				if($this.policyholders.dependents > limit) { 
					$this.el.dialog_warning.html('<p>You have too many dependents for the plan selected. All extra dependents will be deleted.</p> <p>Do you wish to continue?<p>')
					$this.el.dialog_warning.dialog({
						dialogClass: "no-close",
						autoOpen: true, 
						modal: false, 
						buttons: { 
							"Continue": function() { 
								while($this.policyholders.dependents > limit) { 
									delete $this.policyholders['dependent'+$this.policyholders.dependents]; 
									$('#'+'dependent'+$this.policyholders.dependents).remove();
									$this.policyholders.dependents--; 
								}
								
								if($this.el.add) { 
									$this.el.add.hide();
								}
								
								$this.policyholders.limit = limit; 
								$this.coveragelevel = coveragelevel;
								
								$this.switchTabs($('#employee')); 
								$this.loadForm();
								$this.el.dialog_warning.dialog('close'); 
								
								
							}, 
							
							"Cancel": function() { 
								$this.policyholders.limit = prevLimit; 
								$this.coveragelevel = $this.prevCoveragelevel; 
								$this.switchTabs($('#employee')); 
								$this.el.dialog_warning.dialog('close');
							}
						}
					}); 
					
					return false;
				} else {
					if($this.el.add) { 
						$this.el.add.hide();
					}
				}				
			}
			
			$this.policyholders.limit = limit; 
			$this.coveragelevel = $this.prevCoveragelevel = coveragelevel;
			
	 		
	 		if(!$this.policyholders.employee) { 
				$this.el.dialog_policyholder.dialog('open'); 
	 		} else { 
	 			$this.loadForm();
	 		}
	 		
	 	} 
	 	
	 	return false; 
	},
	addPolicyholder:function() {
		var $this = this;
		var policyholder = $this.el.policyholder_name.val();
		
		//checking if dependent or employee 
		if($this.policyholders.employee) { 
										
			//creating policyholder instance
			$this.policyholders['dependent'+$this.policyholders.dependents] = new $this.Policyholder(policyholder);
			
			//creating policyholder tab
			$this.el.add.before('<li id="dependent'+$this.policyholders.dependents+'" data-policyholder="dependent'+$this.policyholders.dependents+'" class="active">'+ $this.policyholders['dependent'+$this.policyholders.dependents].name +'</li>'); 
		
			//setting as active
			$('h3 span').html($this.policyholders['dependent'+$this.policyholders.dependents].name);
			$this.el.policyholder.val('dependent'+$this.policyholders.dependents);
			
			
		} else { 
			$this.policyholders['employee'] = new $this.Policyholder(policyholder);
			
			//creating policyholder tab
			$this.el.policyholders.prepend('<li id="employee" data-policyholder="employee" class="active">'+ $this.policyholders['employee'].name +'</li>'); 
		
			//setting as active
			$('h3 span').html($this.policyholders['employee'].name);
			$this.el.policyholder.val('employee');
			
		}
						
		if($this.policyholders.dependents == $this.policyholders.limit && $this.el.add) { 
			$this.el.add.hide();
		} 	
		
		$this.loadForm();
		$this.el.dialog_policyholder.dialog('close');
	},
	init:function() { 
		var $this = this; 
		
		//getting DOM elements
		$this.el = {
			banner: $('#banner'),
			start: $('#start'),
			form: $('#hpc'), 
			demographics: $('#demographics'), 
			summary: $('#summary'), 
			next:$('#next'),
			reset:$('#reset'),
			coveragelevel: $('#coveragelevel'),
			effectivedate: $('#effectivedate'),
			policyholders:$('#policyholders'),
			policyholder: $('#policyholder'),
			add:null, 
			comparisons:$('#comparisons'),
			expenses: $('#expenses'),
			physician: $('#physician'),
			specialist: $('#specialist'),
			xray: $('#xray'),
			urgent: $('#urgent'),
			outpatient: $('#outpatient'),
			hospitalization: $('#hospitalization'),
			er: $('#er'), 
			maternity: $('#maternity'),
			maternityselect: $('#maternity-select'),
			other: $('#other'),
			med_total: $('#med_total'),
			rx_generic: $('#rx_generic'),
			rx_formulary: $('#rx_formulary'),
			rx_nonformulary: $('#rx_nonformulary'),
			rx_total: $('#rx_total'),
			dialog_policyholder:$('#dialog_policyholder'), 
			policyholder_name:$('#policyholder_name'), 
			dialog_warning:$('#dialog_warning')
		}
				
		//Setting Cost Values
		$.each($this.costs, function(key, value) { 
            if(key.indexOf('maternity') == -1) { 
				$(".cost", $this.el[key]).html($this.numToDollar(value));
			} else {
				$this.el.maternityselect.html('<option value="0">-- none --</option><option value="'+$this.costs.maternity_normal+'">Normal Birth - Includes Hospital ('+$this.numToDollar($this.costs.maternity_normal)+')</option><option value="'+$this.costs.maternity_csection+'">C-Section - Includes Hospital ('+$this.numToDollar($this.costs.maternity_csection)+')</option>'); 
			}
		});
		
		
		/*Initializing listeners */
		
		//Next button action
		$this.el.next.on('click', function(e) {
			e.preventDefault();
			$this.setPolicyholders(); 
			//$this.el.comparisons.animate({'height':'150px'});
			//$this.el.banner.fadeOut();
			//$this.loadForm(); 
		}); 
		
		//Reset button action
		$this.el.reset.on('click', function(e) {
			e.preventDefault();
			$this.reset();
		}); 
		
		//Edit button action
		$this.el.summary.on('click', '.edit', function(e) { 
			e.preventDefault(); 
			$this.el.demographics.slideDown(); 
			$this.el.summary.hide();
		}); 
		
		
		//Tabs Action
		$this.el.policyholders.on('click', 'li, li a', function(e) {
			e.preventDefault(); 
			$this.switchTabs($(this));
		}); 

		//creating dialogs 
		$this.el.dialog_policyholder.dialog({
			dialogClass: "no-close",
			autoOpen: false, 
			modal: false, 
			buttons: { 
				"Add": function() { 
					$this.addPolicyholder();
				}
			}, 
			close: function() { 
				//$this.addPolicyholder();
			}
		}); 

		
		$this.el.form.on('blur change', ':input', function() { 
			var input = $(this); 
			var type = input.data('type'), 
			qty = input.val(), 
			policyholder = $this.el.policyholder.val();
			
			switch(type) { 
				case 'maternity': 
					if(isNaN(qty) || qty == null) {
						$this.policyholders[policyholder].qty[type] = parseInt(0); 
						$this.policyholders[policyholder].total[type] = parseInt(0);
					
						$(".total .green", $this.el[type]).html($this.numToDollar(0)); 
					} else { 
						$this.policyholders[policyholder].qty[type] = parseInt(qty); 
						$this.policyholders[policyholder].total[type] = parseInt(qty);
					
						$(".total .green", $this.el[type]).html($this.numToDollar($this.policyholders[policyholder].total[type])); 
					}
					
					break;
				
				case 'coveragelevel': 
					//do nothing
					break;	
					
				case 'effectivedate':
					$this.effectivedate = qty; 			
					break; 
					
				case 'other': 
					//store quality to policyholder
					$this.policyholders[policyholder].qty[type] = $this.strToNum(qty); 
					
					//compute total 
					$this.policyholders[policyholder].total[type] = $this.strToNum(qty); 
					$(".total .green", $this.el[type]).html($this.numToDollar($this.policyholders[policyholder].total[type]));
					 
					break;
				default: 
					if(qty.length > 0) { 
						qty = parseInt(qty);
						
						//checking for valid input 
						if(isNaN(qty) || qty < 0) { 
							input.parent().addClass('ui-state-invalid'); 
						} else {  
							input.parent().removeClass('ui-state-invalid'); 
							
							//store quality to policyholder
							$this.policyholders[policyholder].qty[type] = qty; 
							
							//compute total 
							$this.policyholders[policyholder].total[type] = $this.costs[type] * qty;
							$(".total .green", $this.el[type]).html($this.numToDollar($this.policyholders[policyholder].total[type])); 
						}
					} else { 
						input.parent().removeClass('ui-state-invalid');
						input.val(0); 
					}
			}
		
			if($this.effectivedate && $this.coveragelevel && $this.policyholders.employee) { 
				$this.setTotalExpenses(policyholder);
				$(".total .green", $this.el.med_total).html($this.numToDollar($this.policyholders[policyholder].total.med_total));
				$(".total .green", $this.el.rx_total).html($this.numToDollar($this.policyholders[policyholder].total.rx_total));
				$this.getComparison();
			}
		}); 
		
		$this.el.form.on('focus', ':input', function() { 
			var input = $(this); 
			var val = input.val(), 
			type = input.data('type')
			
			
			if(type == 'effectivedate' || type == 'coveragelevel') { 
				$this[type] = null;  
			} else  { 
				if(val == 0) { 
					input.val(''); 
				}
			}
		}); 
		
		$this.el.effectivedate.datepicker(); 
		
		$('body').tooltip(({ position: { my: "left-70 bottom-15", at: "left top", collision: "fit" } }));
		
	}
}

$(document).ready(function() {
	hpc.init(); 
}); 