#!/usr/bin/env bash

rm -f site.el
rm -rf output

docker run \
  --interactive \
  --tty \
  --volume $(pwd -P):/workspace \
  --env PRE_BUILD_SCRIPT=pre.sh \
  --publish 8000:80 \
  --rm \
  --name weblorg \
  maker2413/weblorg \
  $@
