#!/usr/bin/env bash

docker run \
  --interactive \
  --tty \
  --volume $(pwd -P):/workspace \
  --publish 8000:80 \
  --rm \
  --name weblorg \
  maker2413/weblorg \
  $@
