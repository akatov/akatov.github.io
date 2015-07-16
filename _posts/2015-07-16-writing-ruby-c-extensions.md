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

It is customary to put C code in `ext/<project-name>`. Hence

    $ mkdir -p ext/$(basename $(pwd))
