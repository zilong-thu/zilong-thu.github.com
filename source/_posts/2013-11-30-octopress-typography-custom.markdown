---
layout: post
title: "在Octopress博客中使用中文字体"
date: 2013-11-30 21:36
comments: true
keywords: typography, octopress settings
categories: Octopress
---
Octopress的所有预设字体都是针对英文的，例如，对于标题，使用下面的字体族：

$heading-font-family: "PT Sans", "Helvetica Neue", Arial, sans-serif, !default;

这样一来，如果我的博客是中文标题，就只能采用浏览器默认的字体（一般是宋体），这样既不能保证跨浏览器表现的一致性，也不能得到最佳的外观表现——标题最适合使用无衬线字体，而如果使用宋体这样的衬线字体，会非常难看。本文就研究一下在Octopress博客中使用中文字体的解决方案。

<!-- more -->
###标题
标题最好采用无衬线的粗体字体。

几乎所有的Windows系统都安装有“微软雅黑”字体，优先使用这个；然后使用“黑体”字体来作为候选方案。

对于MacOS，先采用“丽黑 Pro”，然后用华文细黑作为备用字体。

另外要注意一点：<strong>永远不要忘记声明英文字体，并且英文字体应该在中文字体之前</strong>——具体可参考<a href="http://www.uisdc.com/web-font" target="_blank" title="优设网-WEB中文字体应用指南">优设网-WEB中文字体应用指南</a>。

那么，这样声明即可：
```css octopress\sass\base\typography.scss
$heading-font-family: "PT Sans", "Helvetica Neue", Arial, sans-serif,"Microsoft YaHei",SimHei,"LiHei Pro Medium",STXihei !default;
```

关于不同操作系统下的中文字体名称，可以参考<a href="http://www.cnblogs.com/jiji262/archive/2012/02/13/2349851.html" target="_blank" title="css中font-family的中文字体">css中font-family的中文字体</a>

###引用区块blockquote
我的博客中，blockquote都是草绿色背景、带有内嵌的阴影、左边有绿色的粗边框，并且有圆角。为了使引用的内容与正文区别更明显，我将其字体设为楷体——当然，结果是只有在电脑上才会有效，iPad和安卓手机都只使用浏览器默认的字体族（目前都是类似华文细黑这样的无衬线字体）。如果没有楷体，就使用仿宋。

``` css
article blockquote{
	font-family: "PT Serif",Georgia,Times,"Times New Roman",KaiTi_GB2312,KaiTi,STKaiti,FangSong,STFangsong,serif;
}
```