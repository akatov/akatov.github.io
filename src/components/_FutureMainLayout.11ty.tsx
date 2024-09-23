// import React from "react";

import { Heading } from "$/components/_FutureHello";
import { ViewProps } from "$/eleventy";

export const MainLayout = <T extends Partial<ViewProps>>({
  content,
  title,
}: T) => {
  console.info("type of content is", typeof content);
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/style.css" type="text/css" />
      </head>
      <body>
        <Heading name={title} />
        {/* <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div> */}
        {typeof content === "string" ? (
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        ) : (
          // in case this we use a tsx page inside a tsx template
          content
        )}
      </body>
    </html>
  );
};

export const render = MainLayout;
