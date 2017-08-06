---
layout: post
tags:
- css
- tachyons
- jekyll
---

## Getting Started

Let's copy the [minima theme](https://github.com/jekyll/minima)
default layout template locally so we can modify it.

```bash
mkdir _includes
cp $(bundle show minima)/_includes/head.html _includes
```

Include the the following line taken from the
[getting started](http://tachyons.io/#getting-started) section
of [Tachyons](https://github.com/tachyons-css/tachyons/)
into the `head.html` file, before the links to the other stylesheets.

```html
<link rel="stylesheet" href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css"/>
```

We are now ready to try out Tachyons.
Let's copy an example from the *GRIDS* section
in the tachyons [style guide](http://tachyons.io/#style):

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

Let's look up what all these classnames mean on
[tachyons tldr](https://tachyons-tldr.now.sh/#/classes).

| Class | [Acrostic](https://en.wikipedia.org/wiki/Acrostic) | CSS |
|:--|:--|:--|
| `.fl` | float left | `float:left; display:inline` |
| `.w-75` | width 75% | `width: 75%` |
| `.pa2` | padding all 2units | `padding: .5rem` |
| `.outline` | | `outline: 1px solid` |
| `.bg-white` | back-ground white | `backgroundColor: #fff`|
| `.tc` | text center | `textAlign: center` |
| `.pv4` | padding vertical 4units | `paddingTop: 2rem; paddingBottom: 2rem` |
| `.truncate` | | `whiteSpace: nowrap; overflow: hidden; textOverflow: ellipsis` |
| `.no-wrap` | | `whiteSpace: nowrap` |

As we can see, the `no-wrap` class in one of the `div` tags is
in fact superfluous, since it is subsumed by the `truncate` class.

## Styling kramdown

The [kramdown](https://kramdown.gettalong.org/) engine used by jekyll allows for
[inline attributes](https://kramdown.gettalong.org/quickref.html#block-attributes),
with an easy shortcut for classnames and re-use through *attribute list definitions*:

```markdown
> A padded outlined blockquote
{: .pa4 .outline}

{::comment}The following line defines a reusable ALD{:/comment}
{:my-paragraph: .fl .w-50 .outline .pv1 .ph4}

This custom paragraph is red
{:my-paragraph .bg-red}

And this one is blue
{:my-paragraph .bg-blue}
```

> A padded outlined blockquote
{: .pa4 .outline}

{::comment}The following line defines a reusable ALD{:/comment}
{:my-paragraph: .fl .w-50 .outline .pv1 .ph4}

This custom paragraph is red
{:my-paragraph .bg-red}

And this one is blue
{:my-paragraph .bg-blue}
