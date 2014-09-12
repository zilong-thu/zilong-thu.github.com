---
layout: post
title: "仿iPad iOS 7 软键盘"
date: 2014-08-26 20:55
comments: true
keywords: soft keyboard, javascript
categories: CSS
---

样式初步如下：
<!-- more -->

<script type="text/javascript">
	(function(doc){
		var url = '/blog/myAPPs/softKeyboard/style.css';
		var link =  doc.createElement("link");
	    link.rel = "stylesheet";
	    link.type = "text/css";
	    link.href = url;
	    doc.head.appendChild(link);
	})(document);
</script>

<div id="keyboard-content" class="output"></div>

<div id="keyboard">
    <div class="k-row row1" data-k="10">
    	<div class="key">Q</div><div class="key">W</div><div class="key">E</div><div class="key">R</div><div class="key">T</div><div class="key">Y</div><div class="key">U</div><div class="key">I</div><div class="key">O</div><div class="key">P</div><div class="key key-func-del">Delete</div>
    </div>
    <div class="k-row row2" data-k="9">
    	<div class="key">A</div><div class="key">S</div><div class="key">D</div><div class="key">F</div><div class="key">G</div><div class="key">H</div><div class="key">J</div><div class="key">K</div><div class="key">L</div>
    </div>
    <div class="k-row row3" data-k="7">
    	<div class="key">Z</div><div class="key">X</div><div class="key">C</div><div class="key">V</div><div class="key">B</div><div class="key">N</div><div class="key">M</div>
    </div>
</div>

待完成：

+ 对于指定输入框，输入字符
+ 删除按钮
+ 空格
+ 特殊符号
+ 隐藏键盘


<script>
(function($){
	var domOutput = $('#keyboard-content');

	$('#keyboard').click(function(event){
		var target = event.target;
		if ($(target).attr('class') == 'key') {
			var letter = $(target).html();
			domOutput.append(letter);
		}
	});
})(jQuery);
</script>