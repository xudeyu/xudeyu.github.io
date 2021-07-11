---
title: Vim 插件之 coc-nvim
date: 2021-07-11 09:01:00 +0800
author: Deyu
categories: 开发环境及工具
tags: vim 工具
---

#### 什么是 coc-nvim

coc-nvim 是一款支持 LSP 的插件，这个插件使 vim 具备了代码补全，语法检查，标签跳转等功能。

#### 什么是 LSP

The Language Server Protocol (LSP) defines the protocol used between an editor or IDE and a language server that provides language features like auto complete, go to definition, find all references etc.

首先 LSP 是一种协议，定义了编辑器和语言服务器的交互。而语言服务器可以通过这种交互为编辑器提供对应语言的功能，诸如：自动补全，跳转到定义，找到引用位置等等。

<!--more-->

LSP 解决了什么问题呢？正常来说，如果有 N 种语言，M 种编辑器，就会存在至少 NxM 个的插件或者程序，用以支持特定语言在特定编辑器下的一些功能，他们很可能是互不兼容的。

如果编辑器和语言模型程序（也就是语言服务器）通过一个标准的 protocol 进行交互，那么编辑器将无需关注语言特性，语言服务器也无需关注编辑器特性，各司其职。最多只需要 M + N 种组合存在就足以满足任意的需求场景。这个 protocol 就是 LSP.

- [Language Server Protocol](https://docs.microsoft.com/en-us/visualstudio/extensibility/language-server-protocol?view=vs-2019)
- [LSP + Swift 有一些原理性介绍](https://blog.csdn.net/weixin_33727510/article/details/87960563)
- [LSP 支持列表]（https://blog.csdn.net/u012930117/article/details/79291677）



#### 如何安装 coc-nvim

由于国内网络原因，安装 coc-nvim 还是有一点坎坷的，希望大家多一点耐心了。

1 首先可以安装一下 [vim-plug](https://github.com/junegunn/vim-plug) , 这是一个管理插件的工具，类似于 vundle，支持异步的下载安装，速度更快。如果已经安装了 vundle 也是可以的

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
#### 199.232.28.133 raw.githubusercontent.com
```

- 问题１：执行上面的命令无法解析 raw.githubusercontent.com，通过在 hosts 文件中增加对应的 IP 来解决

2 然后是安装 [coc-nvim](https://github.com/neoclide/coc.nvim)。在 .vimrc 中配置所需的插件，包括 coc-nvim。然后执行 :PlugInstall 即可。

```
#### vim-plug
call plug#begin('~/.vim/plugged')
Plug 'neoclide/coc.nvim', {'branch': 'release'}
call plug#end()

#### vundle
#### Plugin 'neoclide/coc.nvim'
```

- 问题１：Vim 版本需要 8.0 以上，并且要支持 python

  我的 Vim 是 7.x，因此选择了重新编译安装新版本的 [Vim](https://github.com/vim/vim) 。这里要注意，重新编译时要开启 python 支持：

  ```
  ## 只需要开启 python2 or python3 其中一个即可
  ## https://stackoverflow.com/questions/23023783/vim-compiled-with-python-support-but-cant-see-sys-version
  
  ./configure --enable-pythoninterp --enable-python3interp --with-python-config-dir=/usr/lib64/python2.7/config --with-python3-config-dir=/usr/lib64/python3.3/config --with-x --with-features=huge
  
  ## 编译 vim 的时候，如果遇到 Python.h: No such file or directory 的问题，则可以安装 sudo apt-get install python-dev 解决
  ```

- 问题 2：PlugInstall 的时候无法下载

  通过替换 plug.vim 脚本中的 github.com 为 fastgit.org 解决，[参考此贴](https://blog.csdn.net/htx1020/article/details/114364510)

  ```
  let fmt = get(g:, 'plug_url_format', 'https://git::@github.com/%s.git')
  #### 改为 ->
  let fmt = get(g:, 'plug_url_format', 'https://git::@hub.fastgit.org/%s.git')
  
  \ '^https://git::@github\.com', 'https://github.com', '')
  #### 改为 ->
  \ '^https://git::@hub.fastgit\.org', 'https://hub.fastgit.org', '')
  ```

- 问题 3：需要安装  [nodejs](https://nodejs.org/en/download/) >= 12.12

  ```
  curl -sL install-node.now.sh/lts | bash
  #### 如果提示权限问题，需要在 bash 前面加 sudo
  ```



3 安装语言插件和语言服务器

coc-nvim 基本上只是框架，需要安装对应语言的 [coc extension](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions) 和服务器才能让 LSP 生效。python 的网上资料比较多，这里以 c/c++ 为例。 [参考页面1](https://zhuanlan.zhihu.com/p/303223404)　[参考页面2](https://www.jianshu.com/p/49e3ef6f25bc)

C/C++ 对应的扩展为 coc-clangd，安装使用 :CocInstall coc-clangd 即可.  LSP 为 clangd，安装方式如下：

```
# 从github下载Clangd
wget https://github.com/clangd/clangd/releases/download/11.0.0/clangd-linux-11.0.0.zip

# 解压文件
unzip clangd-linux-11.0.0.zip
mv clangd_11.0.0/ /usr/share/

# 创建软连接并启动
ln -s /usr/share/clangd_11.0.0/bin/clangd /usr/bin/clangd
clangd
```



&nbsp;
&nbsp;
