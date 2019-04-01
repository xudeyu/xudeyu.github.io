---
title: Vim 中 Tab, Window, Buffer 概念和操作
date: 2019-04-01 08:03:55 +0800
author: Deyu
categories: 开发环境及工具
tags: vim 工具
---

###### 概念
------
执行 ```:help window```可以在 VIM 文档中得到如下解释：

-  A buffer is the in-memory text of a file.
-  A window is a viewport on a buffer.
-  A tab page is a collection of windows.

所以，用自己的话概括一下。

- buffer 是载入到内存的文件内容，可以修改、保存等等。一个文件只有一份。
- window 是用来显示 buffer 内容的。
- tab 页是用来管理 windows 的，可以组织 window 的布局等等。

<!--more-->

###### Buffer 常用操作
------------
- 直接打开文件编辑
```
:e[dit] [++opt] [+cmd] {fname}
```
- 添加文件命到 buffer list，但并不载入。
```
:bad[d] [+lnum] {fname}
```
- 从 buffer 删除文件，! 为强制删除，N 为 buffer 的序号，bufname 为 buf 列表中显示的名字。
```
:bd[elete][!] [N] 
:bd[elete][!] {bufname}
:N,Mbd[elete][!]
 ```
 - 打开 buffer 列表中的一个 buffer
 ```
 :[N]b[uffer][!] [+cmd] [N]
 :[N]b[uffer][!] [+cmd] {bufname}
 :[N]sb[uffer] [+cmd] [N]
 :[N]sb[uffer] [+cmd] {bufname}
 ```
 下面的命令也都可以加 s 来 split window
 ```
 :[N]bn[ext][!] [+cmd] [N]
 :[N]bp[revious][!] [+cmd] [N]
 :bf[irst][!] [+cmd]
 :bl[ast][!] [+cmd]
 ```
 ```
 :[N]bm[modified][!] [+cmd] [N]
 ```
 - 打开 buffer list 中全部的 buffer，下面的第一个是只打开已经 loaded 的 buffer，N 可以指定最大数目
 ```
 :[N]unh[ide] [N]
 :[N]ba[all] [N]
 ```
 - buffer 切换的相关操作。制定 N 会跳到特定序号的 buffer。不指定 N 会在上一个 buffer 来回切换（被标为 # 的 buffer）。实测按 CTRL + 6 就可以了。
 ```
 [N] CTRL - ^
 ```
 - 显示所有已经载入的 buffer，特殊的 buffer 比如：help 并不会在这个列表里，因为它属于 unlisted-buffer，详情见文档特殊 buffer 部分。不过如果加上 ! 标志位，那么会列出所有的 buffer
 ```
 :ls[!] [flags]
 ```

 ###### Window 常用操作
 - 打开一个空白窗口
 ```
 :new
 :vnew
 ```
 - 用多个窗口打开多个文件, 用 N 个窗口
 ```
 vim -o/O[N] file1 file2 file3
 ```
 - 退出窗口
 ```
 :{count}q[uit]!
 CTRL-W q
 ```
 - 关闭窗口
 ```
 :clo[se][!]
 CTRL-W c
 ```
 - 保留当前窗口，退出其他窗口
 ```
 :only
 CTRL-W o
 ```
 - 拆分窗口
 ```
 :[N]sp[lit] [++opt] [+cmd] [file]
 :[N]vsp[lit] [++opt] [+cmd] [file]
 ```
 - 窗口之间跳转
 ```
 CTRL-W j/k/h/l/w
 ```
 - 移动窗口
 ```
 CTRL-W r/R 轮换窗口交换
 CTRL-W x/X 与相邻窗口交换
 ```
 - 调整窗口大小
 ```
 CTRL-W =   等分窗口
 CTRL-W _   当前屏幕高度扩展到最大, (shift + -)
 CTRL-W |   当前屏幕宽度扩展到最大, (shift + \)
 CTRL-W >/< 调整宽度
 CTRL-W +/- 调整高度
 ```
 - 多个 window 可以编辑同一个 buffer，而且他们可以同步显示。修改一个另一个也会跟着变化。
 ###### Tabpage 常用操作
 - 打开一个标签页
 ```
 :[count]tabe[dit] [++opt] [+cmd] {file}
 ```
 - 关闭标签页
 ```
 :{count}tabc[lose][!] 关闭当前标签页
 :{count}tabo[nly][!]  关闭其余标签页
 ```
 - 跳转标签页
 ```
 {count}gt 正向跳转到第 count 个 page，第一个标签页是 1
 {count}gT 反向跳转到第 count 个 page
 :tabr[ewind] 跳到第一个
 :tabl[ast]   跳到最后一个
 ```
 - 列出所有标签页
 ```
 :tabs
 ```
 - 移动标签页
 ```
 :tabm[ove] [N] 移动到第N个页面位置
 :tabm[ove] +/-[N] 向前或向后移动N个位置
 ```
 - 对多个标签页执行同一个命令
 ```
 :[range]tabd[o] {cmd}  所有标签页号在 range 范围内的标签，都会执行 cmd。
 ```
 - 用多个标签页打开多个文件
 ```
 vim -p file1 file2 file3
 ```
 ###### 帮助
 ----
 在 VIM 中，可以通过下面的帮助命令，来查看相关的帮助文档。
 ```
 :help window
 :help tabpage
 ```

&nbsp;
&nbsp;
