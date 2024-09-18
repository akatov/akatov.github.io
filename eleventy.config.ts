// import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";
import { jsxToString } from "jsx-async-runtime";

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

  eleventyConfig.addTransform("tsx", async (content: any) => {
    const result = await jsxToString(content);
    return `<!doctype html>\n${result}`;
  });

  return {
    dir: {
      input: 'site',
      output: '_site',
    }
  }
}
