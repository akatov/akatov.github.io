import { expect, test } from "vitest";
// import { jsxToString } from "jsx-async-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { MainLayout } from "./MainLayout.11ty";
import { screen } from "@testing-library/dom";
// import { ViewProps } from "../eleventy";

test(MainLayout, async () => {
  const viewProps = {
    content: "<p>This is <em>the body</em></p>",
    title: "My Site",
  };
  // const result = MainLayout(viewProps);
  // console.info('child', result.props.children[1].props.children);
  const x = renderToStaticMarkup(<MainLayout {...viewProps} />);
  console.info({ x });
  document.body.innerHTML = x;
  expect(screen.getByText(`Hello My Site`)).toBeTruthy();
  expect(screen.getByText(`the body`)).toBeTruthy();
});
