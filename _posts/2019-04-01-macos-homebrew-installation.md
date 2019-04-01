---
title: MacOS 如何安装 Homebrew
date: 2019-04-01 08:09:16 +0800
author: Deyu
categories: 开发环境及工具
tags: macos 工具
---

##### 系统环境

- MacOS Sierra 10.12.5

<!--more-->

##### 安装步骤

1.尝试执行下面的官方命令，但由于被墙的原因，基本会失败。失败了请继续往下看。
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```
2.把安装脚本下载下来先：
```
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install >> brew_install

```
3.修改脚本的下面一行内容：
```
把脚本中下面这一行：
BREW_REPO = "https://github.com/Homebrew/brew".freeze
修改地址为中科大的：
BREW_REPO = "https://mirrors.ustc.edu.cn/brew.git".freeze

```
4.执行脚本应该可以正确安装了。但是，直接安装软件有时候还是会出错。
5.执行下面的操作：
```
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile
$ brew update

```
6.之后应该就可以正常安装软件了。

##### 参考资料

- [更换 Homebrew 的更新源](https://mybestluck.com/index.php/2018/08/09/%E6%9B%B4%E6%8D%A2homebrew%E7%9A%84%E6%9B%B4%E6%96%B0%E6%BA%90/)
- [解决 Homebrew 安装错误](https://blog.csdn.net/qq_35624642/article/details/79682979)
- [Homebrew 官方网站](https://brew.sh/index_zh-cn.html)


&nbsp;
&nbsp;
