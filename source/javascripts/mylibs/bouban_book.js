function requestBookInfo(element){
	var bookID = element.name;
	var url = 'https://api.douban.com/v2/book/'+bookID+'?apikey=05890b77f44e9ccd109b2267dcebd667&callback=showBookInfo';
	var script =  document.createElement("script");
	script.src = url;
	script.setAttribute("class","script_for_ajax");
	document.body.appendChild(script);
}
function showBookInfo(data){
	var div_douban_wrapper = $('#div_douban_wrapper');
	var div_douban_content = $('#div_douban_content');

	var str_html = '<h3>'+data.title+'</h3>' +
			'<div style="float: left;margin: 0 20px 5px 0;">'+
			'<a href="http://book.douban.com/subject/'+data.id+'/" target="_blank" title="《'+data.title+'》，去豆瓣，更精彩~~">'+
			'<img src="'+data.images.medium+'"/></a></div>'+
			'<div style="padding-right:2em;float: left;margin: 0 20px 5px 0;">'+
			'作者： '+ data.author +
			'<br/>出版社： ' + data.publisher + 
			'<br/>出版年： ' + data.pubdate + 
			'<br/>页数： ' + data.pages + 
			'<br/>定价： ' + data.price + 
			'<br/>ISBN： ' + data.isbn13 +
			'</div>'+
			'<div style="float:left;margin:5px 20px 5px 0;"><span class="bigstars"></span><br/><span class="numRaters"></span></div>';
	div_douban_content.html(str_html);
	div_douban_wrapper.fadeIn('fast');

	// rating
	showRating(data.rating);
	
	// delete the script script_for_ajax
	$('script.script_for_ajax').remove();

	$($('#div_douban_wrapper span.douban_close')[0]).click(function(){
		div_douban_wrapper.fadeOut();
	});
}
function showRating(rating){
	var average = rating.average,
		numRaters = rating.numRaters;
	var r = Math.ceil(average);
	r = (10-r)*14;
	if(r===10){
		--r;
	}
	var bigstars = $('#div_douban_wrapper .bigstars')[0];
	var str_style = 'color: #a60000;display: inline-block;padding-left: 85px;height: 14px;line-height: 14px;' +
					'background: url("/images/bigstars.gif") no-repeat;' +
					'background-position: 0 -'+r+'px;' ;
	$(bigstars).attr('style',str_style);
	$(bigstars).html(average);
	$($('#div_douban_wrapper .numRaters')[0]).html('( '+numRaters+'人评价'+' )');
}

function registerDoubanBookEventHanler(){
	var anchors = $('a.douban_book');
	var icon_url = 'http://static.duoshuo.com/images/service-icons-color.png';  // \'/images/service_icons_color.png\';
	var str_douban_icon_style = 'display:inline-block;width:16px;height:16px;background:url(\'' +
								 icon_url + '\') 2px -96px no-repeat transparent;padding: 0 2px;';

	for(var i=0, length=anchors.length;i<length;i++){
		var a = anchors[i];
		$(a).after('<span style="'+str_douban_icon_style+'"></span>');
		$(a).attr('title','点击查看该书基本信息');

		a.onclick = function(){
			requestBookInfo(this);
			return false;
		};

		// a[i].onmouseout = function(){
		// 	setTimeout("$('#div_douban_wrapper').fadeOut();",1200);
		// 	return false;
		// };
	}
}

registerDoubanBookEventHanler();