//Load Environment
var nodegrass = require('nodegrass');
var moment = require("moment");
var gui = require('nw.gui');
var win = gui.Window.get();
var fs = require('fs');

//Initialize Start

//Received JSON info storage
var recvjsondata = "";

//Received Music info storage
var recvmusicdata = "";

//Info Date
var pulldate = "";
var imgdate = "";

//Processed info storage
var pic = "";
var text_short = "";
var color_back = "";
var bigpicurl2x = "";
var mawae = "";
var musicurl = "";
var musicname = "";
var musicartist = "";
var nitingcode = "";

//Date Type
var dateType = "";

//Unresizeable
win.setResizable(0);

//Initialize End

//Date Function Start

function getDate (dateType) {
	var month = moment().get('month') + 1;
	var day = moment().get('date');
	var out;
	if (month < 10) {
		month = '0' + month;
	};
	if (day < 10) {
		day = '0' + day;
	};
	switch (dateType) {
		case "json" :
			out = moment().get('year') + "/" + month + "/" + day;
			return out;
			break;
		case "image" :
			out = '' + moment().get('year') + month + day;
			return out;
			break;
		default :
			console.log("Error:Date Argument Not Found!");
			break;
	}
}

function getjsonDate () {
	dateType = "json";
	out = getDate(dateType);
	return out;
	dataType = "";
}

function getimgDate () {
	dateType = "image";
	out = getDate(dateType);
	return out;
	dataType = "";
}

function getmonth () {
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
	month[9]="OCT";
	month[10]="NOV";
	month[11]="DEC";
	return month[moment().get('month')];
}

function getweekday (){
	var weekday = new Array(7);
	weekday[0] = "SUNDAY";
	weekday[1] = "MONDAY";
	weekday[2] = "TUESDAY";
	weekday[3] = "WEDNESDAY";
	weekday[4] = "THURSDAY";
	weekday[5] = "FRIDAY";
	weekday[6] = "SATURDAY";
	return weekday[moment().get('day')];
}

function getday (){
	var day = moment().get('date');
	if (day < 10) {
		day = "0" + day;
	};
	return "" + day;
}

//Date Function End

function getinfo() {
	nodegrass.get("http://nichijou.in/LastDay/" + pulldate + ".json", function(data){
		recvjsondata = data;
		recvjsondata = JSON.parse(recvjsondata);
		pic = recvjsondata[imgdate]["images"]["big568h2x"].replace("{img}","http://nextday-pic.b0.upaiyun.com");
		if (recvjsondata[imgdate]["geo"]) {
			geo = recvjsondata[imgdate]["geo"]["reverse"];
		} else {
			var pattgeo = new RegExp("^[^.]+", "g");
			var str = recvjsondata[imgdate]["text"]["comment2"];
			geo = pattgeo.exec(str);
		};
		geo = geo.replace(",", ", ");
		if (recvjsondata[imgdate]["text"]["short"]) {
			text_short = recvjsondata[imgdate]["text"]["short"].replace(/,/g, ", ");
		} else {
			var pattshort = new RegExp("[^.]+$", "g");
			var str = recvjsondata[imgdate]["text"]["comment2"];
			text_short = recvjsondata[imgdate]["text"]["comment1"] + "," + pattshort.exec(str);
			text_short = text_short.replace(/,/g, ", ");
		};
		color_back = recvjsondata[imgdate]["colors"]["background"];
		if (recvjsondata[imgdate]["music"]) {
			if (recvjsondata[imgdate]["music"]["url"]) {
				musicurl = recvjsondata[imgdate]["music"]["url"].replace("{music}","http://nextday-file.b0.upaiyun.com/");
				$("#todaymusic").attr("src", musicurl);
			} else {
				nitingcode = recvjsondata[imgdate]["music"]["nitingCode"];
				nodegrass.get("http://www.niting.com/iphone.do?method=getMusicUrlByCode&musiccode=" + nitingcode ,function(data){
					recvmusicdata = data;
					recvmusicdata = JSON.parse(recvmusicdata);
					musicurl = recvmusicdata["object"]["dc_musicurl"];
					$("#todaymusic").attr("src", musicurl);
				},null,'utf8');
			};
			musicname = recvjsondata[imgdate]["music"]["name"];
			musicartist = recvjsondata[imgdate]["music"]["artist"];
		} else {
			musicname = "There is no music here.";
			musicartist = "";
		};
		if (recvjsondata[imgdate]["event"]) {
			mawae = getmonth() + ". " + getweekday() + ", " + recvjsondata[imgdate]["event"];
		} else {
			mawae = getmonth() + ". " + getweekday();
		};
		$("#background").css("background-color", color_back);
		$("#mawae").html(mawae);
		$("#day").html(getday());
		$("#geo").html(geo);
		$("#short").html(text_short);
		$("#songname").html(musicname);
		$("#artist").html(musicartist);
		$("#cover").css("background-image", "url('" + pic + "')");
		function startupfadeout () {
			var t = setTimeout("$('#startup').fadeOut()",3000);
		}
		startupfadeout();
	},null,'utf8');
}

function getupdate(){
	fs.readFile('./package.json', {encoding:'utf8',flag:'r'}, function (err, data) {
		if (err) throw err;
		var packagedata = JSON.parse(data);
		var localversion = packagedata.version;
		nodegrass.get("http://nd.nichijou.in/latestversion", function(data){
			if (localversion == data) {
				console.log("Up to date");
			} else {
				alert("有新版本！请到官网下载\n目前版本:" + localversion + "\n最新版本:" + data);
			};
		},null,'utf8');
	});
}

$(document).ready(function () {
	pulldate = getjsonDate();
	imgdate = getimgDate();
	$("#page").mouseenter(function () {
		$("#winctrl").fadeIn();
		if ($("#timemachine").css("display") === "none") {
			$("#tmopen").fadeIn();
		};
	});
	$("#page").mouseleave(function () {
		$("#winctrl").fadeOut();
		if ($("#timemachine").css("display") === "none") {
			$("#tmopen").fadeOut();
		};
	});
	$("#tmopen").click(function () {
		$("#timemachine").fadeIn();
		$("#tmopen").css("display", "none");
	});
	$("#tmexit").click(function () {
		$("#timemachine").fadeOut();
		$("#tmopen").css("display", "");
	});
	$("#min").click(function () {
		win.minimize();
	});
	$("#exit").click(function () {
		win.close();
	});
	$("#play-pause-button").click(function() {
		if (document.getElementById("todaymusic").paused) {
			$("#play-pause-button").removeClass("play").addClass("pause");
			document.getElementById("todaymusic").play();
		} else {
			$("#play-pause-button").removeClass("pause").addClass("play");
			document.getElementById("todaymusic").pause();
		};
	});
	document.getElementById("todaymusic").addEventListener("ended", function() {
		$("#play-pause-button").removeClass("pause").addClass("play");
	});
    getupdate();
	getinfo();
});

win.on('close', function() {
	$("#exitpage").fadeIn();
	function realexit() {
		var t = setTimeout("win.close(true)",2500);
	}
	realexit();
});