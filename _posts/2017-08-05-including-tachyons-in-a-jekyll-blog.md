---
layout: post
tags:
- css
- tachyons
- jekyll
---

Let's copy the [minima theme](https://github.com/jekyll/minima)
default layout template locally so we can modify it.

```bash
mkdir _includes
cp $(bundle show minima)/_includes/head.html _includes
```
