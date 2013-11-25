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
		current_span.attr('style','display:block;background-color:#87F664;position:absolute;top:0;left:0;height:100%;z-index:1;width:'+(span_length[i]/MAX_PRICE*100).toFixed(4)+'%');
	}
}
</script>

###Chapter 2：用border-radius制作圆角
我觉得制作可以用`border-radius`实现的圆角纯属无用功。但是，如果你想为你的网站添加带有复杂图形的边角，那么目前是可以采用在四个角上布置图片的方式的，例如花边提示框。

###Chapter 3：用RGBA让色彩灵活起来
感觉没有太多新意啊。

###Chapter 5：模块化的浮动管理
自己对浮动曾有很不好的印象，大致是因为实验室网站的其他人使用了浮动却没有解决浮动带来的问题，并且是一大堆问题，所以我会有浮动是“可继承”的之类的理解误区。当然，是时候重新审视自己对于浮动的理解了。

> 不过浮动仍然是我们用CSS布局时确保布局灵活性的最佳方法并且维持一个智能、有效的方式处理浮动，是重新审视的主要对象。……在梦幻世界中，容器应该能感知其容纳的内容，自动拉伸至包容住其中的内容的大小。可惜的是，浮动效果并非是这样工作的。但是浮动本身是没有错的——浮动并不是设计来处理复杂（或甚至并不复杂）的布局设置的，而是我们要这样去用它。

关于浮动属性的来由，我参见今年的百度一面的时候也被问到了。当时面试官同学问的是“为什么会有float这样的属性出现？或者说当时为什么会设计float属性出来呢？”，我答的是这样可以更为灵活地布局，最后才提到了，可以让文本环绕图片。然后面试官说了，“对，float的设计初衷的确是用来表现文本环绕效果的”。嗯，这样来看，其实我是回答错误了的——对CSS关键属性的历史来由并不了解，只停留在会用的层次上，而没有达到理解CSS规范设计者意图的层次。

####清除浮动的方法：
2004年的旧文章：<a href="http://www.positioniseverything.net/easyclearing.html" target="_blank">How To Clear Floats Without Structural Markup</a>（《怎样不用网页代码清除浮动》）。这个页面说此文有些老，然后推荐读者去看看新的一篇文章：

<a href="http://www.sitepoint.com/simple-clearing-of-floats/" target="_blank">Simple Clearing of Floats, by Alex Walker</a>

本书的作者推崇的是`.clearfix`方法，原理是利用`:after`伪元素：

	.clearfix:after{
		content: '.';
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	/* for IE6 */
	* html .claerfix{
		height: 1%;
	}

	/* for IE7 */
	*:first-child+html .clearfix{
		min-height: 1px;
	}

这三条就够了。【注意：书中IE7的那个代码把.clearfix写成了.group，是个小错误。如果说二者有什么相关性，是这样：后面的一节建议把.clearfix改名为.group】

####关于CSS框架
较早的两个是 Blueprint，960 Grid System。

作者自己的CSS框架是这样的：

包含三个源文件：`reset.css`、`master.css`、`ie.css`。这三个源文件被`screen.css`文件导入。

主导思路大体如下：

<blockquote>
<ul>
<li>首先导入重置样式表，确保基础环境的统一，并且避免重复写样式。</li>
<li>在`master.css`、`ie.css`中加入清除浮动的声明，命名为`.group`类，以便需要时随时调用，可在所有浏览器中清除容器内的浮动。</li>
<li>用单独的样式表隔离针对IE的破解和补丁。</li>
</ul>
</blockquote>

不过，现在更火的一个CSS框架应该是<a href="http://www.bootcss.com/" target="_blank">Bootstrap</a>了吧。

作者提到一个很不错的在线生成ASCII码图案的网站：<a href="http://photo2text.com/" target="_blank">http://photo2text.com/</a>。它甚至可以根据任何照片生成比较像的ASCII码图形，然后就可以放在代码的注释里，作为版权符号神马的。

###Chapter 6：浮动的网格
就是说用百分比、相对值来表示浮动容器的宽度呗，也没太大新意。而且，又提了不少针对IE6的修复方案，毕竟中文版2010年8月出的，英文版至少再早一年吧，那个时候的IE6确实市场份额非常巨大。

###Chapter 7：技艺的细节
擦，视差滚动原来是得横着拉宽浏览器窗口才能看到啊。谁在浏览网页的时候会去改变浏览器窗口大小呢？？效果见<a href="http://silverbackapp.com/" target="_blank">Silverback</a>网站。

该网站的代码是这样的：

	/* html code */
	<div class="wrapper outer">
		<div class="wrapper inner">
			<div class="content">
				<!-- 这里是网页主体内容 -->
			</div>
		</div>
	</div>

	/* css code */
	.outer {
		background: transparent url("/images/backgrounds/vines-mid.png") 70% 0 repeat-x;
	}
	.inner {
		background: transparent url("/images/backgrounds/vines-front.png") 300% 0 repeat-x;
	}

另外，使用负百分比定位背景图片的水平位置，则图片会与改变窗口大小时的方向相同（往左拉浏览器窗口，则该背景图也会往左走。）示例网站：

<a href="http://therissingtonpodcast.co.uk/" target="_blank">The Rissington Podcast</a>

##总体评价
评分：★★★★☆

这本书不去讲解CSS规则，而是从实例入手；虽然有些技术已经到了黄昏阶段（例如制作圆角，各种过于强调针对IE6的hack），但对于那些看重浏览器兼容性、打算继续支持老旧浏览器的网站开发人员来说，是可以参考借鉴的。

整本书最有思想、最有价值的是第四章，而不是作者为表谢意而提到的第六章。第四章讲设计理念，讲程序员在面对新老技术交替时该如何做取舍的问题，是超越技术层面的探讨，也基本不受时空的限制，所以我认为这一章更有价值，也因此先读的这一章。可以说，如果你也站在滚滚而来的新技术潮流之中不知所措不知所往，那么，读一读第四章（或者看看我的笔记~~），也许你会豁然开朗。