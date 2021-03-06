<!DOCTYPE html>
<!--[if lt IE 7]> <html class="ie6" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="ie8" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="ie9" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>Health Plan Calculator</title>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/cupertino/jquery-ui.css">
	<link rel="stylesheet" href="css/screen.css">
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<?php if(getenv('REMOTE_ADDR') == '127.0.0.1') {  ?>
		<script src="preprocess/js/calculations.js"></script>
	<?php } else { ?> 
		<script src="js/calculations.min.js"></script>
	<?php }?>
	
	
	<!--[if lt IE 9]>
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <script src="js/ie.min.js"></script>
        <link rel="stylesheet" href="css/ie.css">
    <![endif]-->
</head>
<body>
	
	<!--<nav> 
		<ul class="list-inline"> 
			<li><a href="#">Start Here</a></li>
			<li><a href="#">Medical Expenses</a></li> 
			<li><a href="#">Prescription Expenses</a></li>
			<li><a href="#">Comparisons</a></li>
		</ul> 
	</nav>-->
	<section>
		<form id="hpc">  
			<article id="start" class="start"> 
				<header id="banner" class="page-header">
					<div class="row brand-row clearfix">
						<h1 class="logo">
							<a href="/">
								<img src="//www.mutualofomaha.com/images/logos/corp/mutual-white.png">
								<span>
									Mutual of Omaha Insurance Company
								</span>
							</a>
						</h1>
					</div>			
				</header>
				<fieldset id="demographics"> 
					<h1>Health Plan Calculator</h1>
					<p>This worksheet allows you to enter estimated eligible medical expenses for you and/or your dependents.  Doing this exercise will help you determine the best medical plan option for yourself and any dependents.  It also provides you with an estimated Health Care Flexible Spending Account (FSA) contribution, based upon the out-of-pocket health care expenses you anticipate for yourself and/or dependents. </p>
					
	
					<div class="input-container"> 
						<lable for="coverage-level"> 
							Coverage Level:&nbsp;
						</label> 
						<select id="coveragelevel" name="coveragelevel" data-type="coveragelevel">
							<option value="">Select Coverage Level</option> 
							<option value="employee">Employee Only</option> 
							<option value="employee_plus_one">Employee + One</option> 
							<option value="employee_plus_family">Employee + Family</option> 
						</select> 
					</div>
				
			
					<div class="input-container"> 
						<lable for="effective-date"> 
							Benefits Effective Date:
						</label> 
						<input type="text" name="effectivedate" id="effectivedate" data-type="effectivedate" class="date">
					</div>	
					
					<button id="next" class="btn btn-primary">Next Step</button>&nbsp;&nbsp;<a id="reset" href="#">Reset</a>
				</fieldset> 
				<fieldset id="summary" class="summary"> 
				
				</fieldset> 
				<fieldset>
					<ul id="policyholders" class="list-inline policyholders"> 
					</ul>
					<input type="hidden" id="policyholder" value="employee">
				</fieldset> 
			</article>
			
			<article id="expenses"> 
					<fieldset> 
						<div class="input-header"> 
							<div class="input-container"> 
								<h3>Medical Expenses for <span>Employee</span></h3> 
							
								<p>Provides estimated annual visits for the following services.</p>
							</div>
						</div>
					</fieldset>
					
					<fieldset> 
						<div class="input-thead"> 
							<div class="input-container">
								<p class="col">Services</p>
								<p class="col">Annual # of Visits</p> 
								<p class="col text-right">Total Annual Cost</p>  
							</div> 
						</div> 
					</fieldset>
					<fieldset> 
						<div id="physician" class="input-group">
							<div class="input-container">  
								<label class="col" for="coverage-level"> 
									<strong>Physician Office Visit</strong><br> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="physician"></p>
								<p class="total col text-right"><strong class="green"></strong></p>
							</div>
							
						</div>
						
						<div id="specialist" class="input-group">
							<div class="input-container">
								
								<label class="col" for="coverage-level"> 
									<strong>Specialist Office Visit</strong><br> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="specialist"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>  
							</div>
						</div>
						
						<div id="xray" class="input-group"> 
							
							<div class="input-container"> 
								<label class="col" for="coverage-level"> 
									<strong>X-ray/Lab Visit</strong><br> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="xray"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
						
						<div id="urgent" class="input-group"> 
							
							<div class="input-container"> 
								<label class="col" for="coverage-level"> 
									<strong>Urgent Care</strong><br> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="urgent"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
						
						<div id="outpatient" class="input-group"> 
							
							<div class="input-container"> 
								<label class="col" for="coverage-level"> 
									<strong>Outpatient Surgical Services</strong><br> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="outpatient"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
						
						<div id="hospitalization" class="input-group"> 
							
							<div class="input-container"> 
								<label class="col" for="coverage-level"> 
									<strong>Hospitalization <small>(approx. 3 day stay)<br></small></strong> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="hospitalization"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
						
						<div id="er" class="input-group"> 
							
							<div class="input-container"> 
								<label class="col" for="coverage-level"> 
									<strong>ER Visits</strong><br> <small>(<span class="cost"></span> each)</small>
								</label> 
								<p class="col"><input type="text" data-type="er"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
						
						<div id="maternity" class="input-group"> 
							
							<div class="input-container"> 
								<label class="col" for="coverage-level"> 
									<strong>Maternity</strong> 
								</label>
								<p class="col"><select id="maternity-select" data-type="maternity"> 
									<option value="0">-- none --</option> 
								</select></p>
								<p class="col total text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
						
						<div id="other" class="input-group"> 
							
							<div class="input-container"> 
								
								<label class="col" for="coverage-level"> 
									<strong>Other Medical Expense</strong><br>
									<small>(Enter dollar amount)</small>
								</label>
								<p class="col"><input type="text" data-type="other"></p>
								<p class="total col text-right"><strong class="green">$0</strong></p>
							</div>
						</div>
	
				</fieldset> 
				<fieldset> 
					<div id="med_total" class="input-thead"> 
						<div class="input-container">
							<p class="col"></p>
							<p class="col"><strong>Total Medical Expenses</strong></p> 
							<p class="total col text-right"><strong class="green">$0</strong></p>  
						</div> 
					</div> 
				</fieldset>
					
				<fieldset> 
					<div class="input-header"> 
						<div class="input-container">
							<h3>Prescription Expenses for <span>Employee</span></h3> 
							<p>Provides estimated monthly number of Retail Prescriptions.</p> 
						</div>
					</div>
				</fieldset>
				<fieldset> 
					<div class="input-thead"> 
						<div class="input-container">
							<p class="col">Services</p>
							<p class="col">Monthly # of Prescriptions</p> 
							<p class="col text-right">Total Monthly Cost</p>  
						</div> 
					</div> 
				</fieldset>
				
				<fieldset> 
					<div id="rx_generic" class="input-group"> 
						<div class="input-container"> 
							<label class="col" for="coverage-level"> 
								<strong>Generic Prescription</strong><br> <small>(<span class="cost"></span> each)</small> 
							</label>
							<p class="col"><input type="text" data-type="rx_generic"></p>
							<p class="total col text-right"><strong class="green">$0</strong></p>
						</div>
					</div>	
					
					<div id="rx_formulary" class="input-group"> 
						
						<div class="input-container"> 
							<label class="col" for="coverage-level"> 
								<strong>Formulary Prescription</strong><br> <small>(<span class="cost"></span> each)</small>
							</label> 
							<p class="col"><input type="text" data-type="rx_formulary"></p>
							<p class="total col text-right"><strong class="green">$0</strong></p>
						</div>
					</div>
					
					<div id="rx_nonformulary" class="input-group"> 
						
						<div class="input-container"> 
							<label class="col" for="coverage-level"> 
								<strong>NonFormulary Prescription</strong><br> <small>(<span class="cost"></span> each)</small> 
							</label>
							<p class="col"><input type="text" data-type="rx_nonformulary"></p>
							<p class="total col text-right"><strong class="green">$0</strong></p>
						</div>
					</div>
				</fieldset>
				<fieldset> 
					<div id="rx_total" class="input-thead"> 
						<div class="input-container">
							<p class="col"></p>
							<p class="col"><strong>Total Prescription Expenses</strong></p> 
							<p class="total col text-right"><strong class="green">$0</strong></p>  
						</div> 
					</div> 
				</fieldset>
			</article> 
		</form>
	</section> 
	
	<footer id="comparisons" class="fixed-bottom">
		<div class="row clearfix"> 
			<div class="input-group"> 
				<div class="input-container"> 
					<table>
						<thead>
							<tr>
								<th>Medical Plan</th>
								<th>Premium/Pay Period</th> 
								<th title="Amount of medical deductible incurred."><span class="ui-icon ui-icon-info" style="float: right" ></span>Medical Deductible</th> 
								<th>Copayment(s)</th>
								<th style="width: 103px;" title="Coinsurance amount shown is calculated based on total medical expenses entered and is prior to considering the stop loss limit."><span class="ui-icon ui-icon-info" style="float: right" ></span>Coinsurance</th> 
								<th>RX Deductible</th>
								<th>RX Copay</th>
								<th>Total<br> <small>(including premiums)</small></th> 
								<th title="Do not forget to add any vision or dental expenses to your Health Care Flexible Spending Account contribution."><span class="ui-icon ui-icon-info" style="float: right" ></span>HC FSA Contribution</th>
							</tr> 
						</thead> 
						<tbody> 
						</tbody> 
					</table> 
				</div>
			</div>
		</div>	
	</footer> 
	
	<div id="dialog_policyholder" title="Add Dependent">
		<input id="policyholder_name" type="text" value="Employee" style="width: 90%; text-align: left;"> 
	</div> 
	
	<div id="dialog_warning" title="Warning!">
	</div> 
</body>
</html>
