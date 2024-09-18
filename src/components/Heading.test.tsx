import { expect, test } from "vitest";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
// import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";
import { Heading } from "./Heading";

test("render heading with default name", async () => {
  const result = <Heading />;
  document.body.innerHTML = renderToString(result);
  expect(screen.getByText("Hello TSX")).toBeTruthy();
});

test("render heading with custom name", async () => {
  const result = <Heading name={`World`} />;
  document.body.innerHTML = renderToString(result);
  expect(screen.getByText("Hello World")).toBeTruthy();
});
