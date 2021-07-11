---
title: Vim ���֮ coc-nvim
date: 2021-07-11 09:01:00 +0800
author: Deyu
categories: ��������������
tags: vim ����
---

#### ʲô�� coc-nvim

coc-nvim ��һ��֧�� LSP �Ĳ����������ʹ vim �߱��˴��벹ȫ���﷨��飬��ǩ��ת�ȹ��ܡ�

#### ʲô�� LSP

The Language Server Protocol (LSP) defines the protocol used between an editor or IDE and a language server that provides language features like auto complete, go to definition, find all references etc.

���� LSP ��һ��Э�飬�����˱༭�������Է������Ľ����������Է���������ͨ�����ֽ���Ϊ�༭���ṩ��Ӧ���ԵĹ��ܣ����磺�Զ���ȫ����ת�����壬�ҵ�����λ�õȵȡ�

<!--more-->

LSP �����ʲô�����أ�������˵������� N �����ԣ�M �ֱ༭�����ͻ�������� NxM ���Ĳ�����߳�������֧���ض��������ض��༭���µ�һЩ���ܣ����Ǻܿ����ǻ������ݵġ�

����༭��������ģ�ͳ���Ҳ�������Է�������ͨ��һ����׼�� protocol ���н�������ô�༭���������ע�������ԣ����Է�����Ҳ�����ע�༭�����ԣ���˾��ְ�����ֻ��Ҫ M + N ����ϴ��ھ�����������������󳡾������ protocol ���� LSP.

- [Language Server Protocol](https://docs.microsoft.com/en-us/visualstudio/extensibility/language-server-protocol?view=vs-2019)
- [LSP + Swift ��һЩԭ���Խ���](https://blog.csdn.net/weixin_33727510/article/details/87960563)
- [LSP ֧���б�]��https://blog.csdn.net/u012930117/article/details/79291677��



#### ��ΰ�װ coc-nvim

���ڹ�������ԭ�򣬰�װ coc-nvim ������һ�㿲���ģ�ϣ����Ҷ�һ�������ˡ�

1 ���ȿ��԰�װһ�� [vim-plug](https://github.com/junegunn/vim-plug) , ����һ���������Ĺ��ߣ������� vundle��֧���첽�����ذ�װ���ٶȸ��졣����Ѿ���װ�� vundle Ҳ�ǿ��Ե�

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
#### 199.232.28.133 raw.githubusercontent.com
```

- ���⣱��ִ������������޷����� raw.githubusercontent.com��ͨ���� hosts �ļ������Ӷ�Ӧ�� IP �����

2 Ȼ���ǰ�װ [coc-nvim](https://github.com/neoclide/coc.nvim)���� .vimrc ����������Ĳ�������� coc-nvim��Ȼ��ִ�� :PlugInstall ���ɡ�

```
#### vim-plug
call plug#begin('~/.vim/plugged')
Plug 'neoclide/coc.nvim', {'branch': 'release'}
call plug#end()

#### vundle
#### Plugin 'neoclide/coc.nvim'
```

- ���⣱��Vim �汾��Ҫ 8.0 ���ϣ�����Ҫ֧�� python

  �ҵ� Vim �� 7.x�����ѡ�������±��밲װ�°汾�� [Vim](https://github.com/vim/vim) ������Ҫע�⣬���±���ʱҪ���� python ֧�֣�

  ```
  ## ֻ��Ҫ���� python2 or python3 ����һ������
  ## https://stackoverflow.com/questions/23023783/vim-compiled-with-python-support-but-cant-see-sys-version
  
  ./configure --enable-pythoninterp --enable-python3interp --with-python-config-dir=/usr/lib64/python2.7/config --with-python3-config-dir=/usr/lib64/python3.3/config --with-x --with-features=huge
  
  ## ���� vim ��ʱ��������� Python.h: No such file or directory �����⣬����԰�װ sudo apt-get install python-dev ���
  ```

- ���� 2��PlugInstall ��ʱ���޷�����

  ͨ���滻 plug.vim �ű��е� github.com Ϊ fastgit.org �����[�ο�����](https://blog.csdn.net/htx1020/article/details/114364510)

  ```
  let fmt = get(g:, 'plug_url_format', 'https://git::@github.com/%s.git')
  #### ��Ϊ ->
  let fmt = get(g:, 'plug_url_format', 'https://git::@hub.fastgit.org/%s.git')
  
  \ '^https://git::@github\.com', 'https://github.com', '')
  #### ��Ϊ ->
  \ '^https://git::@hub.fastgit\.org', 'https://hub.fastgit.org', '')
  ```

- ���� 3����Ҫ��װ  [nodejs](https://nodejs.org/en/download/) >= 12.12

  ```
  curl -sL install-node.now.sh/lts | bash
  #### �����ʾȨ�����⣬��Ҫ�� bash ǰ��� sudo
  ```



3 ��װ���Բ�������Է�����

coc-nvim ������ֻ�ǿ�ܣ���Ҫ��װ��Ӧ���Ե� [coc extension](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions) �ͷ����������� LSP ��Ч��python ���������ϱȽ϶࣬������ c/c++ Ϊ���� [�ο�ҳ��1](https://zhuanlan.zhihu.com/p/303223404)��[�ο�ҳ��2](https://www.jianshu.com/p/49e3ef6f25bc)

C/C++ ��Ӧ����չΪ coc-clangd����װʹ�� :CocInstall coc-clangd ����.  LSP Ϊ clangd����װ��ʽ���£�

```
# ��github����Clangd
wget https://github.com/clangd/clangd/releases/download/11.0.0/clangd-linux-11.0.0.zip

# ��ѹ�ļ�
unzip clangd-linux-11.0.0.zip
mv clangd_11.0.0/ /usr/share/

# ���������Ӳ�����
ln -s /usr/share/clangd_11.0.0/bin/clangd /usr/bin/clangd
clangd
```



&nbsp;
&nbsp;
