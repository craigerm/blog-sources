---
comments: true
date: 2012-01-29 20:32:40
layout: post
slug: share-your-bashrc-and-vimrc-across-multiple-machines
title: Share your .bashrc and .vimrc across multiple machines
categories:
- linux
- vim
tags:
- command line
- vim
---

Recently I decided to cross to the dark side (or see the light, depending on whom you ask!) and start using vim. I'm just finishing up a month long challenge using vim for any file editing outside of Visual Studio - so far it's working out extremely well and I am going to continue using all the almighty one that is vim!

One problem I had during this learning experience is that my .vimrc file was starting to grow and I had  to maintain different versions across different boxes - especially since every day I was (and am) changing something in my .vimrc file. I have a .vimrc file for my work PC, my home PC (Windows + Linux), and my home laptop (Linux). I also had the same problem  sharing my .bashrc files across these machines. On windows I use [cygwin](http://www.cygwin.com/) as my command line shell. I will talk about how to set this up on a Linux environment, not on plain windows.

The first thing I would recommend is storing your configuration files on [github](http://github.com). This way you can clone these files from any computer you like. And <del>if</del> when your  amazingly fast SSD crashes or your computer just blows up you don't have to start from scratch.

Once you have a folder (I keep them in ~/configs) for your configurations you can use[ symbolic links ](http://en.wikipedia.org/wiki/Symbolic_link)to easily link the location of the files inside your repository. Go to your home folder and type the following commands:


```
ln -s ~/configs/.bashrc .bashrc
```

```
ln -s ~/configs/.vimrc .vimrc
```


Change "~/configs" to wherever your local git repository is located. This will link the files needed by bash and vim to load the config files from your repository. Running bash or vim should have the correct configurations as you expect. You might need to delete the original .bashrc and .vimrc inside your home folder. By careful that you don't have anything in these files that you haven't added to git.

When you change your .bashrc or .vimrc file on one machine you can commit and push them to github and just pull them from your other boxes. Easy peasy!  This also allows you to add comments to your commit so you can easily remember what and why you have made the change. And next  year when you buy a new laptop getting back to speed with your command line and vim configurations is as easy as checking out your repository and creating the symbolic links again. You could always create a new computer script that does all this for you and store that in github. But I'll leave that as an exercise for the reader :).

Since lots of vim plugins use github you could experiment using git submodules (if you dare!) to maintain the plugins you use for vim. This way when you update your sources on one machine it will grab any third party vim plugins that you use - instead of installing those manually. Hopefully everyone is using [pathogen](https://github.com/tpope/vim-pathogen) to maintain vim plugins? :) If you have an awesome'er way of maintaining your config files or vim plugins please let me know!
