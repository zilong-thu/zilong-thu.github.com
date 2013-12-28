---
layout: post
title: "《HTML5应用开发实践指南》笔记"
date: 2013-12-26 20:43
comments: true
keywords: HTML5, programming html5 applications
categories: HTML5
published: false
---
<a href="http://book.douban.com/subject/23058345/" class="douban_book" name="23058345" target="_blank" title="HTML5应用开发实践指南">《HTML5应用开发实践指南》</a>这样的书居然要卖49块钱，你只有114页啊亲……

###HTML5扩展了Web应用的力量
HTML5提高了Web应用的标准。尽管它仍然需要工作在安全约束条件下，但最终会提供桌面开发人员期盼多年的工具。

+ Local Storage 
+ 数据库
+ 文件
+ 离线操作
+ Web Worker
+ Web Socket

####本地存储
引用键-值系统多达5MB的数据。

localStorage机制提供一个持续跨Web重载的JavaScript对象。这种机制似乎是合理的、一致的和稳定的。localStorage适于存储小规模的数据，如session信息和用户偏好。
####数据库
起初是一个基于SQLite的API，形式似乎已经转向IndexedDB——一种JavaScript原生的NoSQL系统。

<a href="http://www.ibm.com/developerworks/cn/web/wa-indexeddb/">developerWorkers中国：使用 HTML5 IndexedDB API</a>

####文件
尽管出于安全的考虑，Web应用依旧不能自由地访问文件系统，但是已经能够使用用户指定的文件，并开始创建文件了。

####离线操作

####Web Worker
解决多线程问题。
####Web Socket