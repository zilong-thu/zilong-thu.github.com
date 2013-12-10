---
layout: post
title: "搭建Octopress博客过程中遇到的问题与解决方法"
date: 2013-11-01 12:43
comments: true
keywords: Octopress, 博客搭建, 问题解决, SEO
categories: Octopress
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

###如何在新建博文时添加关键字
尚不知道如何自动生成关键字，但是可以在运行`rake new_post['your_title']`的时候这样生成keywords选项，然后手动填写关键词：

在octopress的根目录下，找到Rakefile文件，打开，在100行左右有如下代码：

``` ruby
# usage rake new_post[my-new-post] or rake new_post['my new post'] or rake new_post (defaults to "new-post")
desc "Begin a new post in #{source_dir}/#{posts_dir}"
task :new_post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin("Enter a title for your post: ")
  end
  raise "### You haven't set anything up yet. First run `rake install` to set up an Octopress theme." unless File.directory?(source_dir)
  mkdir_p "#{source_dir}/#{posts_dir}"
  filename = "#{source_dir}/#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "comments: true"
    post.puts "categories: "
    post.puts "---"
  end
end
```

在post.puts "comments: true"下面添加这样一句代码即可：
    
	post.puts "keywords: "

可以参考

1. [Octopress 的 SEO 优化](http://havee.me/internet/2013-01/octopress-seo.html)

2. [SEO for Octopress Websites](http://xit0.org/2013/05/seo-for-octopress-websites/)

对于Octopress SEO技术，目前的文章大同小异。看上面两篇足够了。

###添加豆瓣侧边栏

所谓“豆瓣用户名”，可以是你在豆瓣的8位数字ID，也可以是你的登录邮箱。例如我的_config.yml文件是这样修改的。

  # Douban Books
  douban_user: ***@qq.com

参考：

[Octopress主题改造](http://shanewfx.github.io/blog/2012/08/13/improve-blog-theme/)

###*代码高亮功能
嗯，根据第二篇博文，重启电脑搞定。

参考这个： http://www.cnblogs.com/oec2003/archive/2013/05/27/3100896.html

http://jinlong.github.io/blog/2013/03/30/octopress-syntax-highlight/

代码高亮部分的CSS在`octopress\sass\base\_solarized.scss`文件里。

###个性化域名
我买了个域名，borninsummer.com，采取以下步骤：

+ 在source目录下创建CNAME文件，文件内容为 borninsummer.com
+ 主机记录：www，记录类型：CNAME，记录值：borninsummer.com
+ 主机记录：*，记录类型：A，记录值：207.97.227.245

博客无法访问。然后不更改CNAME文件，尝试如下设置：

+ 主机记录：www，记录类型：CNAME，记录值：borninsummer.com
+ 主机记录：*，记录类型：CNAME，记录值：zilong-thu.github.com

不知是否能生效，等待中。

经过10小时，未能生效。根据<a href="http://octopress.org/docs/deploying/github/" target="_blank">Octopress官方文档</a>：

> For a sub-domain like www.example.com you would simply create a CNAME record pointing at charlie.github.io..
>
> If you are using a top-level domain like example.com, you must use an A record pointing to 204.232.175.78.
> 
> Remember that it may take up to a full day for DNS changes to propagate, so be patient.

先尝试：

+ CNAME文件内容为 www.borninsummer.com 
+ 主机记录：www，记录类型：CNAME，记录值：zilong-thu.github.com
+ 不设置A记录

这样很快就生效了，大概10多分钟。所以说，官方文档很重要~~

###主题改造问题
####（1）transition
本来在custom/_styles.scss里写了这样的代码：

``` css
*{
  transition: color 0.6s ease, box-shadow 0.6s ease, border-color 0.6s ease, background-color .5s;
}
```
本意是希望基本上都要有过渡效果。但是由于`<html>`标签也是定义了颜色的，所以刷新至任意页面时，背景总是会闪一下。这样很难看。于是改成：

``` css
div,p,a,span,img{
  transition: color 0.6s ease, box-shadow 0.6s ease, border-color 0.6s ease, background-color .5s;
}
```
还是尽量将特效控制在明确的元素上比较好。