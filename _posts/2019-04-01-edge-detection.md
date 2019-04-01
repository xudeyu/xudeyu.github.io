---
title: 图像边缘检测
date: 2019-04-01 07:55:18 +0800
author: Deyu
categories: 图像和视觉
tags: 图像和视觉
---

#### 一. 图像边缘

图像边缘，（不严谨的说）通常就是指图像中灰度在一个小范围内有一个剧烈变化的部分。因为不同的实际需求对边缘的定义很可能并不相同，所以我们也不必纠结于细节。下面有一些边缘形状的的例子，其中的高低可以看作是灰度值的大小：

<!--more-->

![边缘的类型](https://img-blog.csdnimg.cn/20190211205937317.png)

边缘通常比图像中的其他特征（颜色，纹理）包含更多的有用信息，因此边缘检测一直是很重要的课题。尤其是如何把边缘同其他特征（纹理，噪声）区分开来，是很关键的。对于图像中对象的识别和定位，边缘检测是一个基本的工具。它也是图像分割过程的一部分。

通常边缘检测都会首先对噪声进行处理。噪声一般是随机的，但有两种类型的噪声在图像分析中常常使用：
- 信号无关的，一般可用带有特定平均值和标准偏差的概率分布来表示，比如高斯分布。
- 信号相关的，图像中每一点噪声的大小为这一点灰阶值的函数。

边缘和噪声像素都具有的特点是比周围的像素有明显的灰阶变化。而边缘像素互相连接，构成等高线。可以据此区分噪声和边缘像素。

#### 二. 检测方法

边缘检测的方法很多，新方法也在不断地涌现出来。一些旧方法已经不太常用了，例如：基于直方图分析，常用的有一下几种：

###### 1.一阶微分算子

一阶微分算子一般是通过梯度来进行边缘检测，下图就是利用梯度（一阶导数）检测的例子：

![阶跃式边缘和梯度的对应变化](https://img-blog.csdnimg.cn/20190211212148607.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzE2Mjc0NQ==,size_16,color_FFFFFF,t_70)

![屋顶式边缘和梯度的对应变化](https://img-blog.csdnimg.cn/20190211212255562.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzE2Mjc0NQ==,size_16,color_FFFFFF,t_70) 

这类算子包括：Roberts 算子，Prewitt 算子，Sobel 算子，Kirsch 算子等。

###### 2.二阶微分算子

二阶微分的特性是，在导数的极值点为零，极值点两侧为异号。由于其对细微的边缘也能很好的响应，所以应用广泛。但其缺点也很明显，就是对噪声的响应也会很强烈。

![一阶导数和二阶导数](https://img-blog.csdnimg.cn/20190213105926535.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzE2Mjc0NQ==,size_16,color_FFFFFF,t_70)

这类算法包括：Laplacian 算子，LoG 算子，Canny 算子等。

###### 3.其他算法

基于小波的边缘检测算法等等。

另外，也可以按如下方式分类：
- 导数算子
- 模版匹配
- 边缘的数学建模，当然也要尽量把噪声因素考虑进去

#### 三. 参考资料

[参考一](https://blog.csdn.net/qq_18815817/article/details/78625845)
[参考二](https://blog.csdn.net/chaolei3/article/details/79809703)
[参考三](https://wenku.baidu.com/view/88876b17a9956bec0975f46527d3240c8447a185.html)
[参考四](https://wenku.baidu.com/view/b04b31db6e1aff00bed5b9f3f90f76c661374c08.html)

&nbsp;
&nbsp;
