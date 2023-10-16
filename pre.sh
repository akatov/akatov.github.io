#!/usr/bin/env bash

echo "running pre.sh"

cat <<EOF > site.el
(setq
 site
 (weblorg-site
  :base-url "http://localhost:8000"
  :template-vars
  '(("site_name" . "Dmitri's Blog (dev)")
    ("site_owner" . "Dmitri Akatov")
    ("site_description" . "Dmitri Akatov's Blog"))))

(provide 'site)
EOF
