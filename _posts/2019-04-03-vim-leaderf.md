---
title: Vim 插件之 LeaderF
date: 2019-04-03 13:03:56 +0800
author: Deyu
categories: 开发环境及工具
tags: vim 工具
---

###### 1. LeaderF 介绍

[LeaderF](https://github.com/Yggdroot/LeaderF/blob/master/CHANGELOG.md) 是一个问世很长时间的 Vim 插件了，可是我直到最近才发现它，大有相见恨晚之感。它的基本功能是提供了文件、buffers、mrus（most  recently used）、tags 的检索，速度很快且是异步查找。检索过程中支持正则表达式、模糊匹配，并可以实时的过滤结果。

LeaderF 是用 Python 实现的，因此需要 Vim 支持 Python Feature。可以通过 vim --version 来查看是否支持 Python。

<!--more-->

###### 2. LeaderF 的安装

推荐使用 vundle 进行安装，vundle 的安装配置请参考其他资料。在 .vimrc 配置文件里增加下面的配置：

```
Bundle 'Yggdroot/LeaderF'
```

###### 3. 常用功能

- 检索文件：

```
<leader>f
```

- 检索 buffer：

```
<leader>b
```

- 在 LeaderF 运行起来以后（在正常检索的模式下），可以执行下面的一些操作：

```
<C-C>, <ESC> : 退出 LeaderF.
<C-R> : 在模糊匹配和正则式匹配之间切换
<C-F> : 在全路径搜索和名字搜索之间切换
<Tab> : 在检索模式和选择模式之间切换
<C-J>, <C-K> : 在结果列表里选择
<C-X> : 在水平窗口打开
<C-]> : 在垂直窗口打开
<C-T> : 在新标签打开
<C-P> : 预览结果
```

- 在 LeaderF 检索文件的模式下，如果按 Tab 进入选择列表之后，会有其他的快捷键，可以通过 F1 来查看。
- 集成 ripgrep 进行检索是 LeaderF 很强大的一个功能，rg 是异步的，比 vimgrep 要好很多。而且，对结果可以进行二次过滤：

```
:LeaderfRgRecall 显示上次 rg 的结果
:Leaderf rg 实时检索
:Leaderf rg [option] 后面的 [option] 和 rg 的语法保持一致
```

###### 4. 参考资料

- 可以在 vim 中使用  :help LeaderF 来查看其帮助文档。
- [LeaderF rg 介绍](https://vim-china.org/topic/24/vim%E7%9A%84grep%E6%8F%92%E4%BB%B6-leaderf-rg-grep%E5%92%8C%E6%A8%A1%E7%B3%8A%E5%8C%B9%E9%85%8D%E7%9A%84%E5%AE%8C%E7%BE%8E%E7%BB%93%E5%90%88)
- [ripgrep](https://github.com/BurntSushi/ripgrep/releases)
- [rg 路径匹配语法](https://docs.rs/globset/0.3.0/globset/#syntax)：

```
Standard Unix-style glob syntax is supported:

? matches any single character. (If the literal_separator option is enabled, then ? can never match a path separator.)
* matches zero or more characters. (If the literal_separator option is enabled, then * can never match a path separator.)
** recursively matches directories but are only legal in three situations. First, if the glob starts with **/, then it matches all directories. For example, **/foo matches foo and bar/foo but not foo/bar. Secondly, if the glob ends with /**, then it matches all sub-entries. For example, foo/** matches foo/a and foo/a/b, but not foo. Thirdly, if the glob contains /**/ anywhere within the pattern, then it matches zero or more directories. Using ** anywhere else is illegal (N.B. the glob ** is allowed and means "match everything").
{a,b} matches a or b where a and b are arbitrary glob patterns. (N.B. Nesting {...} is not currently allowed.)
[ab] matches a or b where a and b are characters. Use [!ab] to match any character except for a and b.
Metacharacters such as * and ? can be escaped with character class notation. e.g., [*] matches *.
```

&nbsp;
&nbsp;
