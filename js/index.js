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
var comment1 = "";
var comment2 = "";
var color_back = "";
var bigpicurl2x = "";
var nowevent = "";
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
		pic = recvjsondata[imgdate]["images"]["small"].replace("{img}","http://nextday-pic.b0.upaiyun.com");
		comment1 = recvjsondata[imgdate]["text"]["comment1"];
		comment2 = recvjsondata[imgdate]["text"]["comment2"];
		color_back = recvjsondata[imgdate]["colors"]["background"];
		nowevent = recvjsondata[imgdate]["event"];
		bigpicurl2x = recvjsondata[imgdate]["images"]["big"].replace("{img}","http://nextday-pic.b0.upaiyun.com");
		nitingcode = recvjsondata[imgdate]["music"]["nitingCode"];
		if (recvjsondata[imgdate]["music"]["url"]) {
			musicurl = recvjsondata[imgdate]["music"]["url"].replace("{music}","http://nextday-file.b0.upaiyun.com/");
			$("#todaymusic").attr("src", musicurl);
		} else {
			nodegrass.get("http://www.niting.com/iphone.do?method=getMusicUrlByCode&musiccode=" + nitingcode ,function(data){
				recvmusicdata = data;
				recvmusicdata = JSON.parse(recvmusicdata);
				musicurl = recvmusicdata["object"]["dc_musicurl"];
				$("#todaymusic").attr("src", musicurl);
			},null,'utf8');
		};
		musicname = recvjsondata[imgdate]["music"]["name"];
		musicartist = recvjsondata[imgdate]["music"]["artist"];
		$("#year").html(moment().get('year'));
		$("#month").html(getmonth());
		$("#weekday").html(getweekday());
		$("#day").html(getday());
		$("#date").css("background-color", color_back);
		$("#event").html(nowevent);
		$("#comment1").html(comment1);
		$("#comment2").html(comment2);
		$("#songname").html("《" + musicname + "》");
		$("#artist").html(musicartist);
		$("#cover").css("background-image", "url('" + pic + "')");
		$("#fullimg").css("background-image", "url('" + bigpicurl2x + "')");
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
		$("#musicopen").fadeIn();
	});
	$("#page").mouseleave(function () {
		$("#winctrl").fadeOut();
		$("#musicopen").fadeOut();
	});
	$("#cover").click(function () {
		$("#fullimg").fadeIn();
	});
	$("#fullimg").click(function () {
		$("#fullimg").fadeOut();
	});
	$("#musicopen").click(function () {
		$("#musicwin").fadeIn();
		$("#musicopen").css("display", "none");
	});
	$("#musicexit").click(function () {
		$("#musicwin").fadeOut();
		$("#musicopen").css("display", "");
	});
	$("#min").click(function () {
		win.minimize();
	});
	$("#exit").click(function () {
		win.close();
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