---
layout: post
title: "局域网中的Node HTTP服务器"
date: 2014-08-20 21:53
comments: true
keywords: Node.js todo
categories: NodeJS
---

之前用Node.js+Express+MongoDB写了个Tasks Web应用，好久没碰它了，今天把它在家里的局域网跑起来，然后通过电脑的局域网IP:所开放的端口号来访问这个Web APP。略有缺憾，开发目标记录在下，以后不断研究，加以完善。

+ 我希望此HTTP服务一直运行，最好是运行在路由器上。例如小米路由器，据说它就想是台小型的服务器，那么应该可以搭建一个Node环境吧。
+ 当初制作时对Ajax的使用并不多，这很不好，仍旧不够像是一个APP。要尽可能创建成一个单页面应用。
+ 针对自己的手机、平板，做移动端的优化。