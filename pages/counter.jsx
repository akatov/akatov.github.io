import React from 'react';

export function Counter(props) {
    console.info({props});
    const [count, setCount] = React.useState(props.start ?? 0);
    return <button className="border-4" onClick={() => setCount(count + 1)}>Counter: {count}</button>
}
