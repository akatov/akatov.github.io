---
draft: true
title: REX Stack - End-to-End web architecture
date: 2025-02-25
permalink: /blog/{{ title | slug }}/
tags:
  - effect
  - layer
  - architecture
  - react
  - rpc
---

## TLDR

- src
  - feature 1
    - components.tsx
    - rpc.schema.ts
    - rpc.client.ts
    - rpc.server.ts
    - app1.layer.ts
    - app1.rx.ts
    - app2.layer.ts # e.g. UI interaction
    - app2.rx.ts
    - app3.layer.ts # e.g. database
    - app3.rx.ts
  - feature 2
    - ...
