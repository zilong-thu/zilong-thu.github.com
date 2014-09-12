---
layout: post
title: "Node.js Web服务器内存大小"
date: 2014-09-13 00:42
comments: true
keywords: nodejs-web, BAE, toodoo
categories: NodeJS
---
今天重新拾起三个多月前扔掉的BAE工程。删除，从头开始。新工程的地址： <a href="http://toodoo.duapp.com/" target="_blank">toodoo</a>.

话说百度开放云平台是收费的，默认给配置的内存单元大小为256MB，加上2GB的硬盘资源，每天0.4元。鉴于现在是学习阶段，干脆把Node服务器的内存调到最小……也就是128MB，这样就省了一半的钱——嗯，不错。

本地运行的Node服务器，内存占用大概在100MB左右：

<img src="/images/blog/node/2014/09/13/Node-localserver-consume.png" title="本地Node服务器的内存占用-windows8">

所以也难怪BAE提示说“nodejs-web类型至少128MB”了。