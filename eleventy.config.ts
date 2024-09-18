// import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

export default function (eleventyConfig) {
  // We can add support for JSX too, at the same time:
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    // compile: function () {
    //   console.info("COMPILING")
    //   return async function (data) {
    //     let content = await this.defaultRenderer(data);
    //     return renderToStaticMarkup(content);
    //   };
    // },
  });

  return {
    dir: {
      input: 'site',
      output: '_site',
    }
  }
}
