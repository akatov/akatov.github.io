;;; publish.el --- Generate a simple static HTML blog
;;; Commentary:
;;
;;    Define the routes of the static website.  Each of which
;;    containing the pattern for finding Org-Mode files, which HTML
;;    template to be used, as well as their output path and URL.
;;
;;; Code:

;; Setup package management
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

;; Install and configure dependencies
(use-package weblorg :ensure t)
(use-package htmlize
  :ensure t
  :config
  (setq org-html-htmlize-output-type 'css))

(require 'weblorg)

(add-to-list 'load-path "./")
(require 'site)

;; Generate blog posts
(weblorg-route
 :site site
 :name "posts"
 :input-pattern "posts/*.org"
 :template "post.html"
 :output "output/posts/{{ slug }}.html"
 :url "/posts/{{ slug }}.html")

;; Generate pages
(weblorg-route
 :site site
 :name "pages"
 :input-pattern "pages/*.org"
 :template "page.html"
 :output "output/{{ slug }}/index.html"
 :url "/{{ slug }}")

;; Generate posts summary
(weblorg-route
 :site site
 :name "index"
 :input-pattern "posts/*.org"
 :input-aggregate #'weblorg-input-aggregate-all-desc
 :template "blog.html"
 :output "output/index.html"
 :url "/")

(weblorg-route
 :site site
 :name "feed"
 :input-pattern "posts/*.org"
 :input-aggregate #'weblorg-input-aggregate-all-desc
 :template "feed.xml"
 :output "output/feed.xml"
 :url "/feed.xml")

(weblorg-copy-static
 :site site
 :output "output/static/{{ file }}"
 :url "/static/{{ file }}")

(weblorg-export)
;;; publish.el ends here
