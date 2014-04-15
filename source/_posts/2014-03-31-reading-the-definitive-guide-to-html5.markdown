---
layout: post
title: "《HTML5权威指南》笔记"
date: 2014-03-31 23:51
comments: true
keywords: The definitive guide to html5
categories: HTML5
---
<a href="http://book.douban.com/subject/25786074/" class="douban_book" name="25786074" target="_blank">《HTML5权威指南》</a> 确实是一本很全面的书籍，其号称“迄今为止最全面详实的HTML5学习和参考书”，也八九不离十。

<!-- more -->

##第3章 初探HTML
###3.5 HTML5全局属性
####3.5.3 contenteditable属性
有不少元素属性是布尔属性，这种属性不需要设定一个值，只要将属性吗添加到元素中即可。例如`disabled`。

但`contenteditable`不是这种布尔属性。`<p contenteditable></p>`和`<p contenteditable="true"></p>`表示元素内容可编辑，而`<p></p>`和`<p contenteditable="false"></p>`都表示元素内容不可编辑。

####3.5.5 dir属性
`dir`属性用来规定元素中文字的方向。其有效值有两个：`ltr`、`rtl`。

示例（貌似有浏览器bug）：

<div class="output">
<p dir="rtl"> rtl，从右到左。或者说是“右对齐”。。。</p>
<p dir="ltr"> ltr，从左往右。或者叫做“左对齐”。。。</p>
</div>
<br/>

##第7章 创建HTML文档
###7.2 用元数据元素说明文档
####7.2.5 指定外部资源
`link`元素可用来在HTML文档和外部资源（CSS样式表是最典型的情况）之间建立联系。

关于使用`link`元素为页面定义网站标志。可以这样：

```html 网站标志定义方法1
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
```
人人网就是使用了这样的方法。

还有一种简单方法，Octopress博客系统就是这样的：

```html 网站标志定义方法2
<link href="/favicon.png" rel="icon">
```
就OK了。

当然，如果实在懒，也可以不写这一行。由于目前大多数浏览器在载入页面时都会自动请求网站服务器根目录下名为favicon的图片文件（后缀为ico或者png等），所以就算不写这行，也会得到这个图片。但这不是W3C标准做法，我个人不推荐。

##第8章 标记文字
###8.5 使用标题引用、引文、定义和缩写
####8.5.3 引用来自他处的内容
`q`元素表示引自他处的内容。浏览器会在它的前后自动添加引号，并且使用斜体显示。`q`元素和`blockquote`元素的区别是，后者默认是块元素，前者默认是行内元素。

```css q元素的习惯样式
q{ display: inline; }
q:before { content: open-quote; }
q:after { content: close-quote; }
```

`q`元素的`cite`属性可以指定来源文章的URL（但此属性并无视觉抑或功能上的任何体现）。例如：

<p>
<q cite="http://zh.wikipedia.org/wiki/%E4%B8%98%E5%90%89%E5%B0%94">你能看到多远的过去，就能看到多远的未来。<br/>——丘吉尔</q>
</p>

###8.6 使用语言元素
####8.6.1 ruby、rt和rp元素
示例：

```html
<ruby>魑<rp>(</rp><rt>chī</rt><rp>)</rp></ruby>
<ruby>魅<rp>(</rp><rt>meì</rt><rp>)</rp></ruby>
<ruby>魍<rp>(</rp><rt>wǎng</rt><rp>)</rp></ruby>
<ruby>魉<rp>(</rp><rt>liǎng</rt><rp>)</rp></ruby>
，以及没有注音的字。
```

<p class="output" style="font-size:1.5em">
<ruby>魑<rp>(</rp><rt>chī</rt><rp>)</rp></ruby>
<ruby>魅<rp>(</rp><rt>meì</rt><rp>)</rp></ruby>
<ruby>魍<rp>(</rp><rt>wǎng</rt><rp>)</rp></ruby>
<ruby>魉<rp>(</rp><rt>liǎng</rt><rp>)</rp></ruby>
，以及没有注音的字。
</p>

##第9章 组织内容
###9.4 使用预先编排好格式的内容
`pre`元素可以改变浏览器处理内容的方式，组织合并空白字符，让源文档中的格式得以保留。其习惯样式为：

```css pre元素的习惯样式
pre {
	display: block;
	font-family: monospace;
	white-space: pre;
	margin: 1em 0;
}
```
