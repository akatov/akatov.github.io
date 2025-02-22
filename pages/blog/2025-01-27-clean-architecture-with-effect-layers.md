---
draft: true
title: Hexagonal Architecture with Effect Context and Layer
date: 2025-01-27
permalink: /blog/{{ title | slug }}/
tags:
  - effect
  - layer
  - architecture
---

## TLDR

- Port = Context Tag (name + Interface)
- App = `Layer<DrivenPorts, Error, DrivingPorts>`
- `DrivingPort` = Service implementation lives inside app. Context Interface usually has type `(input: TInput) =>  Effect<>`
- `DrivenPort` = Only interface exposed. Adapter implements service.

## Example

```ts

```