#!/usr/bin/env bash

echo "running pre-prod.sh"

cat <<EOF > site.el
(setq
 site
 (weblorg-site
  :theme (lambda () "theme")
  :base-url "https://akatov.github.io"
  :template-vars
  '(("site_name" . "Dmitri's Blog")
    ("site_owner" . "Dmitri Akatov")
    ("site_description" . "Dmitri Akatov's Blog"))))

(provide 'site)
EOF

echo "finished pre-prod.sh"
