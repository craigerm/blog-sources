---
layout: post
title: "Using HTML5 local storage to store objects"
date: 2013-01-07 08:55
comments: true
categories: html5 javascript 
---

I've been experimenting with a few HTML5 features lately including localStorage in a backbone app. 
While localStorage is not technically part of HTML5 usually people group it
together with HTML5 so I'll do the same here.
If you're not familiar with localStorage there's a good introductory post 
[here](http://tutorials.jenkov.com/html5/local-storage.html) (also discusses
sessionStorage).

## Limitation
One small limitation of using local storage is that it can only store strings.
So if you want to store objects or arrays you will need to do some extra work.

For example storing the following object won't work as expected:
```javascript
localStorage.setItem('obj', { name: 'John Smith', id: 500 });
```

This will actually convert the object to a string which results in the
following test to be true:

```javascript
var item = localStorage.getItem('obj');
expect(item).toBe('[object Object]');
```

So what do we have to do to get this working as expected?

## JSON.parse and JSON.stringify to the rescue

To get around you'll have to convert the object to a JSON
string before adding it:

```javascript
var json = JSON.stringify({ name: 'John Smith', id: 500 });
localStorage.setItem('obj', json);
```

And to retrieve this you need to then parse the object:
```javascript
var json = localStorage.getItem('obj');
var obj = JSON.parse(json);
```

## Better Approach
This can get a little annoying if you are storing several different objects in
your app so I would recommend creating a wrapper class to handle the object
(de)serialization.

{% gist 4475414 %}

This allows us to store objects and retrieve them
```javascript

// Create an instance of our storage wrapper
var storage = new StorageWrapper();

// Add the object to our storage
storage.set('item', { price: 500, quantity: 3 });

// Retrieve the object from our storage
var obj = storage.get('item');

// We can now work with the JSON object 
expect(obj.price * obj.quantity).toBe(1500);
```

## But what about older browsers? 

Of course not all browsers support localStorage. 
To see if it is supported in your browser (You are using a modern browser
right?) check out [html5test.com](http://html5test.com).

Instead of changing the wrapper class to check if local storage exists (since
that's not the responsibility of the wrapper) it would
be better to use an HTML5 polyfill for this. 
I would recommend using a [Modernizr](http://modernizr.com) polyfill 
to add this feature to older browsers.

## Final Thoughts

Local storage is extremely useful for maintaining the state of dynamic web 
applications like single page applications or other backbone apps. It's usually
a good idea to keep things [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) 
by adding wrapper classes to any HTML5 feature that
requires you to write extra code when using its API - like storing and
retrieving objects via local storage. 

## Resources

* [List of Mozernizr polyfills](http://modernizr.com)
* [JSON parser/stringify for older browsers](https://github.com/douglascrockford/JSON-js)

