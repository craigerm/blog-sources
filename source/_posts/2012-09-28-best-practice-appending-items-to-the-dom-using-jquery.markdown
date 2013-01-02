---
comments: true
date: 2012-09-28 17:55:54
layout: post
slug: best-practice-appending-items-to-the-dom-using-jquery
title: 'Best Practice: Appending items to the DOM using jQuery'
wordpress_id: 117
categories:
- jquery
tags:
- best practice
- jquery
---

We've all heard this before:


> Dom manipulation is expensive!


But very often you need to update a list item, select list or some other element with many child items(possibly hundreds...).

So what's the best approach for doing this? 

Well first let's show the most common approach that we have all see many times and benchmark a few others.

_(For the sake of these benchmarks I am using Chrome with Ubuntu and testing at [jsperf](http://jsperf.com))_




## 1) Naive Approach: Manually adding to the element directly that is already in the dom

```javascript
var element = $('ul:first');

for(var i=0; i < 100; i++){
  element.append('<li>' + i + '</li>');
}
```

_Result: 281 operations/second_

Manually appending lots of items to the DOM is usually a bad idea.
It can cause the browser to repaint the UI which is an expensive operation when the DOM is large.


## 2) Better Approach - Make changes in memory

Instead of adding items directly to the element in the DOM we can create a stub element in memory and append to that instead. After we are done with the appends we just need to make one call to the DOM to perform the update.

```javascript
var element = $('ul:first');

var stub = $('<ul>');

for(var i=0; i < 100; i++){
  stub.append('<li>' + i + '</li>');
}
element.append(stub.children());
```

_Result: 276 operations/second_

I do believe this result is a result is a little skewed. The DOM I was testing with was quite small and not the size that adding items would make a huge difference. This is something worth noting though because an optimization's value is highly application specific.

## 3) Fastest Approach - Use a string buffer and append html string directly

Usually I am happy using the in-memory approach because I know that if you have a large DOM loaded it will minimize the direct updates needed
and hopefully result in better performance. And if the dom is small it's only marginally slower so I usually caution on the side of err.

But can we make it faster? Well let's try.

Instead of creating a stub we will just store the html string for each element in an array. This removes the overhead of string concatenation (which is bad of course :)) and the overhead of creating many temporary jQuery elements. When we are finished we will join the items in the array with an empty string and append it to the list item.

Now, the fun stuff. Let's see this in action...

```javascript
var element = $('ul:first');
var arr = [];

for(var i=0; i < 100; i++){
  arr.push('<li>');
  arr.push(i)
  arr.push('</li>');
}
element.append(arr.join(''));
```

_Result: 1,150 operations/second_

Woah! That's a huge improvement! Granted some of that improvement is because we removed the string concatenation - but it shows you that a few small changes can make a big difference!

## Final Thoughts

So there you have it! As a general rule when performing lots of appends to an item it is usually a good idea to not manipulate the DOM directly. And if you want to increase the performance and responsiveness out of you web app  when doing DOM manipulation try using the array string buffer technique.

[![](images/posts/append-benchmark.png)](images/posts/append-benchmark.png)

If you have a faster way of doing this, please share! :)
