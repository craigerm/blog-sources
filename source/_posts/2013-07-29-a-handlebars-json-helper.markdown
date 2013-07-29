---
layout: post
title: "A Handlebars JSON helper"
date: 2013-07-29 12:17
comments: true
categories: 
---

I've been working with Backbone pretty heavily over the last year with 
[Handlebars](http://handlebarsjs.com) being used as the templating
engine.

For every project I usually end up adding a few helpers to Handlebars
to aid in debugging. One of my favourites, and yet the simplest, is a helper to output 
an object (usually the model) to json inside the template.

The helper itself is super simple but very useful for debugging:

```coffeescript
  # Coffeescript
  Handlebars.registerHelper 'json', (obj) ->
    JSON.stringify(obj)
```
```javascript
  // Javascript
  Handlebars.registerHelper('json', function(obj) {
    return JSON.stringify(obj);
  });
```

You would use this in any Handlebars view like so:

```html
{% raw %}
  <div>
    <!-- This will output the model to JSON -->
    <div>{{json this}}</div>

    <!-- This will output the json further down the object graph -->
    <div>{{json owner.followers}}</div>
  </div>
{% endraw %}
```

This is not something new.
[Rendr](https://github.com/airbnb/rendr-handlebars/blob/master/shared/helpers.js#L53) (from Airbnb)
has this helper baked right in (although they escape the string, which is a
good idea) - and I'm sure other frameworks have it or
something similar.

Anyway, I hope this helps someone starting out a new backbone/handlebars
project!


