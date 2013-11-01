---
layout: post
title: "html5地理位置获取：GeoLocation"
date: 2013-11-01 15:42
comments: true
categories: 
---
<div id="noticeBox" class="noticeBox"></div>

<p>本来想采用Script DOM Element方法动态加载外部脚本，未能如愿（失败了的代码如下）。有时间再研究。</p>
<pre>
<code>
var scriptElement_a = document.createElement('script');
var scriptElement_b = document.createElement('script');
scriptElement_a.src = 'http://j.maxmind.com/app/geoip.js';
scriptElement_b.src = 'http://maps.google.com/maps/api/js?sensor=false';
var head = document.getElementsByTagName('head')[0];
head.appendChild(scriptElement_a);
head.appendChild(scriptElement_b);
</code>
</pre>

<!-- more -->
<input type="button" id="go" value="单击以获取你的地理位置"/>
<div id="lat_and_long" style="display:none;"></div>
<div id="your_address"></div>

<script>
$(document).ready(function(){
$('#go').click(function(){
	if(navigator && navigator.geolocation){
		navigator.geolocation.getCurrentPosition(geo_success, geo_error);
	}else{
		error('哎哟，你的浏览器不支持地理位置共享哈……用Chrome或者Mozilla吧~~');
		// 使用MaxMind IP作为location API的备选方案
		// printAddress(geoip_latitude(), geoip_longitude(), true);
	}
});
});

function geo_success(postion){
	printLatLong(postion.coords.latitude, postion.coords.longitude);
	//printAddress(postion.coords.latitude, postion.coords.longitude);
}
function printLatLong(lat, lon){
$('#lat_and_long').html('<p>纬度(Latitude):'+lat+'</p><p>经度(Longitude):'+lon+'</p>').slideDown();
}
function error(msg){
	$('#noticeBox').html(msg).fadeIn("slow");
	setTimeout(function(){
		$('#noticeBox').fadeOut();
	},2000);
}
function geo_error(err){
	if(err.code == 1){
		error('The user denied the request for location information.');
	}else if(err.code == 2){
		error('Your location information is unavailable.');
	}else if(err.code == 3){
		error('The request to get your location time out...');
	}else{
		error('Unknown error occured...');
	}

	// printAddress(geoip_latitude(), geoip_longitude(), true);
}

function printAddress(lat, lon, isMaxMind){
	var geocoder = new google.maps.Geocoder();
	var yourLocation = new google.maps.LatLng(lat, lon);
	geocoder.geocode({'latLng':yourLocation}, function(results, status){
		if(status===google.maps.GeocoderStatus.OK){
			$('#your_address').html('<p>你的地址是：<br/>'+results[0].formatted_address + '</p>');
		}else{
			error('呃，抱歉哈，谷歌未能确定你的地址……');
		}
	});
	if(isMaxMind){
		$('#your_address').append('<p><a href="">IP to Location Service Provided by MaxMind</a></p>');
	}
}
</script>