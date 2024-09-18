import React from 'react';

import { Heading } from "../src/components/Heading";
import { ViewProps } from "../src/eleventy";

export type IndexProps = {
  filePathStem: string;
};

export const Index = (
  { filePathStem }: IndexProps
) => {
  return (<>
    <Heading name={filePathStem} />
    <div>pure tsx renders fine</div>
  </>);
}

export function render({ page }: ViewProps) {
  return <Index filePathStem={page.filePathStem} />;
}
