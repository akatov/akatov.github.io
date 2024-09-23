---
title: Including Tachyons in a Jekyll Blog
date: 2017-08-05
permalink: /blog/{{ title | slug }}/
tags:
  - tachyons
  - jekyll
---

[//]: # "markdown-it-attrs does not have comments, so we use this workaround instead"
[//]: # "see https://stackoverflow.com/questions/4823468/comments-in-markdown#comment33676653_20885980"

## Getting Started

Let's copy the [minima theme](https://github.com/jekyll/minima)
default layout template locally so we can modify it.

```sh
mkdir _includes
cp $(bundle show minima)/_includes/head.html _includes
```

Include the the following line taken from the
[getting started](http://tachyons.io/#getting-started) section of
[Tachyons](https://github.com/tachyons-css/tachyons/) into the
`head.html` file, before the links to the other stylesheets.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css"
/>
```

We are now ready to try out Tachyons. Let's copy an example from the
_GRIDS_ section in the tachyons [style guide](http://tachyons.io/#style):

```html
<div class="fl w-75 pa2">
  <div class="outline bg-white tc pv4">
    <code>fl w-75</code>
  </div>
</div>
<div class="fl w-25 pa2">
  <div class="outline bg-white tc pv4 truncate no-wrap">
    <code>fl w-25</code>
  </div>
</div>
```

this produces:

<div class="float-left w-[75%] p-2">
  <div class="outline bg-white text-center py-4">
    <code>fl w-75</code>
  </div>
</div>
<div class="float-left w-[25%] p-2">
  <div class="outline bg-white text-center py-4 truncate">
    <code>fl w-25</code>
  </div>
</div>

Let's look up what all these classnames mean on
[tachyons tldr](https://tachyons-tldr.now.sh/#/classes).

| Class       | [Acrostic](https://en.wikipedia.org/wiki/Acrostic) | CSS                                                            |
| :---------- | :------------------------------------------------- | :------------------------------------------------------------- |
| `.fl`       | float left                                         | `float:left; display:inline`                                   |
| `.w-75`     | width 75%                                          | `width: 75%`                                                   |
| `.pa2`      | padding all 2units                                 | `padding: .5rem`                                               |
| `.outline`  |                                                    | `outline: 1px solid`                                           |
| `.bg-white` | back-ground white                                  | `backgroundColor: #fff`                                        |
| `.tc`       | text center                                        | `textAlign: center`                                            |
| `.pv4`      | padding vertical 4units                            | `paddingTop: 2rem; paddingBottom: 2rem`                        |
| `.truncate` |                                                    | `whiteSpace: nowrap; overflow: hidden; textOverflow: ellipsis` |
| `.no-wrap`  |                                                    | `whiteSpace: nowrap`                                           |

As we can see, the `no-wrap` class in one of the `div` tags is in fact
superfluous, since it is subsumed by the `truncate` class.

## Styling kramdown

The [kramdown](https://kramdown.gettalong.org/) engine used by jekyll allows for [inline attributes](https://kramdown.gettalong.org/quickref.html#block-attributes), with an easy shortcut for classnames and re-use through _attribute list definitions_:

```md
> A padded outlined blockquote
{: .pa4 .outline}

{::comment}The following line defines a reusable ALD{:/comment}
{:my-paragraph: .fl .w-50 .outline .pv1 .ph4}

This custom paragraph is red
{:my-paragraph .bg-red}

And this one is blue
{:my-paragraph .bg-blue}
```

produces:

[//]: # "we are using tailwindcss, so we emulate tachyons classes here"

> A padded outlined blockquote {.p-8 .outline .outline-1}

[//]: # "unfortunately, markdown-it does not support attribute list definitions so we just repeat ourselves here instead..."

This custom paragraph is red
{.float-left .inline .w-[50%] .outline .py-1 .px-4 .bg-[#ff4136]}

And this one is blue
{.float-left .inline .w-[50%] .outline .py-1 .px-4 .bg-[#357edd]}

&nbsp;

## Styling the Layouts

Styling inline HTML may be all fun and games; styling markdown directly
looks slightly more useful, but if we're actually trying to use Tachyons
as much as possible, we need to look at the layout templates. A good
starting point looks like trying to reproduce minima's layout using
Tachyons, before trying to actually customize it.

Let's start by looking at
[minima's sass](https://github.com/jekyll/minima/blob/master/_sass/minima.scss):

```scss
//...

// Import partials.
@import
  "minima/base",
  "minima/layout",
  "minima/syntax-highlighting"
;
```

This gives us a hint at where the
[layout styles](https://github.com/jekyll/minima/blob/master/_sass/minima/_layout.scss) are defined. Let's pick out the first one (`.site-header`) and replace it.
Let's find where it is used using [the_silver_searcher](https://github.com/ggreer/the_silver_searcher):

```sh
ag site-header $(bundle show minima)
```

The file in question is
[`_includes/header.html`](https://github.com/jekyll/minima/blob/master/_includes/header.html).
So let's copy it locally so we can edit it.

```sh
mkdir _includes
cp $(bundle show minima)/_includes/header.html _includes
```

We now need to replace the class `site-header` with Tachyons classes
such that the resulting styles more or less resemble:

```css
.site-header {
  border-top: 5px solid #424242;
  border-bottom: 1px solid #e8e8e8;
  min-height: 55.95px
  position: relative;
}
```

Again, let's use [tachyons tldr](https://tachyons-tldr.now.sh/#/classes), to find the right classes.
This time searching by CSS property names helps to get started, but after figuring out the structure of Tachyon's classname acronyms, we can quickly switch back to search by class name.
[w3schools CSS Reference](https://www.w3schools.com/cssref/) is also very useful here.

The closest we can get to it is `bt bb b--gray h4 relative`, since we are missing definitions for `border-top` widths other than `1px`, and for `border-bottom-color` and `border-top-color`.

To define our own classes, we first need to copy the [`assets/main.scss`](https://github.com/jekyll/minima/blob/master/assets/main.scss)
file from minima.

```sh
mkdir assets
cp $(bundle show minima)/assets/main.scss assets
```

Now we can modify this file to include the following classes:

```css
.bb--light-gray {
  border-bottom-color: #eee;
}

.bt--dark-gray {
  border-top-color: #333;
}

.bt1 {
  border-top-width: .25rem;
}
```

and all that's left to do now is to include these classes in the header tag:

```html
<header
  class="bt bt1 bt--dark-gray bb bb--light-gray h3 relative"
  role="banner"
>
  ...
</header>
```

The remainder of the layout classes can be "removed" in a similar
fashion gradually.
