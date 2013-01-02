---
comments: true
date: 2012-01-26 01:25:59
layout: post
slug: remove-your-leftover-git-tracking-branches
title: 'Remove your leftover git tracking branches '
categories:
- git
tags:
- git
---

Today I was helping out a co-worker with a git problem and when I looked at the branches in his repository (using "git status -a") I didn't see what I expected.  There were dozens and dozens of remote tracking branches in his repository that shouldn't have been there. All the branches that the team had developed in the last year still existed locally (as tracking branches) even though they had been deleted remotely by another developer. So I showed him the following git command:

```
git remote prune origin
```

This will delete any remote tracking branches that have been deleted in the remote repository (if your remote name is different replace "origin" with your remote name).

As a result "git status -a" now shows what I expect on my co-worker's machine. This is a great little command when you work with a repository that has many remote feature branches created and deleted on a regular basis. I usually run the command every few weeks but it really only needs to be run when you think you think your git closet needs a little _declutter_ing .  The syntax is a little cryptic, so it's a good idea to [alias](http://davidwalsh.name/git-aliases) it!
