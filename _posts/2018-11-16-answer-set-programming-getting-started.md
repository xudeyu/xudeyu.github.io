---
title: ASP（Answer Set Programming）编程入门
date: 2018-11-16 22:23:02 +0800
author: Deyu
categories: 入门系列
tags: ASP 入门系列
---

### ASP 是什么？
----
ASP 的全称是 Answer Set Programming，中文翻译为问答集编程。对于它的解释，有这么几个要点。

第一，它属于声明式编程的一种。声明式编程，简而言之就是告诉计算机你想“做什么”，而不是“怎么做”。SQL 是很多人都熟悉的声明式编程的例子。如果要从一个数字集合里找出所有小于10 的数字，怎么做？
```
select * from tab where val < 10
```
但如果是命令式编程，怎么做？
```
List result;
for i in collection {
    if (i < 10) {
        result.add(i);
    }
}
```
不要纠结语法，重点关注一下表达方式的区别。

<!--more-->

第二，它主要是针对复杂的搜索问题。搜索问题可能是从一些存储在数据结构中的数据里获取一些信息，也可能是计算满足某一问题约束所有可能的结果。前者比如说上面提到数据检索问题，后者比如说最短路径问题。

第三，它是基于稳定模型语义的逻辑编程。逻辑编程通常是指用一组逻辑语言（符号）来描述关于某个问题的事实和规则。而稳定模型语义是一个挺复杂的东西，可以看看[这篇文章][ref5]的介绍。这里面涉及到一个概念叫做失败即否定（[negation as failure][ref7] ）。我认为，它的意思就是，基于当前的事实和规则推断失败的，即为否定。当然，由于事实可能并不全面，在增加事实之后，结果可能不是否定的。这就又涉及到 “非单调推理” 的问题了，前面提到的博客里面有所涉及。

**一些参考概念**：
[编程范式][ref1]
[ASP][ref2]
[搜索问题][ref3]
[稳定模型语义][ref4]

&nbsp;

### 如何运行 ASP 程序
----
波茨坦大学开发了一个程序集，叫做 [Potassco][ref8]（Potsdam Answer Set Solving Collection）。其中的 clingo 可以用来运行 ASP 程序。

clingo 中有两个子程序：
- gringo 用来翻译用户写的逻辑程序
- clasp 用来求解

在官方网站上，有非常详细的文档介绍 Potassco，有兴趣的读者可以去参考。一般来讲，运行一个 ASP 程序就像下面这样一条命令：
```
$ clingo files/crime.lp
```
其中的 .lp 文件就包含了 ASP 代码。

在[这里][ref10]可以下载 clingo，在本地解压之后，目录下就有可执行程序了。

&nbsp;

### 如何编写 ASP 程序
----
在 Potassco 的文档里，有详细的语法说明。如果有时间，建议好好看看。我这里就简单的说一下思路。

一个简单的 ASP 程序可能包含三个部分：
- 事实
- 规则
- 输出

其中事实和规则部分，用来描述问题的。输出部分，用来查看结果。所以，前者是最重要的。整个 ASP 程序的核心目的就是：**把问题描述清楚了**，自然就能得到正确的结果。而 gringo 也提供了不少的语法符号，来帮助我们做到这一点。后面的章节我会拿出一个小例子来作说明。[这篇博客][ref9] 也介绍了很多基础知识。

&nbsp;

### 一个实例
----

![图1][res1]

```
% fact
p(1..4).

e(1, (3;4)).
e(2, 4).
e(3, (1;4)).
e(4, (1;2;3)).

% rule
c(X, Y) :- p(X), p(Y), not e(X, Y), X != Y.

% Display
#show c/2.
```
上面是一个非常简单的例子，仅供参考。我们来求图中没有边直接相连的点。

前 5 行代码是事实部分，它如实描述了 *图1* 的情况。p 表示点，e 表示边。p(1..4) 这种写法等同 p(1). p(2). p(3). p(4). 。其中 “.” 是一句代码的结束符。e(1, (3;4)). 等同于 e(1, 3). e(1, 4)，表示 1 到 3、4 有边。1..4 和 “;” 都是语法糖。

所以，事实部分就是在说，有 4 个点，并且他们之间有的有边，有的没有。

第 6 行代码是规则部分。“:-” 我们可以理解为：“如果它后面的条件成立，那么前面就成立”。而 “,” 则表示“并且”的意思。“not” 顾名思义，表示否定。所以 c(X, Y) 成立的条件就是：“有两个点 X 和 Y，他们之间没有边，并且 X，Y 不是同一个点。”

这样，我们发现，c(X, Y) 实际上就是要求的结果。所以，在最后一行输出了 c。这里 #show 表示输出，c/2 中的 c 表示 c(X, Y)，而 2 则表示 c 有两个元素。

这个程序的执行命令如下：
```
./clingo test -n 10
```
后面的 “-n 10” 表示输出多少个解。有时候，程序可能有不止一个解。但我们的程序只有一个解，下面是输出结果：
```
clingo version 5.3.0
Reading from test
Solving...
Answer: 1
c(2,1) c(1,2) c(3,2) c(2,3)
SATISFIABLE

Models         : 1
Calls          : 1
Time           : 0.001s (Solving: 0.00s 1st Model: 0.00s Unsat: 0.00s)
CPU Time       : 0.001s
```
上面的 c(2,1) c(1,2) c(3,2) c(2,3) 就是结果了。大家也可以思考一下，怎么能够让 c(2,1) 和 c(1,2) 只保留一个呢？

&nbsp;

### 参考资料
----

[资料1][ref11]
[资料2][ref12]
[资料3][ref13]
[资料4][ref14]

[ref1]: https://en.wikipedia.org/wiki/Programming_paradigm "  "
[ref2]: https://en.wikipedia.org/wiki/Answer_set_programming "ASP"
[ref3]: https://en.wikipedia.org/wiki/Search_algorithm "Search Problem"
[ref4]: https://en.wikipedia.org/wiki/Stable_model_semantics "Stable Model Semantics"
[ref5]: https://www.cnblogs.com/kinsang/p/6745163.html "博客"
[ref6]: https://blog.csdn.net/VinsmS/article/details/79779818 "博客"
[ref7]: https://en.wikipedia.org/wiki/Negation_as_failure "negation as failure"
[ref8]: https://potassco.org/ "Potassco"
[ref9]: https://blog.tuidao.me/2012/04/answer-set-programming/ "博客"
[ref10]: https://github.com/potassco/clingo/releases/ "下载 clingo"
[ref11]: https://blog.csdn.net/VinsmS/article/details/79779818 "博客"
[ref12]: https://en.wikipedia.org/wiki/Logic_programming  "逻辑编程"
[ref13]: https://www.cnblogs.com/sirkevin/p/8283110.html "编程范式"
[ref14]: https://potassco.org/doc/start/ "Getting Started"

[res1]: /assets/img/blog/2018-11-16-answer-set-programming-getting-started-illustration.png "图1"


&nbsp;
&nbsp;
