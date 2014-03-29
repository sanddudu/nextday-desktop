//Load Environment
var nodegrass = require('nodegrass');
var gui = require('nw.gui');
var win = gui.Window.get();

//Received JSON info storage
var recvjsondata = "";

//Info Date
var pulldate = "";

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

//Unresizeable
win.setResizable(0);

function getinfo() {
	nodegrass.get("http://xmas2011.nxmix.com/" + pulldate + "/data.json",function(data){
		recvjsondata = data;
		recvjsondata = JSON.parse(recvjsondata);
		pic = recvjsondata.data[0].pic;
		comment1 = recvjsondata.data[0].comment1;
		comment2 = recvjsondata.data[0].comment2;
		color_back = recvjsondata.data[0].color_back;
		nowevent = recvjsondata.data[0]["event"];
		bigpicurl2x = recvjsondata.data[0]["bigpicurl@2x"];
		musicurl = recvjsondata.data[0].musicurl;
		musicname = recvjsondata.data[0].songname;
		musicartist = recvjsondata.data[0].artist;
		$("#year").html(getyear());
		$("#month").html(getmonth());
		$("#weekday").html(getweekday());
		$("#day").html(getday());
		$("#date").css("background-color", color_back);
		$("#event").html(nowevent);
		$("#comment1").html(comment1);
		$("#comment2").html(comment2);
		$("#songname").html("《" + musicname + "》");
		$("#artist").html(musicartist);
		$("#todaymusic").attr("src", musicurl);
		$("#cover").css("background-image", "url('" + pic + "')");
		$("#fullimg").css("background-image", "url('" + bigpicurl2x + "')");
	},null,'utf8');
}

window.onload = function () {
	pulldate = getyymmdd();
	getinfo();
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
}

win.on('close', function() {
	$("#exitpage").fadeIn();
	function realexit() {
		var t = setTimeout("win.close(true)",2500);
	}
	realexit();
});