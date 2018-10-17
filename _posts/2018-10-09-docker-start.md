---
title: Docker Getting Started
subtitle: Docker 入门
author: Deyu
date: 2018-10-09 18:27:15 +0800
categories: 入门系列 
tag: docker
---

&nbsp;
&nbsp;
### Docker 是什么
-------
Docker 是什么上网搜一下就知道了，我只说说自己的体会。Docker 利用 Linux Kernel 提供的 cgroups, namespaces 等技术，构建类似沙盒的环境。在沙盒里你怎么搞破坏都没事，从而达到了与主机环境隔离的作用。也因为 Docker 采用的技术和虚拟机不同，它更轻量、更高效。

最初，Docker 主要用于 Linux。在 Windows 和 Mac OS 上使用 Docker 需要安装 Linux 虚拟机（用来运行 Linux containers）。但是到 2016 年， Windows 声明通过 Hyper-V 技术，Docker 可以 natively 了。Windows 上既可以运行 Linux container，也可以运行 Windows container 了。**技术在进步，不过，目前在 Linux 上运行 windows containers 或者在 Mac OS 运行 Linux 和 Windows containers 仍然是需要虚拟机？**

&nbsp;
### Docker 有什么用
-----------
不同的人有不同的需求，对我而言 Docker 解决了环境冲突的问题。我经常需要在许多软件的不同版本间切换，这导致我的开发环境一片混乱。Docker 让我可以根据不同的需求，创建 container 来解决这个问题，互不干扰。container 不仅仅是一个沙盒，他也可以提供对外的接口和服务，因此用途十分广泛。

&nbsp;
### Docker 常用到的命令
-----------
#### docker 配置

1. 查看 docker 信息:
```
docker info
```

