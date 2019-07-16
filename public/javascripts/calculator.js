var eventTipPercentage = 25;
var numberOfServers = 1;
var doTipFoodRunner = true;
var doTipBartender = true;
var barTipPercentage = 0.02;  //make it changable by user
var foodRunnerTipPercentage = 0.02; //make it changable by user
var 	totalSalesPerPerson, 
		totalAutoGratPerPerson, 
		totalTipsPerPerson, 
		totalTipsToBartenderPerPerson,
        reportedTipsPerPerson, 
		totalTipToFoodRunnerPerPerson,
		eventAutoGratPerPerson,
		autoGrat20PerPerson;
		
var pageCounter = 1;

document.getElementById("backButton").disabled = true;

var checks = []; //creating an array to store Check objects

var firstCheck = {
	
	netSales : 0,
	
	 autoGrat : 0,
	
	 eventAutoGrat : 0,
	
	 chargeTip : 0,
	
	 liquor : 0,
	
	 beer : 0,
	
	 wine : 0,
	
	 food : 0,
	
}

checks.push(firstCheck);


//drop down menu of percentage for event tips
function eventTipSelector() {
	
	var a = document.getElementById("eventTipPercentage").value;
	var b = document.getElementById("eventTipConfirm");
	if(isNaN(a)) {b.innerHTML = "Nothing selected yet"}
	else {
	eventTipPercentage = parseInt(a);
	b.innerHTML = "Event tip percentage will be considered to be " + eventTipPercentage +"%";
	}
}

//drop down menu of number of servers
function numberOfServersSelector() {
	var a = document.getElementById("numberOfServers").value;
	var b = document.getElementById("numberOfServersConfirm");
	if (isNaN(a)) {b.innerHTML = "Nothing selecteed yet"}
	else {
	  numberOfServers = parseInt(a);
	  b.innerHTML = "All the tips will be devided for " + numberOfServers + " servers";
	}
}


//radio selector if the foodrunner is present. 
//Returns boolean
function foodRunnerSelector() {
  
  if (document.getElementById("foodRunnerYes").checked == true) {
	doTipFoodRunner = true;
	document.getElementById("foodRunnerConfirm").innerHTML = "Food Runner will be tipped out";}
  else { 
	doTipFoodRunner = false;
	document.getElementById("foodRunnerConfirm").innerHTML = "No tip out for Food Runner";  
  }
  return doTipFoodRunner
}

function bartenderSelector () {
	
	 if (document.getElementById("bartenderSwitch").checked == true) {
	doTipBartender = true;
	document.getElementById("bartenderConfirm").innerHTML = "Bartender will be tipped out";}
  else { 
	doTipBartender = false;
	document.getElementById("bartenderConfirm").innerHTML = "No tip out for Bartenders";  
  }
  return doTipBartender
	
}

//Display checks counter
function displayPage(page) {
	document.getElementById("checkNumber").innerHTML = page;
}

//sets pageCounter to 1 and clears all fields
function resetForm() {
	pageCounter = 1;
	displayPage(pageCounter);
	clearFields();
}

//populate fields with checks[]
function displayCheck(x) {
	
	if (checks[x].netSales != 0) {document.getElementById("net-sales").value = checks[x].netSales}
	
	if (checks[x].autoGrat != 0) {document.getElementById("20-auto-grat").value = checks[x].autoGrat}
	
	if (checks[x].eventAutoGrat != 0) {document.getElementById("event-auto-grat").value = checks[x].eventAutoGrat}
	
	if (checks[x].chargeTip != 0) {document.getElementById("charge-tip").value = checks[x].chargeTip}
	
	if (checks[x].liquor != 0) {document.getElementById("liquor").value = checks[x].liquor}
	
	if (checks[x].beer != 0) {document.getElementById("beer").value = checks[x].beer}
	
	if (checks[x].wine != 0) {document.getElementById("wine").value = checks[x].wine}
	
	if (checks[x].food != 0) {document.getElementById("food").value = checks[x].food}
	
	
	
}


function next() {
	
	document.getElementById("backButton").disabled = false;
	
	pageCounter++;
	displayPage(pageCounter);
	clearFields();
	
	if (pageCounter > checks.length) {
		
		var zeroCheck = {
			
			netSales : 0,
			
			 autoGrat : 0,
			
			 eventAutoGrat : 0,
			
			 chargeTip : 0,
			
			 liquor : 0,
			
			 beer : 0,
			
			 wine : 0,
			
			 food : 0,
				
		}

		checks.push(zeroCheck);
	}
	
	
	try {
		displayCheck(pageCounter - 1);
	}
	catch(err) {
		
		throw "nothing at checks[" + (pageCounter-1) +"]"
		
	}
	
	
	
	
}



