---
draft: true
title: useEffectEffect with Layers
date: 2025-01-24
permalink: /blog/{{ title | slug }}/
tags:
  - react
  - effect
  - layer
---

## TLDR

`React.useEffect` but executing an `Effect` and providing it with a `Layer`.

## Example

```ts
export const MyComponent = ({ state, actions }) => {

  const [localState, setLocalState] = React.useState(state);

  ////////////////// Plain React Hook //////////////////
  React.useEffect(() => {
    // sideeffects
    // ...
    setLocalState(
      // ...
    )

    return () => {
      // teardown
    }
  }, [state.a, actions.b])

  //////////// Plain React hook with Effect ////////
  React.useEffect(() => {
    const teardown = {
      teardown: () => {
        // empty teardown
      }
    }
    Effect.gen(function*() {
      const service = yield* Layer;
      service.operate()
      // do stuff
      teardown.teardown = () => {
        // actual teardown
      }
    }).pipe(
      Effect.provide(Layer, layer),
      Effect.runPromise
    )
    return () => teardown.teardown();
  }, [dependencies])

  // What I'd like to see
  useEffectEffect(Effect.gen(function*(cleanupRef) {
    const service = yield* Layer;
  }), layer)

  return (
    <>
      ...
    </>
  )
}
```

## TODO

How and why to use `React.useContext` to pass parameters rather than instantiating a singleton.
