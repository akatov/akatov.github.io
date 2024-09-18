import React from 'react';
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { expect, test } from "vitest";
// import { jsxToString } from "jsx-async-runtime";
import { render, Index } from "./index.11ty";
import { screen } from "@testing-library/dom";
import { ViewProps } from "../src/eleventy";

// const bla: React.ReactElement = <div>hello</div>;
const bla = 'bla';
const Bley = () => <div>Hello /index</div>;
// const Bley = () => '';
type A = typeof Bley;
type B = ReturnType<A>;

test(Index, async () => {
  const x = <Index filePathStem="/index" />;
  const a = renderToStaticMarkup(x);
  document.body.innerHTML = a;
  expect(screen.getByText(`Hello /index`)).toBeTruthy();
});

test(render, async () => {
  const viewProps: ViewProps = {
    page: { filePathStem: "/index" },
  };
  // Let's do this as a call, rather than TSX, to remind
  // ourselves that this is a view, not a "component".
  document.body.innerHTML = renderToStaticMarkup(render(viewProps));
  expect(screen.getByText(`Hello /index`)).toBeTruthy();
});
