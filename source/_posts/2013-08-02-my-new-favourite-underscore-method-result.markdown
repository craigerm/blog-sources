---
layout: post
title: "My new favourite underscore method - .result()"
date: 2013-08-02 18:02
comments: true
categories: 
---

In javascript often you create a class or widget that can take a parameter as a literal
value (string, number, etc.) or as a function that returns a string. 

For example if you are creating a widget that can take a url parameter it would
look like:

```javascript

  // Configuring property with a string
  $('#myid').magicwidget({
     url: '/some-url'
  });

  // Configuring property as a function
  $('#myid').magicwidget({
     url: function() {
        if (this.isNew() == true) {
          return '/special-url';
        }
        return '/normal-url' 
     }
  });
```

This is a pretty common behaviour and many Backbone properties can be
configured this way.

Now, to retreive the value you can check if it's a function or a string and handle it
manually but this is such a common thing there's an underscore method for that.

Inside the widget code whenever we need the url value we can call `_.result`
to return it:

```javascript
  // The first argument is the context object and the second is the name of the
  // property. 
  url = _.result(this, 'url')
```
This means we don't have to check ourselves if the url was a
function or a string - we let underscore do that.

This little utility method is awesome
and Backbone uses it all over the place (a quick search of the codebase shows that
it's used 12 times). It's also a great way to make your
client-side framework APIs flexible.

`_.result()` is now my new favourite underscore method.

Enjoy!

