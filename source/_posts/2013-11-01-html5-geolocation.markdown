---
layout: post
title: "HTML5地理位置获取：GeoLocation"
date: 2013-11-01 15:42
comments: true
categories: HTML5
---
<div id="noticeBox" class="noticeBox"></div>

在包含GPS硬件的设备上，通过GPS单元可以获取精确的位置信息。不过，大多数情况下，位置信息都是通过Web获取的。当浏览器提交Internet IP地址给一个Web服务器的时候，该服务器通常能够知道（基于ISP记录）该IP属于哪个城市（通常广告商会在服务器端这么做）。
<!-- more -->

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

本例子涉及使用Google静态地图图片技术，见： [Static Maps API V2 开发者指南](https://developers.google.com/maps/documentation/staticmaps/?hl=zh-cn#URL_Parameters)

单击下面的按钮，可以获得你的地理位置坐标，并借助谷歌生成你所在城市的静态地图。

<button id="test_geolocation" type="button" class="btn btn-primary">看看我的地理位置</button>
<div id="lat_and_long" class="output" style="display:none;"></div>
<div id="your_address" style="display:none;"></div>
<div id="div_staticmap"></div>

<script type="text/javascript">
$(document).ready(function(){
$('#test_geolocation').click(function(){
	if(navigator && navigator.geolocation){
		$('#lat_and_long').html('加载中……').slideDown();
		navigator.geolocation.getCurrentPosition(geo_success, geo_error);
	}else{
		error('哎哟，你的浏览器不支持地理位置共享哈……用Chrome或者Mozilla吧~~');
		// 使用MaxMind IP作为location API的备选方案
		// printAddress(geoip_latitude(), geoip_longitude(), true);
	}
});
});

function geo_success(postion){
	var latitude  = postion.coords.latitude,
		longitude = postion.coords.longitude,
		accuracy  = postion.coords.accuracy;
	printLatLong(latitude, longitude);
	setMapURL(latitude, longitude, accuracy);
	//printAddress(postion.coords.latitude, postion.coords.longitude);
}
function printLatLong(lat, lon){
$('#lat_and_long').html('你的地理坐标是：<br/>纬度(Latitude) ： '+lat+'<br/>经度(Longitude) ： '+lon).slideDown();
}
function setMapURL(latitude, longitude, accuracy){
	var image = document.createElement('img');
	var url = 'http://maps.googleapis.com/maps/api/staticmap'+
			  '?center=' + latitude + ',' + longitude + '&size=640x450&sensor=true';
	
	// 设置大致的缩放级别
	var zoomlevel = 20;
	if(accuracy > 100){
		zoomlevel = zoomlevel - Math.round(Math.log(accuracy/30)/Math.LN2);
	}
	url = url + '&zoom='+ zoomlevel;

	image.src = url;
	$('#div_staticmap').html('').append(image);
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
			$('#your_address').html('<p>你的地址是：<br/>'+results[0].formatted_address + '</p>').slideDown();
		}else{
			error('呃，抱歉哈，谷歌未能确定你的地址……').slideDown();
		}
	});
	if(isMaxMind){
		$('#your_address').append('<p><a href="">IP to Location Service Provided by MaxMind</a></p>').slideDown();
	}
}
</script>