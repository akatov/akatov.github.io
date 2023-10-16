---
layout: post
tags: [ruby]
---

This post is inspired by Writing Ruby C Extensions
[Part 1](http://tenderlovemaking.com/2009/12/18/writing-ruby-c-extensions-part-1.html)
and
[Part 2](http://tenderlovemaking.com/2010/12/11/writing-ruby-c-extensions-part-2.html)
by [Tenderlove Making](http://tenderlovemaking.com/), and uses
[ore](http://postmodern.github.io/2012/05/20/you-dont-have-to-use-bundler-to-create-new-rubygems.html)
as a project generator.

## Aim

create a ruby gem called stree wrapping the C library libstree used to compute Suffix 

## Prerequisites

Install ore.

    $ gem isntall ZenTest ore

## Create Project

    $ mine stree --bundler --gemspec --mini-test --yard --markdown --name=stree --version=0.0.0
    $ cd stree

## Write First Test

Before writing the first test we need to fix the generated files to work with
the latest gems. We can now run

    $ bundle exec autotest

Since I like reading spec style tests (`describe` and `it` blocks), let's convert the existing
test.

Now, let's add a first real test.

{% highlight ruby %}
# test/test_stree.rb
describe Stree do
  it 'should return "hello world"' do
    _(Stree.hello_world).must_equal 'hello world'
  end
end
{% endhighlight %}

The test fails with a `NoMethodError` since `hello_world` is not defined for `Stree`.
We will now implement this method in C.

## C Extension Project Layout

It is customary to put C code in `ext/<project-name>/`. Hence

    $ mkdir -p ext/$(basename $(pwd))

## extconf.rb

Inside the above directory we put an `extconf.rb` which will generate a
`Makefile` which in turn can be used to build the C code.

{% highlight ruby %}
# ext/stree/extconf.rb
require 'mkmf'
create_makefile 'stree'
{% endhighlight %}

You can test `extconf.rb` by running `ruby ext/stree/extconf.rb` which should
create a `Makefile`.
Running `make` gives "make: Nothing to be done for `all'." since we don't have a
C source file yet.

## stree.c

{% highlight c %}
#include <ruby.h>

static VALUE hello_world(VALUE self)
{
  return rb_str_new2("hello world");
}

void Init_stree()
{
  VALUE mStree = rb_define_module("Stree");
  rb_define_singleton_method(mStree, "hello_world", hello_world, 0);
}
{% endhighlight %}

Now re-running `ruby ext/stree/extconf.rb` and `make` creates `stree.o` and
`stree.bundle` (on OSX).

## Automating the build

We obviously want to automate this task.
For this we can use the `rake-compiler` gem.

{% highlight ruby %}
# Rakefile
require 'rake/extensiontask'
Rake::ExtensionTask.new 'stree'
{% endhighlight %}

Now we can run

    $ bundle exec rake compile

which produces `lib/stree.bundle`