function back () {
	
	
	pageCounter--;
	if (pageCounter == 1) {
		document.getElementById("backButton").disabled = true;
	}
	if (pageCounter > 1) {
		
		
	}
	clearFields();
	displayCheck(pageCounter - 1);
	
	displayPage(pageCounter);
	
	
}


function modifyValueNS() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newNetSales = parseFloat(document.getElementById("net-sales").value);
	
	if (document.getElementById("net-sales").value !== "" &&
		checks[pageCounter - 1].netSales !== newNetSales) 
		
			{checks[pageCounter - 1].netSales = newNetSales;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("net-sales").value == "") 
		{checks[pageCounter - 1].netSales = 0;	}
}

function modifyValue20AG() {
	
	//if value entered to the field not empty and not the same as before then update value
	var new20AutoGrat = parseFloat(document.getElementById("20-auto-grat").value);
	
	if (document.getElementById("20-auto-grat").value !== "" &&
		checks[pageCounter - 1].autoGrat !== new20AutoGrat) 
		
			{checks[pageCounter - 1].autoGrat = new20AutoGrat;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("20-auto-grat").value == "") 
		{checks[pageCounter - 1].autoGrat = 0;	}
}

function modifyValueEG() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newEventGrat = parseFloat(document.getElementById("event-auto-grat").value);
	
	if (document.getElementById("event-auto-grat").value !== "" &&
		checks[pageCounter - 1].eventAutoGrat !== newEventGrat) 
		
			{checks[pageCounter - 1].eventAutoGrat = newEventGrat;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("event-auto-grat").value == "") 
		{checks[pageCounter - 1].eventAutoGrat = 0;	}
}

function modifyValueCT() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newChargeTip = parseFloat(document.getElementById("charge-tip").value);
	
	if (document.getElementById("charge-tip").value !== "" &&
		checks[pageCounter - 1].chargeTip !== newChargeTip) 
		
			{checks[pageCounter - 1].chargeTip = newChargeTip;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("charge-tip").value == "") 
		{checks[pageCounter - 1].chargeTip = 0;	}
}

function modifyValueLiq() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newLiqour = parseFloat(document.getElementById("liquor").value);
	
	if (document.getElementById("liquor").value !== "" &&
		checks[pageCounter - 1].liquor !== newLiqour) 
		
			{checks[pageCounter - 1].liquor = newLiqour;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("liquor").value == "") 
		{checks[pageCounter - 1].liquor = 0;	}
}

function modifyValueBeer() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newBeer = parseFloat(document.getElementById("beer").value);
	
	if (document.getElementById("beer").value !== "" &&
		checks[pageCounter - 1].beer !== newBeer) 
		
			{checks[pageCounter - 1].beer = newBeer;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("beer").value == "") 
		{checks[pageCounter - 1].beer = 0;	}
}

function modifyValueWine() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newWine = parseFloat(document.getElementById("wine").value);
	
	if (document.getElementById("wine").value !== "" &&
		checks[pageCounter - 1].wine !== newWine) 
		
			{checks[pageCounter - 1].wine = newWine;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("wine").value == "") 
		{checks[pageCounter - 1].wine = 0;	}
}

function modifyValueFood() {
	
	//if value entered to the field not empty and not the same as before then update value
	var newFood = parseFloat(document.getElementById("food").value);
	
	if (document.getElementById("food").value !== "" &&
		checks[pageCounter - 1].food !== newFood) 
		
			{checks[pageCounter - 1].food = newFood;	} 
	
	//if the field left empty then change stored value to zero
	else if (document.getElementById("food").value == "") 
		{checks[pageCounter - 1].food = 0;	}
}

