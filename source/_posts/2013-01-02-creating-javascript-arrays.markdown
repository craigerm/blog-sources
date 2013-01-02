---
layout: post
title: "Creating Javascript Arrays: new vs []"
date: 2013-01-02 08:52
comments: true
categories: [javascript]
---

My last [post](/blog/2013/01/02/creating-javascript-objects/) quickly compared the performance
of creating javsacript objects via ``new object()`` and `{}`.

So for curiousity's sake let's do the same for arrays.

We'll compare these two methods for instantiating arrays:
```javascript

  // Method 1: Using new operator
  var arr1 = new Array();

  // Method 2: Using literal syntax
  var arr2 = [];
```

{% img /images/posts/array-results1.png %}
{% img /images/posts/array-results2.png %}

To no suprise the literal syntax is almost twice as fast.

Unless you need to set the length when creating the array we should favour 
the the literal syntax of ``var a = []`` instead of the verbose ``var a = new Array()``
syntax for performance and readability.

