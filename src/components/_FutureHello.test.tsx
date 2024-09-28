import React from "react";

import { expect, test } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { screen } from "@testing-library/dom";
import { Heading } from "./_FutureHello";

test("render heading with default name", async () => {
  const result = <Heading />;
  document.body.innerHTML = renderToStaticMarkup(result);
  expect(screen.getByText("Hello TSX")).toBeTruthy();
});

test("render heading with custom name", async () => {
  const result = <Heading name={`World`} />;
  document.body.innerHTML = renderToStaticMarkup(result);
  expect(screen.getByText("Hello World")).toBeTruthy();
});
