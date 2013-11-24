---
layout: post
title: "《无懈可击的Web设计II》笔记"
date: 2013-11-24 10:24
comments: true
keywords: reading notes,more bulletproff web design, css, css3
categories: Reading-Notes
---
<script type="text/javascript">
$(document).ready(function(){
	generateVisualization();
});
</script>
<a href="http://book.douban.com/subject/4935289/" target="_blank" title="去豆瓣看看这本书~~">《无懈可击的Web设计II》</a>这本书装订得很漂亮，全部彩色打印。貌似老外写的书，引进并翻译过来后再出版的基本都会好好做装订，像《Web界面设计》也是全彩打印，真贵啊——不过这也是设计类书籍的惯例。装订精美，也不愁销量。

###渐进增强与优雅降级
这部分内容主要在第4章：“网站是否需要在每个浏览器中看起来都一样？”中做了介绍。

先谈一下我的一个误区：之前，我一直是以为是否采用某个CSS3、HTML5的超前的技术，是由全球浏览器市场份额来决定的——当然，从全球网站这个宏大的观点来说，是没有大问题的。但对于任何一个特定的网站，不应该首要考虑全球浏览器市场份额，而应该参考自己的网站用户统计数据中关于所用浏览器的报告；除此之外，其他网站的用户统计或全球采样调查都是百无一用的（Eric Meyer，2004）。
<!-- more -->

> Eric的意思是：浏览器的全球普及率统计无关紧要；重要的是你所负责的网站的统计数据。
> 
> 你网站的大部分访客还在使用IE6？如果是，你最好三思是否要用渐进增强技术。如果IE6访客仅为1%，那么务必尝试使用超前技术。

这本书提到一个词：<strong>视觉奖励</strong>。非常形象。对于更支持新规范的浏览器，采用新技术写的网页会给这些浏览器的用户带来“视觉奖励”，而在老旧浏览器下，它们“优雅降级”而不会影响使用，真是Perfect！

> 让我们试着做一个80%主义者，将精力放在更为重要的细节上，而不要为视觉上的问题创建复杂的解决方案，因为这些很快就会被浏览器代劳的。

——这也仅仅针对像`text-shadow`、`box-shadow`、`transition`、`border-radius`等新技术可以支持的视觉效果。有时候，像漂亮的“滑动门”这样的tab页还是得自己好好做的。

<p style="font-weight:bold;font-size:1.1em;line-height:1.1em;color:#363636;">好了，下面开始从头阅读此书。</p>

###Chapter 1：制作饮品单
我在这里不得不用JavaScript来动态地读取下面的DRINK MENU中的价格表，然后根据最高价格，确定各行的宽度百分比——因为现在还不知道如何使用Octopress模板链接自定义的样式表文件（而非其自带的screen.css，例如我想链接 myStyleSheetForThisBlog.css 文件）。

<ul id="chapter_one_ul" style="list-style-type:none;width:50%;background-color:#fcfcfc;">
<li style="font-weight:bold;color:red;border-bottom:2px solid #cccccc;">DRINK MENU</li>
<li style="position:relative;top:0;left:0;"><span class="menu_item"><em class="price" style="float:right;color:#9c836e;">2.79</em>Latte</span><span class="price_bar"></span></li>
<li style="position:relative;top:0;left:0;"><span class="menu_item"><em class="price" style="float:right;color:#9c836e;">2.99</em>Cappuccino</span><span class="price_bar"></span></li>
<li style="position:relative;top:0;left:0;"><span class="menu_item"><em class="price" style="float:right;color:#9c836e;">1.80</em>Cafe Americano</span><span class="price_bar"></span></li>
<li style="position:relative;top:0;left:0;"><span class="menu_item"><em class="price" style="float:right;color:#9c836e;">2.00</em>Espresso</span><span class="price_bar"></span></li>
<li style="position:relative;top:0;left:0;"><span class="menu_item"><em class="price" style="float:right;color:#9c836e;">10.49</em>Half-caf, non-fat, triple-shot latte(with a twist of lemon)</span><span class="price_bar"></span></li>
</ul>
<script type="text/javascript">
function generateVisualization(){
	var ems = $('#chapter_one_ul em.price'),
		spans = $('#chapter_one_ul span.price_bar'),
		menu_items = $('#chapter_one_ul span.menu_item'),
		span_length = [],
		MAX_PRICE=0,
		current_span,
		current_price;

	menu_items.each(function(i,e){
		$(e).attr('style','display:block;padding:7px;z-index:2;border-bottom:1px solid #f3f2e8;position:relative;top:0;left:0;cursor:default;');
	});

	for(var i=0,length=ems.length;i<length;i++){
		current_price = parseFloat($(ems[i]).text());
		span_length.push(current_price);
		MAX_PRICE = MAX_PRICE>current_price ? MAX_PRICE : current_price;
	}

	for(i=0;i<length;i++){
		current_span = $(spans[i]);
		current_span.attr('style','display:block;background-color:#87F664;position:absolute;top:0;left:0;height:100%;z-index:1;width:'+span_length[i]/MAX_PRICE*100+'%');
	}
}
</script>

###Chapter 2：用border-radius制作圆角
我觉得制作可以用`border-radius`实现的圆角纯属无用功。但是，如果你想为你的网站添加带有复杂图形的边角，那么目前是可以采用在四个角上布置图片的方式的，例如花边提示框。

###Chapter 3：用RGBA让色彩灵活起来
感觉没有太多新意啊。

###Chapter 5：模块化的浮动管理

###Chapter 6：浮动的网格

###Chapter 7：技艺的细节