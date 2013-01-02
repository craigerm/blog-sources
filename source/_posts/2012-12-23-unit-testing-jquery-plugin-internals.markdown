---
comments: true
date: 2012-12-23 14:11:22
layout: post
slug: unit-testing-jquery-plugin-internals
title: Unit Testing jQuery Plugin Internals
categories:
 - jquery
tags:
- javascript
- jquery
- unit testing
---

Anyone who has worked with me before knows that I am a big advocate of TDD. I find when I start with TDD it's often hard to move away from it and conversely if I don't start with it it's hard to move towards it later.

Lately I've been writing several jQuery plugins - both simple and complex. One in particular was a calculation plugin that had dozens of complicated calculations and edge cases. So let's see how I would go about writing a jQuery plugin using TDD and [jasmine](http://pivotal.github.com/jasmine/) as the testing framework for a simplified calculator plugin.

## Writing a test

Let's say we need a function that checks if a number is even. So let's write the test:

```javascript
describe('calculator', function() {
  describe('isEven()', function() {

    // What should our test look like ?
   it('should return true for even numbers', function() {
     // #1 Add to global namespace?
     expect(window.isEven(2)).toBe(true);

     // #2 Add to jQuery namespace?
     expect($.isEven(2)).toBe(true);

     // #3 Make plugin add a static jQuery object that has the methods we need
     expect($.calculator.isEven(2)).toBe(true);

     // #4 ??
   });
  });
});
```

## Create plugin

We use this standard format for a jQuery plugin:

```javascript
(function($) {
  $.fn.calculator = function() {
     return this.each(function() {
       // code
     });
  };
})(jQuery);
```

## Requirements

So what exactly do we want this to look like? Well there are some simple requirements I like to have.

1.  Each plugin should not add anything to the global (window) object (This rules out #1)
2.  Each plugin should only add one object or function to the jQuery namespace (This rules out #2 and #3)
3.  Easily make new functions testable

So that just leaves #4. But what could that be.

## Using a global object for tests

The first approach I tried was creating a global object (I know, I know...) before the script was included and add the methods to this object. So let's write what our test body should look like:

```javascript
  it('should return true for even numbers', function() {
   expect(container.isEven(2)).toBe(true);
  });
```

We would change our html test runner to look something like:

```html
<script type="text/javascript">
  var container = {}; // adds to global namespace
</script>

<script type="text/javascript" src="calculator.plugin.js"></script>
```

And our plugin now looks like this:
```javascript
(function($, container) {
  container = {}

  var isEven = container.isEven = function(num) {
    return num % 2 == 0;
  };

  $.fn.calculator = function() {
    return this.each(function() {
      // code
    });
  };
})(jQuery, container);
```

So what exactly is happening here? Well our unit test is using a global variable to access the internal functions of the jQuery plugin. Next we declare this variable in our test runner so we can access it, but for usage in our application this variable won't exist. Finally our plugin assigns whatever functions we need to this object. There's still the problem of possibly having a conflict with the global variable - just one reason why global variables are bad and should be avoided.

## Using the plugins jQuery's data object to store internal functions

A second approach is to utilize the jQuery data object:

```javascript
(function($) {
  var internals = {}

  var isEven = internals.isEven = function(num) {
    return num % 2 == 0;
  };

  $.fn.calculator = function() {
    return this.each(function() {
      // code

      // Add internal methods to do data
     $(this).data('internals', internals);
   });
  };
})(jQuery);
```

Our test body would now look like:
```javascript
  var internals = $('#fakeId').calculator().data('internals');
  
  it('should return true for even numbers', function() {
    expect(internals.isEven(2)).toBe(true);
  });
```

This approach meets our requirements and doesn't utilize a global variable for testing purposes. You can make the argument that if a plugin doesn't expose the method it does not need to be tested. I don't fully agree with this because the usage of the plugin API could be considered more of an integration test since we are integrating with our client code (i.e. the HTML page). Sometimes plugins contain logic that should be fully unit testable because there are complicated cases. In this case we are adding an extra step in the plugin but I think the benefits outweigh the overhead.

## Returning internals as an option to the plugin

Alternatively instead of adding to each object's data (not a good idea if plugin is used for several elements on a page) we can do something similar by passing in a string to the plugin that would return the object instead of using the data object. This is the approach I am currently using on a few plugins:

```javascript
(function($) {
  var internals = {}

  var isEven = internals.isEven = function(num) {
    return num % 2 == 0;
  };

  $.fn.calculator = function(option) {
    if(option === 'internals') { 
       return internals;
    }
    // you could simplify this and add options for each method if you prefer like this:
    // if(option === 'isEven') return isEven;

    return this.each(function() {
      // code
   });
  };
})(jQuery);

  // Test body would be this:
  var internals = $('#fakeId').calculator('internals');
  
  it('should return true for even numbers', function() {
    expect(internals.isEven(2)).toBe(true);
  });
```

## More complicated approach

In larger plugins it might be better to use a CLI tool to build the plugin so that we don't have the anonymous function wrapper included when testing. For example the jQuery source does something like this. The have an intro file, several body files, and an outro file. 

The intro.js file looks like:

```javascript
(function( window, undefined ) {
  "use strict";
```

And here's the outro.js file:

```javascript
  })( window );
```

They get appended together to build the jQuery source that we know and love. It's a very useful technique if you're building a larger plugin or framework.

## Conclusion

As with anything there's so silver bullet. I'm still not completely sure this is the cleanest approach to testing these internal methods, but I'm liking it so far. Allowing access to the internal functions in my unit tests without cluttering up the global window object gives me the flexibility I need to use a complete TDD approach to building jQuery plugins.

If you have any other ways of doing this I would love to hear about them! Happy Coding!

