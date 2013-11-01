---
layout: post
title: "搭建Octopress博客过程中遇到的问题与解决方法"
date: 2013-11-01 12:43
comments: true
categories: 
---
###问题1：Non-fast-forward
rake deploy时遇到的：
{%img /images/blog/error-01.gif %}

其实这个问题归根到底还是对GitHub的工作原理不了解导致的。`octopress/_deploy`目录其实就是对应着master分支，其下的`.git`目录则对应着远程的master库。解决方法：（关键是一定要进入到`_deploy/`目录。）
<!-- more --> 

{%img /images/blog/error-02.gif %}

###问题2：把`_deploy/`目录整个删掉了怎么办
<pre><code>
$ rake setup_github_pages</code>
</pre>
这样就会生成`_deploy/`目录，以及将其设为master分支，并对应远程仓库。