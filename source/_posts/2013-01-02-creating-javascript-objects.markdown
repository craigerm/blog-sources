---
layout: post
title: "Creating Javascript Objects: new vs {}"
date: 2013-01-02 08:15
comments: true
categories: [javascript]
published: false
---

Recently I had a discussion with someone about creating javascript objects.

There are two main ways of doing this:

```javascript
 // Method 1 - Using the new operator
 var obj1 = new Object();

 // Method 2 - Using the literal syntax
 var obj = {};
```

Now, most likely, you use the literal syntax. It is the standard that you will find
out in the wild most of the time. And this is the method I use. 

I started using the literal syntax way-back-when to save keystrokes. 
At some point I was told that it was faster so I continued to use it.
But I've never confirmed that it is actually faster.

So is it really faster or is this just one of those old wise tales?

Let's ask our dear friend [jsperf](http://jsperf.com) and see what we can find.

And I'm back :)

Ok, based on using ``new object()`` and ``{}`` for object instantiation here are the results:

{% img /images/posts/object-testcase.png %}
{% img /images/posts/object-results.png %}

Wow I didn't think it would be that much of a difference! Clearly the object literal is the way to go
since it's significantly faster.

I am only testing on the V8 javascript engine so maybe this won't apply to other browsers. 
I tried looking at the V8 source to see if I could'nt quickly find out exactly why this is happening
but with no luck.
My guess is that the constructor call is being executed for ``new`` and not for ``{}`` 
as an optimization trick for V8. When I have a more time I'd like to venture into the V8 source
and see what's going on. So if I find something I'll post it here.

From these results we can at least justifiably tell people that ``{}`` is not only easier on the eyes
but also easier on the old processor.

