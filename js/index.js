//Load Environment
var nodegrass = require('nodegrass');
var gui = require('nw.gui');
var win = gui.Window.get();

//Received JSON info storage
var recvjsondata = '';

//Processed info storage
var pic = '';
var comment1 = '';
var comment2 = '';
var color_back = '';
var bigpicurl2x = '';

//Unresizeable
win.setResizable(0);

function getinfo() {
	nodegrass.get("http://xmas2011.nxmix.com/" + getyymmdd() + "/data.json",function(data){
		recvjsondata = data;
		recvjsondata = JSON.parse(recvjsondata);
		pic = recvjsondata.data[0].pic;
		comment1 = recvjsondata.data[0].comment1;
		comment2 = recvjsondata.data[0].comment2;
		color_back = recvjsondata.data[0].color_back;
		bigpicurl2x = recvjsondata.data[0]['bigpicurl@2x'];
		document.getElementById('year').innerHTML = getyear();
		document.getElementById('month').innerHTML = getmonth();
		document.getElementById('weekday').innerHTML = getweekday();
		document.getElementById('day').innerHTML = getday();
		document.getElementById('date').style.backgroundColor = color_back;
		document.getElementById('comment1').innerHTML = comment1;
		document.getElementById('comment2').innerHTML = comment2;
		document.getElementById('cover').style.backgroundImage = "url('" + pic + "')";
		document.getElementById('fullimg').style.backgroundImage = "url('" + bigpicurl2x + "')";
	},null,'utf8');
}

window.onload = function () {
	getinfo();
	$("#page").mouseenter(function () {
		$("#winctrl").fadeIn();
	});
	$("#page").mouseleave(function () {
		$("#winctrl").fadeOut();
	});
	$("#cover").click(function () {
		$("#fullimg").fadeIn();
	});
	$("#fullimg").click(function () {
		$("#fullimg").fadeOut();
	});
}

win.on('close', function() {
	$("#exitpage").fadeIn();
	function realexit() {
		var t = setTimeout("win.close(true)",2500);
	}
	realexit();
});

function min () {
	win.minimize();
}

function closewin () {
	win.close();
}