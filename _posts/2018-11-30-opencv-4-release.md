---
title: OpenCV 4.0 发布了！
date: 2018-11-30 21:16:06 +0800
author: Deyu
categories: 图像和视觉
tags: opencv 图像和视觉
---

![OpenCV](https://opencv.org/assets/theme/logo.png)

OpenCV 4.0 在十一月份发布了，其代码库在 11.18 就打上了 tag，而官方网站则是在 11.20 发布了这一消息。其实，按照计划，应该是在 7 月份就发布 4.0 的。好在虽有延迟，仍然赶在 2018 年完成了这一里程碑。

在之前的工作中，常常要与 OpenCV 打交道。现在更新了大版本，我也尽快尝了个鲜。（当然，还是有点晚了......）

<!--more-->

##### 开发环境
- Mac OS 10.14
- Xcode 10.1
- Build version 10B61
- Python 2.7.10 

##### 下载代码
我是直接克隆的代码库，如果不需要频繁更新，直接下载 [release](https://opencv.org/releases.html) 是比较好的选择。

值的注意的是，有时候下面的命令会失败：
```
> git clone https://github.com/opencv/opencv.git
```
在我的环境，把 https 替换成 git 则能够成功：
```
> git clone git://github.com/opencv/opencv.git
```
##### 编译安装
进入 OpenCV 项目的根目录，依次执行以下命令：
```
> mkdir b
> cd b
> cmake ..
> make -j4
> sudo make install
```
我使用了默认配置，什么都没有改。要改的同学可以看一下根目录下的 CMakeLists.txt 文件。

哈! 竟然一次通过，什么问题都木有！真让我意外~

##### 测试
Root 代表 OpenCV 项目根目录，进入 Root/samples/python，随便运行一个吧：
```
> python edge.py
```
咦？出错了......  ImportError: No module named cv2

在网上搜了以下，大概是找不到 cv2.so 的原因。cv2.so 用来支持 python 对 opencv 的调用。

我在自己的环境里找了一下，我的 cv2.so 在：
```
> /usr/local/python/cv2/python-2.7/cv2.so
```
这应该是 make install 默认放的位置，但是显然 python 找不到这个目录。所以我们可以在 /Library/Python/2.7/site-packages 下面建立一个链接文件。如下：
```
> sudo ln -s  /usr/local/python/cv2/python-2.7/cv2.so /Library/Python/2.7/site-packages/cv2.so
```
site-packages 默认就是 python 的查找路径。通常手动编译的一些 python 会放在这里。参考[这儿](https://stackoverflow.com/questions/31384639/what-is-pythons-site-packages-directory)。

再执行：
```
> python edge.py
```
又出错了(⊙﹏⊙)b，不过这次的问题是打开摄像头失败。但是程序很贴心的使用了图片代替视频，运行起来了。OK，这个问题以后解决，我们就当成功了吧~

##### 一些亮点
4.0 版本作为一个大版本更新，当然有不少亮点，下面列举一部分：
- 过渡到 C++11
- 移除了许多 OpenCV 1.x 中的 C API
- core 模块的持久化用 C++ 重写了，许多 C API 作废了
- 添加了 G-API 模块，
- dnn 模块包含了实验性质的 Vulkan 后端，并支持 ONNX 格式的网络
- 流行的 Kinect Fusion 算法进行了 CPU 和 GPU 的优化
- QR 的检测和解码被加入到了 objdetect 模块
- 高效率、高质量的 DIS 密度光流算法从 opencv_contrib 移到了 video 模块

##### 总结
OpenCV 4.0 变化还是挺大的，从 2.x 时代一直断断续续的使用 OpenCV，还是很有感情的。希望 OpenCV 越来越好，我也计划后续对 OpenCV 进行一个系统的学习。

&nbsp;
&nbsp;
