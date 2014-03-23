//For JSON file
function getyymmdd () {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var out;
	if (month < 10) {
		month = '0' + month;
	};
	if (day < 10) {
		day = '0' + day;
	};
	out = "" + year + month + day;
	return out;
}

//For music
function getmmdd () {
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var out;
	if (month < 10) {
		month = '0' + month;
	};
	if (day < 10) {
		day = '0' + day;
	};
	out = month + day;
	return out;
}

function getyear () {
	var d = new Date();
	var year = d.getFullYear();
	return year;
}

function getmonth () {
	var d = new Date();
	var month = new Array(12);
	month[0]="JAN";
	month[1]="FEB";
	month[2]="MAR";
	month[3]="APR";
	month[4]="MAY";
	month[5]="JUN";
	month[6]="JUL";
	month[7]="AUG";
	month[8]="SEP";
	month[9]="OCR";
	month[10]="NOV";
	month[11]="DEC";
	return month[d.getMonth()];
}

function getweekday (){
	var d = new Date();
	var weekday = new Array(7);
	weekday[0] = "SUNDAY";
	weekday[1] = "MONDAY";
	weekday[2] = "TUESDAY";
	weekday[3] = "WEDNESDAY";
	weekday[4] = "THURSDAY";
	weekday[5] = "FRIDAY";
	weekday[6] = "SATURDAY";
	return weekday[d.getDay()];
}

function getday (){
	var d = new Date();
	var day = d.getDate();
	if (day < 10) {
		day = "0" + day;
	};
	return "" + day;
}