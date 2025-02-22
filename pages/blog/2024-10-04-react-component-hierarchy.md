---
draft: true
title: React Component Hierarchy
date: 2024-10-04
permalink: /blog/{{ title | slug }}/
tags:
  - react
---

## TLDR

Designing clean pluggable components with design completely separated from content and thus providing a clean way to test them.

```mermaid
---
title: Component Type Hierarchy
---
flowchart BT

D[Display Only Components]

C[Conditional Component]

C --> D

M[Mapped Component]

M --> C

IS[Internal State Component]

IS --> M

ES[External State Component - props or context]

ES --> IS

```

## The Hierarchy

### Display Only Component

```ts
const MyDisplayOnlyComponent = ({ state, action }) => (
  <button onClick={() => action()}>
    {state}
  </button>
)
```

### Maybe Component

```ts
const MyMaybeComponent = ({ maybeState, action }) => maybeState.pipe(
  Option.map((state) => <DisplayComponent state={state} action={action} />),
  Option.orElse(() => <FallbackComponent state={...} action={...} />)
);
```

### Conditional Component

```ts
const MyConditionalComponent = ({ state, action }) => Match.value(state).pipe(
  Match.when({ _tag: 'Option1'}, () => MyDisplayComponent1),
  Match.when({ _tag: 'Option2'}, () => MyDisplayComponent2),
  ...,
  Match.exhaustive,
  (DisplayComponent) => <DisplayComponent state={state} action={action} />
);
```

### Mapped Component

```ts
const MyMappedComponent = ({ state, action }) => <></>
```

----

Given a complicated component

```ts
const MyComponent = ({ externalPropState, externalPropActions }) => {
  const { externalContextState, externalContextActions } = useContext(...);
  const { internalState, internalActions } = useLocalStateAndActions(...);
  return (
    <>
    </>
  );
}
```

we can break it down and rewrite it as

```ts
const DisplayComp1 = ({state, actions}) => <> {...} </>
const DisplayComp2 = ({state, actions}) => <> {...} </>
const DisplayComp3 = ({state, actions}) => <> {...} </>

const CombinedComp = ({externalState, externalActions}) => {
  const { internalState, internalActions } = useLocal({externalState, externalActions});
  return (
    <>
      <DisplayComp1 {...}/>
      <DisplayComp2 {...}/>
      <DisplayComp3 {...}/>
    </>
  )
}

const FullComp = () => {
  const { state, actions } = useContext(...);
  return (
    <CombinedComp {...{ state, actions } } />
  )
}
```

And here is the dependency diagram:

```mermaid
flowchart BT

TI[Type Interface] --> T[Type]
EM[Emtity Model] --> TI
SC1[Simple Component 1] --> T
SC2[Simple Component 2] --> T
SC3[Simple Component 2] --> T
CC[Combined Component] --> SC1
CC --> SC2
CC --> SC3
CC --> TI
CL[ControllerLive] --> CC
CL --> EM
CT[ControllerTest] --> CC
CT --> TI
```
