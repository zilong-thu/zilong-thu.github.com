---
layout: post
title: "html5地理位置获取：GeoLocation"
date: 2013-11-01 15:42
comments: true
categories: 
---
<div id="noticeBox" class="noticeBox"></div>
<input type="button" id="go" value="单击以获取你的地理位置"/>
<div id="lat_and_long"></div>
<script>
$(document).ready(function(){
$('#go').click(function(){
	if(navigator && navigator.geolocation){
		navigator.geolocation.getCurrentPosition(geo_success, geo_error);
	}else{
		error('GeoLocation is not supported.');
	}
});
});
function geo_success(postion){
	printLatLong(postion.coords.latitude, postion.coords.longitude);
}
function printLatLong(lat, lon){
$('#lat_and_long').append('<p>Lat:'+lat+'</p>');
$('#lat_and_long').append('<p>Long:'+lon+'</p>');
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
}
</script>