function createEmployeesReport () {
	
	totalSalesPerPerson = 0;
	for (var i = 0; i < checks.length; i++) {
            totalSalesPerPerson += checks[i].netSales / numberOfServers;
        }
		
	autoGrat20PerPerson = 0;
	for (var i = 0; i < checks.length; i++) {
			autoGrat20PerPerson +=checks[i].autoGrat / numberOfServers;
		}
		
	eventAutoGratPerPerson = 0;
	for (var i = 0; i < checks.length; i++) {
			eventAutoGratPerPerson +=checks[i].eventAutoGrat / eventTipPercentage * 20 / numberOfServers;
		}
		
	totalTipsPerPerson = 0;
	for (var i = 0; i < checks.length; i++) {
			totalTipsPerPerson +=checks[i].chargeTip / numberOfServers;
		}
		
	totalTipsToBartenderPerPerson = 0;
	if(doTipBartender){
		for (var i = 0; i < checks.length; i++) {
				totalTipsToBartenderPerPerson+= (checks[i].liquor + checks[i].beer + checks[i].wine) * barTipPercentage / numberOfServers;
		}
	}
	
	totalTipToFoodRunnerPerPerson = 0;
	if(doTipFoodRunner) {
		for (var i = 0; i < checks.length; i++) {
			totalTipToFoodRunnerPerPerson += checks[i].food * foodRunnerTipPercentage / numberOfServers;
		}
	}
	
	totalAutoGratPerPerson = autoGrat20PerPerson + eventAutoGratPerPerson;
	
	reportedTipsPerPerson = 0;
	reportedTipsPerPerson = totalTipsPerPerson - totalTipsToBartenderPerPerson - totalTipToFoodRunnerPerPerson;
	var takeHome = totalAutoGratPerPerson + reportedTipsPerPerson;
	

	let employeesReport = {
		reportInAString: "Total Sales: " + totalSalesPerPerson.toFixed(2) +
		"<br> Total Auto Grats(code 28): " + totalAutoGratPerPerson.toFixed(2) +
		"<br> Total Tips: " + totalTipsPerPerson.toFixed(2) +
		"<br> Tips to Bartender: " + totalTipsToBartenderPerPerson.toFixed(2) +
		"<br> Tips to Food Runner: " + totalTipToFoodRunnerPerPerson.toFixed(2) +
		"<br> Reported Tips(code 78): " + reportedTipsPerPerson.toFixed(2) + 
		"<br> <br> <i>For Your info, take home tips: </i>" + takeHome.toFixed(2),

		totalSales: totalSalesPerPerson.toFixed(2),
		totalAutoGrats: totalAutoGratPerPerson.toFixed(2),
		totalTips: totalTipsPerPerson.toFixed(2),
		tipsToBartender: totalTipsToBartenderPerPerson.toFixed(2),
		tipsToFoodRunner: totalTipToFoodRunnerPerPerson.toFixed(2),
		reportedTips: reportedTipsPerPerson.toFixed(2),
		takeHome: takeHome.toFixed(2)
	}

	return employeesReport
			
}

function createManagersReport () {
	
	var totalTipsToBartender = totalTipsToBartenderPerPerson * numberOfServers;
	
	var totalTipsToFoodRunner = totalTipToFoodRunnerPerPerson * numberOfServers;
	
	let managersReport = {
		reportInAString: "Total Sales: " + totalSalesPerPerson.toFixed(2) +
		"<br> Total Auto Grats(code 28): " + totalAutoGratPerPerson.toFixed(2) +
		"<br> Total Tips: " + totalTipsPerPerson.toFixed(2) +
		"<br> Tips to Bartender: " + totalTipsToBartender.toFixed(2) +
		"<br> Tips to Food Runner: " + totalTipsToFoodRunner.toFixed(2) +
		"<br> Reported Tips(code 78): " + reportedTipsPerPerson.toFixed(2),

		
		totalSales: totalSalesPerPerson.toFixed(2),
		totalAutoGrats: totalAutoGratPerPerson.toFixed(2),
		totalTips: totalTipsPerPerson.toFixed(2),
		tipsToBartender: totalTipsToBartender.toFixed(2),
		tipsToFoodRunner: totalTipsToFoodRunner.toFixed(2),
		ReportedTips: reportedTipsPerPerson.toFixed(2),

	}

	return managersReport
}

function reports() {
	
	//in case the report was calculated for one person we clear fields for possible next check and increment pageCounter 
	if (pageCounter == 1) {
		
		clearFields();
		pageCounter++;
		displayPage(pageCounter);
		
	}
	
	document.getElementById("demo").innerHTML = "<strong>Report for the Servers: </strong> <br>" + createEmployeesReport().reportInAString + 
												"<br> <p><strong>Report for the Manager: </strong><br>" + createManagersReport().reportInAString + "</p>";
	
	let report = {
	 employeesReport:createEmployeesReport(),
	 managersReport: createManagersReport()

	}
	return report
}

//set all fields to empty
function clearFields () {
	document.getElementById("net-sales").value = "";
	document.getElementById("20-auto-grat").value = "";
	document.getElementById("event-auto-grat").value = "";
	document.getElementById("charge-tip").value = "";
	document.getElementById("liquor").value = "";
	document.getElementById("beer").value = "";
	document.getElementById("wine").value = "";
	document.getElementById("food").value = "";
}




//checking if all the fields are empty
function allFieldsAreEmpty() {
	
	if (
	document.getElementById("net-sales").value == "" && 
	document.getElementById("20-auto-grat").value == "" &&
	document.getElementById("event-auto-grat").value == "" &&
	document.getElementById("charge-tip").value == "" &&
	document.getElementById("liquor").value == "" &&
	document.getElementById("beer").value == "" &&
	document.getElementById("wine").value == "" &&
	document.getElementById("food").value == "" 
	){
		return true
	} else {
		return false
	}
	
}






