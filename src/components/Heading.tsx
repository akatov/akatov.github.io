import React from 'react';

type HeadingProps = {
  name?: string;
};

export const Heading = ({ name = "TSX" }: HeadingProps) =>
  <h1 style={{ "backgroundColor": "orange", color: "purple" }}>
    Hello {name}
  </h1>
