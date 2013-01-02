---
comments: true
date: 2012-01-30 00:59:10
layout: post
slug: how-to-achieve-rails-like-resources-in-node-js-express
title: How to achieve rails like resources in node.js express
wordpress_id: 49
categories:
- nodejs
tags:
- express
- node
---

I've been playing around with [Node.js](http://nodejs.org/) lately by building some prototypes. I've been using [express](http://expressjs.com/) as my web framework and have really enjoyed the experience so far.

One thing that I do miss from Rails is to be able to easily map a controller's CRUD actions to the conventional matching routes. Learn more about rails routing [here](http://guides.rubyonrails.org/routing.html) if you are not familiar.

Let's say you have a "task" controller with all seven mappable actions defined. In rails you would do something like this:

```ruby
resources :tasks
```

In express it appears that you would have to do this manually. Inside your app.js file you would have the following code:

```javascript
var tasks = require('./routes/tasks.js')

app.get('/tasks', tasks.index);
app.get('/tasks/new', tasks.new);
app.post('/tasks/create', tasks.create)
app.get('/tasks/show', tasks.show)
app.get('/tasks/edit', tasks.edit)
app.post('/tasks/update', tasks.update)
app.post('/tasks/destroy', tasks.destroy)
```


## Dry routing in express

When experimenting with node and express I had to do the following for a couple of different controllers and duplication started to creep into my code. I'm a strong believer in the [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle and I even apply that when learning a new language or framework. Even when experimenting with new technology applying the DRY pinciple allows you to solve an actual problem and look into the language/framework instead of working at a "hello world" level. I find solving an actual problem speeds up the learning curve and in the end is also more fun. Maybe that's a post for a future date :).

Anyways to emulate the rails routing behavior in express I've created a quick helper that can be used. It is called "autoresources" and can map a controller's actions just like rails does.

```javascript
var app = module.exports = express.createServer();
var resources = require('./utils/autoresources.js')
resources.map(app, 'tasks')
```

Side note: I'm hesitant to call the express "routing handlers" controllers in the way that rails calls their controllers controllers, but for this post we'll treat them as the same. And actions and functions will be interchangeable.

The call to resources.map() will look for the file "APP_HOME/routes/tasks.js" and then check for functions that can be auto mapped to routes. Only functions that exist in your controller will be auto mapped. For example if you don't have a destroy function in your controller then no route will be added for destroy.

Your route handler should look something like this:

```javascript
// Actions supported mapped to GET:
//   => index, new, show, edit
// Actions supported mapped to POST
//   => create, update, destroy

exports.index = function(req, res){
  res.send('Index action called')
}

exports.new = function(req, res){
   res.send('New action called');
}

exports.create = function(req,res){
  res.send('Create action called');
}
```


##  Adding routes to other controller actions 

The map function also returns the javascript exports for that file. The exports can be used the same way just as if you did a "require" on the file yourself.
For example, let's say our tasks.js file had another function called "recent" to show the recent tasks that need to be completed. In our app.js file we would then do the following:

```javascript
var tasks = resources.map(app, 'tasks')
app.get('/recent', tasks.recent)
```


## Installation

I might add this as a node package in the next few days but for now you can grab the source code for this at [my github page](https://github.com/craigerm/autoresources). To use this code just copy it (it's just one file) to your project directly. Then just require it from your app.js file

```javascript
// Change the path to wherever you copied your file
var resources = require('./utils/autoresources.js')
```

Hopefully this will be useful for some people out there. I will probably have more to talk about with node in the next few months since I am finding it to very interesting and fun to work with. Remember how much fun you had when you first discovered rails?
