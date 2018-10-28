---
title: GitHub Pages 和 Jekyll 建站入门
date: 2018-10-28 19:05:07 +0800
author: Deyu
categories: 入门系列
tags: github jekyll 入门系列
---

## 一. 背景介绍

如今是互联网时代，谁不想拥有一个自己的网站呢？可是，真要建站却没有想的那么简单。除了金钱成本，时间成本也不小。维护网站，多多少少都需要学习一点儿相关知识。

其实，博客平台在一定程度上满足了这个“刚需”，但它和真正的个人网站还有差距。因此，GitHub 早就推出了 GitHub Pages 服务。它既保留个人网站的灵活性，又降低了建站的成本。它不需要数据库，也不需要配置服务器，更不需要花钱买空间。一切都可以通过免费的 GitHub 库进行管理，实在可谓良心了。

当然，GitHub Pages 提供的是静态网站托管服务。简言之，它更适合发布内容，而不是做复杂的业务。 它的前端足够灵活，已经可以满足绝大多数个人网站的需求了。

GitHub Pages 背后的静态网站生成引擎是 Jekyll。因此，本文多多少少也会提到它。


## 二. GitHub Pages

#### 如何创建网站？
1. 访问 [GitHub](https://www.github.com) 网站，注册一个账号。有账号直接登录就可以了。

2. 创建一个 GitHub 库，名字为：username.github.io。注意，这里的 username，**要替换成你自己账户的用户名**。而后面的 github.io 域名则是必须的，不能更改。

3. 使用 Git 克隆上面的库到本地：
```
git clone https://github.com/username/username.github.io
```
4. 在库的根目录建立一个文件 index.html，并随便在文件之中添加一些内容。比如：Hello World！

5. 提交并上传文件：
```
git add --all
git commit -m "Initial commit"
git push -u origin master
```
6. 稍等一会儿，然后访问：https://username.github.io 就可以了。

#### 要说明的几点
- 你要稍微懂点 Git。在 GitHub 上的一切操作都离不开 Git，因此最基本的克隆、提交、推送操作应该掌握。
- 如果你稍微懂一点 Web 开发方面的知识就会更加得心应手。比如上面建立的 index.html 文件，一般就是作为网站的欢迎页面。但你不懂也无所谓，因为 GitHub Pages 提供了不少漂亮的模板，可以直接使用。
- https://username.github.io 是你的默认域名，你也可以绑定自己的域名。在库的 Setting 设置里可以配置。
- username.github.io 库只能有一个，它被作为用户的个人网站。而对于用户的其他库，也可以配置相应的项目网站。只不过 URL 变为：http://username.github.io/repository 的形式。

## 三. Jekyll

Jekyll 的主要功能就是生成静态网站。我们在本地，通过 Jekyll 配置好网站模板和样式，push 到 Github 库中。GitHub Pages 服务会自动把代码生成网站。

此后，我们专注于内容就可以了。每次仅需要把新的文件提交到 GitHub 库，就完成了文章的发布。

Jekyll 涉及到的东西比较多，只能简单介绍一下了。

#### 安装 Jekyll

```
gem install jekyll bundler
jekyll new myblog
cd myblog
bundle exec jekyll serve
```
然后查看 [http://localhost:4000](http://localhost:4000/) 就可以了。

Jekyll 是用 Ruby 开发的，所以你需要 Ruby 环境。在 Linux 和 Mac OS 系统，一般都是直接带有 Ruby 环境的。

Gem 是一个 Ruby 程序和包的管理工具，可以下载 Ruby 开发需要的库。这有点类似于 Ubuntu 中的 apt，或 Mac OS 用的Homebrew。 

从上面的代码我们也可以看到，jekyll 自带了 web server。因此，当你启动了 server 之后，可以在本地查看网站。这也大大方便了测试。


#### Jekyll 基本用法

我是真心想介绍一下 Jekyll 基本操作的，但这个网站：[Jekyll 中文网站](https://www.jekyll.com.cn) 已经有很详细的资料了，而且还是中文的（感谢译者）。查阅很方便。我就不再赘述了。

#### Jekyll 实用建议

这一部分还值得我分享一下经验。请记住，最最最最重要的一点就是：**不要从头开始！不要从头开始！不要从头开始！**

使用 Jekyll + GitHub Pages 建站虽不那么难，但对于非程序员来讲，仍然谈不上容易。什么 Layout、Liquid、CSS、JavaScript... 我就问你蒙不蒙！更不要说对于普通人，不自带艺术细胞的，根本就做不出来好看的网站。配色啊、布局啊、LOGO 啊，哪个不需要点设计技巧？听我劝，如果你没有两把刷子，就不要从头开始建立网站，哪怕是静态网站！

在你的耐心被耗尽之前，尽快去找一个模板或者人家的站点，拷贝过来，运行起来。然后，发上一两篇文章，积累些满足感。想个性化？路还很长，慢慢来吧。前端专业人士请忽略我上面的言论。

###### 如何找现成的资源呢？

第一，可以去一些专门的网站下载：
- [Jekyll Theme 1](http://jekyllthemes.org/)
- [Jekyll Theme 2](https://jekyllthemes.io/)

第二，去 GitHub 上找人家做好的站点拿来用。许多人都精心打磨了自己的网站，因此通常都好看又实用。但是！！！**一定要和人家打声招呼！看看是否允许拷贝，是否有什么限制！直接剽窃别人的成果是让人鄙视的！**

###### 下载的资源怎么用？

下载的资源，通常都包含了我下面将会提到的目录结构。把这个目录的所有内容，统统拷贝到 myblog 目录下（前面提到的 jekyll new myblog 命令，myblog 就是项目的根目录）。然后执行 bundle exec jekyll serve 就可以在本地浏览网站了，和上面提到的一样。

###### 怎么上传到 GitHub？

Jekyll 自带服务器是为了方便本地查看和调试的，要让所有人都能访问，当然要传到 GitHub 上，也就是 username.github.io 库中。

前面提到了通过 git clone 命令把 Git 库克隆到本地了。现在，你只需要把之前 myblog 下的内容，拷贝到 git clone 下来的目录中（不用拷贝 _site 目录），然后按照前面 GitHub Pages 部分的内容，执行 git add，git commit，git push 就可以了。

#### Jekyll 必备知识

现在，你应该找到了一个自己喜欢的模板了。但你仍然需要了解一些必要的知识。

```
jekyll build
```
用来生成 _site 目录，也就是最终的站点。
- 可以用 --source, --destination 参数指定源目录和目标目录。*注意，目标路径会被清空，确保备份了重要文件。*
- 可以用 --watch, —no-watch 参数来指定是否监视目录的改变，如果 watch 了，改变了就会自动重新生成站点。但是，_config.yml 不会重新自动更新，只有重新运行才会再读取一次。

```
jekyll serve
```
用来启动本地服务器。启动之后，在浏览器默认访问 localhost:4000 就可以看到站点了。
- 可以 —detach 来从当前命令窗口分离，但是要结束就必须杀进程。
- 默认是 watch 的，自动生成修改，可以通过 —no-watch 关闭这个功能。

Jekyll 目录结构如下：
```
.
├── _config.yml
├── _data
|   └── members.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.md
|   └── on-simplicity-in-technology.md
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
|   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _sass
|   ├── _base.scss
|   └── _layout.scss
├── _site
├── .jekyll-metadata
└── index.html # can also be an 'index.md' with valid front matter
```
值得注意的有：
- _site，通过 Jekyll build 生成的站点目录。这个目录不需要修改，也不需要上传到 GitHub，因为 GitHub 会自己生成站点的。
- _posts，我们最常用到的目录，会存放我们的文章。通常是 markdown 文件。
- _config.yml，配置文件。很多选项既可以通过命令行指定，也可以在配置文件里指定。当然，在配置文件中指定更加方便一些。

## 结语

好了，基本上这些知识已经可以使你拥有一个个人网站了。GitHub Pages + Jekyll 建立的网站，足够发布内容之用。如果你想让网站个性十足，还是有必要深入学习一下 Jekyll 的。另外，最好不要重头建站。参考牛人的作品学习，会更有效率的。Enjoy it！


&nbsp;
&nbsp;
