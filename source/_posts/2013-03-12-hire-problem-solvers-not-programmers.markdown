---
layout: post
title: "Hire problem solvers not programmers"
date: 2013-03-12 10:27
comments: true
categories:
---

One of my first jobs in software was building an enterprisey [SaaS](http://en.wikipedia.org/wiki/Software_as_a_service) product.
I joined a team of about 10 people that was pretty evenly distributed between
Junior and Senior developers. 

One of the first bugs I got assigned was to update the copyright year in the
footer of the application. Easy enough. I got familiar with the file structure (it
was a pretty hefty app!) and found the footer ASP page that I needed to change.

I noticed that the copyright was using a static year like so: 

```html
  <strong>Copyright 2005</strong>
```

I found that strange since if I
just simply replaced the year we would have to go through this again next year. 
Thus creating the dreadful, **perpetual bug**.

(*Maybe there could be some value in having this recurring bug for new developers to get familiar
with the code base or see if they really fix the issue, but this was definitely not the case here.*)

I decided to check out the logs in [Visual Source Safe](http://en.wikipedia.org/wiki/Microsoft_Visual_SourceSafe)
to see what was going on (which was the worst!).

{% img /images/posts/vss.jpg %}

photo credit: <a href="http://www.flickr.com/photos/ern/471587728/">ern</a> via
<a href="http://photopin.com">photopin</a> <a
href="http://creativecommons.org/licenses/by-nc-sa/2.0/">cc</a>

I found out that every year someone manually updated the copyright date! This
was going on for over 5 years. This meant someone (QA, client, etc.) reported
and filed the bug, someone else prioritized it, a developer "fixed" it, and it
was tested and released. 
I use the term **fixed** lightly here. For a company that was limited on
resources there sure was a lot of waste.

So I changed the footer to show the date based on the current year and this bug never
came back.

This is a simple example but these are the decisions that are made by
software(web) developers (programmers/engineers/etc.) on a daily basis.

Of course you don't want to to over engineer something as we all know. But in some cases
it's more time consuming to not use the best approach available. 

This is one of the differences between a problem solver and a programmer.
Looking beyond the code to the see what effects flipping of a bit will have over time.

I would hire a Junior problem-solver over a Senior programmer any day of the
week.


