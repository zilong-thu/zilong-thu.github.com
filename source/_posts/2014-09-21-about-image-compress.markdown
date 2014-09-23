---
layout: post
title: "谈一谈网站图片压缩"
date: 2014-09-21 13:23
comments: true
keywords: about image compress, 网站图片压缩
categories: Web-FE
---

公司前段时间更换登录页面的背景图。然后研究了一下相关的问题，包括PS切图、图片格式以及响应式布局三方面。

###PS切图：
除了风光背景图，像logo、登陆框组的背景这样的都应该单独切出来，保存为PNG格式。logo应该放在一张sprite图中。

###图片格式
风光背景图，之前的project里面用的是PNG格式，我没有多想，也采用了PNG格式，不过使用了PNG-8，体积是原体积一半（1MB多一点）。对这么大的背景图，我感觉有点不对劲，但是由于之前也没有经验，一下子也没搞清楚哪里不对劲。

<!-- more -->

下班后，试了试将图片保存为JPEG格式，体积变成了200K以下，于是明白了：

<strong>PNG格式适合对透明度有要求的情形；PNG-8处理不了复杂色域下的渐变，PNG-24可以几乎不失真地保留渐变。但是对于色域很广、对透明度没有要求的图片（准确地说是照片），应该毫不犹豫地采用JPEG格式。</strong>

于是，第二天我将背景图的格式保存为JPEG，体积从1.1MB降到了200KB。结果当然是速度提升很大。

####JPEGmini
JPEGmini是一个很轻量级的用于将JPEG格式图片在保证几乎不失真的前提下进行有损压缩的小软件。如果仅仅是要压缩JPEG图片，那么就可以不必打开Photoshop，而是使用这个小程序，更快更好。下载地址见：<a href="http://www.jpegmini.com/" target="_blank">JPEGmini官方网站</a>


###响应式布局
美工给的图是按照1920像素×1080像素做的。我把logo、登陆框的大小按照1400像素的画布进行切图，然后输出了四种尺寸的背景图：1920px，1600px，1400px，1200px。分为4个区间，每个区间使用大于本区间尺寸的那张图。至于屏幕宽度在1920像素以上的，根据项目的实际用户人群来看，目前没有考虑的必要。

###附录：
关于图片格式，多说几句。由于我觉得200K~300K的背景图尺寸可能还是有点大，于是就看了下小米的官网里面对图片的尺寸是如何控制的。就到目前来说，小米网站的图片应该是没有考虑过优化的问题。

下面是那张原图与我使用不同的压缩技术处理后的图片的比较。

<div class="output">
<img src="/images/blog/web_fe/2014/09/21/9.15.2.png" title="小米官网的一张原始图片"><br/>
格式：PNG<br/>
大小：317KB
</div>
<div class="output">
<img src="/images/blog/web_fe/2014/09/21/xiaomi-png8.png" title="PNG-8格式"><br/>
格式: PNG-8<br/>
尺寸: 500w x 440h<br/>
大小:126.3K<br/>
设置:可选择, 256颜色， 100% 扩散仿色, 透明区域关闭, 无透明度仿色, 非交错的, 0% Web 靠色
</div>

<div class="output">
<img src="/images/blog/web_fe/2014/09/21/xiaomi-png24.png" title="PNG-24格式"><br/>
格式: PNG-24<br/>
尺寸: 500w x 440h<br/>
大小:320.9K<br/>
设置:非交错的, 透明区域关闭
</div>


<div class="output">
<img src="/images/blog/web_fe/2014/09/21/xiaomi-jpeg-q60.jpg" title="jpeg格式"><br/>
格式: JPEG<br/>
尺寸: 500w x 440h<br/>
大小:55.87K<br/>
设置:品质为60, 非连续的, 优化的打开
</div>

<div class="output">
<img src="/images/blog/web_fe/2014/09/21/xiaomi-jpeg-q100.jpg" title="jpeg格式"><br/>
格式: JPEG<br/>
尺寸: 500w x 440h<br/>
大小:197.2K<br/>
设置:品质为100, 非连续的, 优化的打开
</div>

结论：保存为JPEG格式就足以满足对该类型图片的质量要求了。