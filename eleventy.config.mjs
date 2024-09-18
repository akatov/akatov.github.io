import "tsx/esm";
// import "@mdx-js/node-loader";
import rss from "@11ty/eleventy-plugin-rss";
import navigation from "@11ty/eleventy-navigation";
import { renderToStaticMarkup } from "react-dom/server.js";
// import { register } from "node:module";
// register("@mdx-js/node-loader", import.meta.url);
 import mdx from "@jamshop/eleventy-plugin-mdx";

export default function (eleventyConfig) {
  // eleventyConfig.addTemplateFormats("md,11ty.js,11ty.ts,11ty.tsx");
  eleventyConfig.addTemplateFormats("md");
  eleventyConfig.addTemplateFormats("mdx");
  eleventyConfig.addTemplateFormats("11ty.js");
  eleventyConfig.addTemplateFormats("11ty.ts");
  eleventyConfig.addTemplateFormats("11ty.tsx");
  // eleventyConfig.addTemplateFormats("md,11ty.js,11ty.ts,11ty.tsx");
  // eleventyConfig.addTemplateFormats("md,11ty.js,11ty.ts,11ty.tsx");
  // eleventyConfig.addTemplateFormats("md,11ty.js,11ty.ts,11ty.tsx");

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addPassthroughCopy({ "_dist/assets": "assets" });

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function (...args) {
      return async function (data) {
        const self = this;
        const rendered = await this.defaultRenderer(data);
        const child = undefined; // rendered.props.children[1].props.children;
        // console.info("compile tsx", { args, self, data, rendered, child });
        return rendered;
      }
    }
  });

  // eleventyConfig.addExtension("mdx", {
  //   key: "11ty.js",
  //   compile: async (args) => {
  //     // console.info({ args });
  //     return async function (data) {
  //       const self = this;
  //       const rendered = await this.defaultRenderer(data);
  //       const markup = renderToStaticMarkup(rendered);
  //       console.info("compile mdx", { args, self, data, rendered, markup, result });
  //       return markup;
  //     };
  //   },
  // });

  eleventyConfig.addTransform("tsx", async (content) => {
    return typeof content === 'object' && content['$$typeof'] === Symbol.for('react.element') ? renderToStaticMarkup(content) : content;
    let result;
    if (typeof content === 'string') {
      if (content.includes('abracadabra')) {
      // if this has already been processed, e.g. a *.md or *.11ty.{js,ts,jsx,tsx} file
        console.info("ABRACADABRA transform tsx: content is string")
      }
      result = content;
    } else {
      // content is 
      // result = await jsxToString(content);
      const child = undefined; // content.props.children[1].props.children
      result = renderToStaticMarkup(content);
      console.info("transform tsx", { content, child, result });
    }
    return result;
    return `<!doctype html>\n${result}`;
  });

  // eleventyConfig.addExtension(["mdx"], {
  //   key: "11ty.js",
  //   compile: () => {
  //     console.info("IN COMPILE")
  //     return async function (data) {
  //       console.info("IN ASYNC COMPILE", data)
  //       let content = await this.defaultRenderer(data);
  //       return renderToStaticMarkup(content);
  //     };
  //   },
  // });

  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPlugin(navigation);
  eleventyConfig.addPlugin(mdx, { includeCDNLinks: true });

  // Output year for copyright notices
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addWatchTarget("./src");
  eleventyConfig.addWatchTarget("./pages");

  return {
    dir: {
      input: "pages",
      data: "../src/data",
      layouts: "../src/layouts",
      includes: "../src/includes",
      output: "_dist/site",
    },
  };
}
