---
layout: post
title: "前端性能优化之：脚本后置"
date: 2014-08-25 23:01
comments: true
keywords: JS脚本后置
categories: Web-FE
---
今天把本博客的所有页面都包含的几个JS文件的标签放到了文档的最后，一下子使得博客的打开速度提升不少（据本人自己测试，以及女友的测试~~）。尤其在已经有了缓存之后（非首次访问），简直是秒开。

方法：把 `source\_includes\header.html`中对jQuery的引用放到文档的最后面，即放到`source\_includes\footer.html`中。

```javascript 后置的代码
<script src="{{ root_url }}/javascripts/modernizr-2.0.js"></script>
<script src="{{ root_url }}/javascripts/libs/jquery-1.9.1.min.js"></script>
<script src="{{ root_url }}/javascripts/octopress.js" type="text/javascript"></script>
```

所以，最佳实践的确是这样：<strong>尽量把全部的JS脚本放到文档的最后面</strong>。