2. 修改 Docker Root Dir
修改配置文件中的 graph 字段
[参考](https://docs.docker.com/v1.11/engine/reference/commandline/daemon/#daemon-configuration-file)

&nbsp;
#### image 的相关操作

1. 查找 image 
```
docker search ubuntu
```

2. 列出 image
```
docker image ls
docker images
```

3. 获取镜像
[参考](https://yeasy.gitbooks.io/docker_practice/image/pull.html)

4. 从 Docker 镜像仓库获取镜像的命令是 docker pull。其命令格式为：
```
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
具体的选项可以通过 docker pull --help 命令看到，这里我们说一下镜像名称的格式。"Docker 镜像仓库地址" 的格式一般是 <域名/IP>[:端口号]。默认地址是 Docker Hub。"仓库名" 如之前所说，这里的仓库名是两段式名称，即 <用户名>/<软件名>。对于 Docker Hub，如果不给出用户名，则默认为 library，也就是官方镜像。
```
```
$ docker pull ubuntu:16.04
16.04: Pulling from library/ubuntu
bf5d46315322: Pull complete
9f13e0ac480c: Pull complete
e8988b5b3097: Pull complete
40af181810e7: Pull complete
e6f7c7e5c03e: Pull complete
Digest: sha256:147913621d9cdea08853f6ba9116c2e27a3ceffecf3b492983ae97c3d643fbbe
Status: Downloaded newer image for ubuntu:16.04
```

5. 以一个容器为基础创建 image
```
docker commit -m "change somth" -a "somebody info" container_id(docker ps -a 获取 id) 新镜像名字
```
[参考](https://www.cnblogs.com/frankielf0921/p/5817928.html) 

6. 删除镜像
```
docker image rm 名字
```
注意：只有删除了所有的相关 container，才能删除镜像。

&nbsp;
####  container 的相关操作

1. 列出 container
```
docker container ls      列出正在运行的 containner
docker container ls -l   列出最新创建的 containner
docker container ls -a   列出所有的 containner
```
docker container ls 等同于 docker ps

2. 创建 container
```
docker run -t -i ubuntu:14.04 /bin/bash 
```
其中，-t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， -i 则让容器的标准输入保持打开。注意，该命令会生成一个全新的 container。

3. 启动 container
```
docker container start
```
将一个已经终止的容器启动运行。前面的 docker container run 命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用 docker container start 命令，它用来启动已经生成、已经停止运行的容器文件。

4. 执行 container
```
docker container exec -it [containerID] /bin/bash　 ##docker container 
```
exec 命令用于进入一个正在运行的 docker 容器。如果 docker run 命令运行容器的时候，没有使用 -it 参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。

5. 删除 container
```
docker container rm [containerID] 
```
如果在运行容器的时候，加上了 --rm 参数，则会在容器终止运行后自动删除容器文件。

6. 修改 container 的名字
```
docker container rename old_name new_name
```
或者在 docker run 从镜像创建容器的时候，加上 --name 选项来指定名字。

7. 主机与容器的文件传输
```
sudo docker cp host_path containerID:container_path		// 从主机复制到容器
sudo docker cp containerID:container_path host_path		// 从容器复制到主机
```

8. 容器端口映射
```
docker port <images id> [port] 命令可以让我们快捷地查看端口的绑定情况
docker run 的 "大写 -P" 参数可以自动映射端口，这个还没有实际用过
docker run 的 “小写 -p” 参数可以映射 主机端口:容器端口，可以有多个 -p 参数。
```
```
// 例子
docker run -it --name site2 -v /home/deyu/lab/xudeyu.github.io/_site:/root/_site -p 12345:4000 ubuntu /bin/bash
```

9. 容器卷映射
```
docker run -v 主机目录:容器目录。可以指定多个 -v 参数，从而映射多个卷。例子参考上文。
```

10. 显示 GUI
```
// 主机连接本机的 Container
docker run -it -v /etc/localtime:/etc/localtime:ro -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY -e GDK_SCALE -e GDK_DPI_SCALE --device /dev/snd --name opencv330 769266b15f71 /bin/bash
```
```
// 在 HOST 端需要开启
$ sudo apt-get install x11-xserver-utils
$ xhost +
```
    [参考1](https://www.csdn.net/article/2015-07-30/2825340)
    [参考2](https://blog.csdn.net/ericcchen/article/details/79253416)
    [参考3](https://blog.jessfraz.com/post/docker-containers-on-the-desktop)
    [参考4](http://blog.daocloud.io/dockercon-day-2-jessie-image)

11. 退出容器
```
docker container kill
docker container stop　前面的docker container kill命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。而docker container stop命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。
```
在容器里执行 exit, 此时容器处于停止状态 

12. 查看容器 LOG
```
docker container logs [containerID]
```
docker container logs命令用来查看 docker 容器的输出，即容器里面 Shell 的标准输出。如果docker run命令运行容器的时候，没有使用 -it 参数，就要用这个命令查看输出。

&nbsp;
### Docker 遇到的问题
------
1. 在 docker 中部署了 jekyll，启动服务监听了 127.0.0.1:4000 端口。虽然容器的 4000 端口已经映射到了 host:4000，但是却无法在 host 端通过 4000 端口访问该服务。

   解答：由于监听了 127.0.0.1 为一个回环地址，只能接受本机的访问。因此，无法通过 host 访问。改成 0.0.0.0 可以访问，但是 css 文件找不到了。这应该是另一个问题了。

   [参考1](https://stackoverflow.com/questions/20778771/what-is-the-difference-between-0-0-0-0-127-0-0-1-and-localhost)
   [参考2](https://serverfault.com/questions/78048/whats-the-difference-between-ip-address-0-0-0-0-and-127-0-0-1)

&nbsp;
### 参考资料
------
[电子书][ref1]
[基本命令查询][ref2]
[官方文档][ref3]
[博客介绍][ref4]

[ref1]: https://yeasy.gitbooks.io/docker_practice/  "gitbook 中文电子书"
[ref2]: http://www.runoob.com/docker/docker-tutorial.html "菜鸟教程"
[ref3]: https://docs.docker.com/get-started
[ref4]: http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html "阮一峰博客介绍 Docker"








