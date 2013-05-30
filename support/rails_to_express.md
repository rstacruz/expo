Rails to Express guide
======================

Moving from Rails to Express? Here's a quick guide on Express equivalents of 
Rails routing.

States
------

#### Rails

In Rails, you can save states as instance variables (`@post` in this example).
These variables will propogate to the view templates.

``` ruby
class PostController < ApplicationController
  def show
    @post = Post.find(params[:id])
    @author = @post.author
  end
end
```

#### Express

In Express, you can use `res.locals` as a state object. These are scoped to the
request, and available to the views during that request/response cycle.

``` js
/* Not the best way, but it gets the job done */
app.get('/posts/:id', function(req, res) {
  var locals = res.locals;

  locals.post = Post.find(req.params.id, function() {
    locals.author = locals.post.author(function() {
      res.render("posts/show");
    });
  });
});
```

#### Express (chaining)

You may even opt to take advantage of Express's callback chaining to work with 
asynchronous functions. This block can be written more clearly this way:

``` js
/* Well, this looks much better, doesnt it? */
app.get('/posts/:id',
  function(req, res, next) {
    res.locals.post = Post.find(req.params.id, next);
  },
  function(req, res, next) {
    res.locals.author = locals.post.author(next);
  },
  function(req, res) {
    res.render("posts/show");
  });
});
```

[res.locals documentation >][res.locals]

Filters
=======

Before filters
--------------

#### Rails

In Rails, you can define private functions to be executed on certain actions 
using the `before_filter` directive.

``` ruby
class PostController < ApplicationController
  before_filter :set_post, only: :show

  def show
  end

private

  def set_post
    @post = Post.find(params[:id])
  end
end
```

#### Express

In Express, a route can accept multiple callbacks. You can use these to add
filter functions to a route. In your filter functions, you may call `next()` to
pass the control to the next callback.

``` js
app.get('/posts/:id',
  setPost,
  function(req, res) {
    res.render("show");
  });

function setPost(req, res, next) {
  var id = req.params.id;
  res.locals.post = Post.find(id, next);
}
```

[Creating routes >][app.VERB]

Chained filters
---------------

#### Rails

In Rails, you can use multiple `before_filter` calls. Also, each of these 
filters can apply to multple actions.

``` ruby
class PostController < ApplicationController
  before_filter :set_post, only: [:show, :edit]
  before_filter :ensure_published, only: [:show, :edit]

  def show
  end

  def edit
  end

private

  def set_post
    @post = Post.find(params[:id])
  end

  def ensure_published
    unless @post.published?
      render file: "error"
    end
  end
end
```

#### Express

In Express, you can use more than one filter per route.  You can re-use filter
functions across multiple routes, too. In this example, we've also used a custom
`render` filter which renders a template.

``` js
app.get('/posts/:id',
  setPost,
  ensurePublished,
  render('posts/show'));

app.get('/posts/:id/edit',
  setPost,
  ensurePublished,
  render('posts/edit'));
```

You can then define your helpers like so:

``` js
function render(template) {
  return function(req, res) {
    res.render(template);
  }
}

function setPost(req, res, next) {
  var id = req.params.id;
  res.locals.post = Post.find(id, next);
}

function ensurePublished(req, res, next) {
  var post = res.locals.post;

  if (!post.isPublished()) {
    return res.render(403, "error/forbidden");
  }

  next();
}
```

[Creating routes >][app.VERB]

Filtering multiple routes
-------------------------

#### Rails

You can define filters that apply to an entire controller using `before_filter`.
This is useful for securing a certain controller to only a few selected users.

``` ruby
class AdminController < ApplicationController
  before_filter :ensure_admin

private

  def ensure_admin
    if !current_user || !current_user.admin?
      redirect_to login_path
    end
  end
end
```

#### Express

You can define routes that will run on a URL match. Use [app.all()] to define a
route that matches both gets and posts. In this example, we use `next()` to make 
sure that this filter passes control to the actual routes.

``` js
app.all('/admin/*', ensureAdmin);

function ensureAdmin(req, res, next) {
  var user = res.locals.user;

  if (!user || !user.isAdmin()) {
    return res.redirect('/login');
  }

  next();
}
```

# Partials

Rendering partials
------------------

#### Rails

Rails provides a `render partial` helper.

``` ruby
# Renders views/shared/_header.html.erb
render partial: 'shared/header'
```

#### Express (EJS)

Express 3.x has removed support for partials. However, if you're using EJS, it
comes with an `include` directive:

``` js
<!-- Renders views/shared/header.ejs -->
<% include shared/header %>
```

#### Express (Jade)

Jade also comes with support for includes, as well. In fact, it also supports
more features, like blocks.

``` js
-# Renders views/includes/shared/header.jade
body
  include shared/header
```

[Jade includes documentation >][jade#includes]

Partials with locals
--------------------

#### Rails

Rails provides a `render partial` helper, which also accepts a locals argument.

``` ruby
# Renders views/shared/_header.html.erb
render partial: 'user/profile', locals: { user: @user }
```

#### Express (Jade)

Jade also has support for mixins which work very similarly. You may even opt to
put these mixins in a different file and just include them in.

``` js
mixin profile(user)
  .user
    h2= user.name
    p= user.profession

profile(user)
```

[Jade mixins documentation >][jade#mixins]

# Helpers

Helper methods
--------------

#### Rails

You can define helpers by creating your helpers in `app/helpers/` as modules.  
They work like normal functions and are available to all views.

``` ruby
# app/helpers/name_helper.rb
module NameHelper
  def greet(name)
    "Hello, #{name}"
  end
end
```

#### Express

Express provides the `app.locals` object which exposes all of its contents to 
views.

``` js
app.locals.greet = function(name) {
  return "Hola, " + name;
};
```

[app.locals documentation >][app.locals]

#### Express via Expo

If you're using [Expo], just dump some helpers in `app/helpers/`. They will 
automatically be extended into [app.locals].

``` js
/* app/helpers/name_helper.js */
exports.greet = function(name) {
  return "Kamusta, " + name;
};
```

# Layouts

Using layouts
-------------

To do

Content blocks
--------------

#### Rails

Rails provides a `content_for` helper.

``` ruby
- content_for :footer do
  %p Copyright 2013
```

#### Express (Jade)

Express allows `blocks` as a way to define custom content blocks in a template.

``` js
block footer
  p Copyright 2013
```

[Jade template inheritance guide >][jade#inheritance]

Nested layouts
--------------

#### Rails

Rails has no explicit support for nested layouts. The recommendation is to take 
advantage of Rails's `content_for` helper. See Rails's [nested layouts 
guide][Rails layouts] for details.

``` ruby
-# app/views/layouts/application.html.haml
- content_for :body do
  #area
    = yield

= render file: 'layouts/core'
```

#### Express (Jade)

With Jade, just make the layout extend another layout

```
-# views/layouts/application.jade
extends core
block body
  #area
    block content
```

[Jade template inheritance guide >][jade#inheritance]


[jade#includes]: https://github.com/visionmedia/jade#includes
[jade#mixins]: https://github.com/visionmedia/jade#mixins
[jade#inheritance]: https://github.com/visionmedia/jade#template-inheritance
[res.locals]: http://expressjs.com/api.html#res.locals
[app.locals]: http://expappsjs.com/api.html#app.locals
[app.all()]: http://expressjs.com/api.html#app.all
[app.VERB]: http://expressjs.com/api.html#app.VERB
[Expo]: http://ricostacruz.com/expo/
[Rails layouts]: http://guides.rubyonrails.org/layouts_and_rendering.html#using-nested-layouts
