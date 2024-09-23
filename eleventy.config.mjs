import mdAttrs from 'markdown-it-attrs';
import syntaxhighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { DateTime } from "luxon";
import "tsx/esm";
// import "@mdx-js/node-loader";
import rss from "@11ty/eleventy-plugin-rss";
import navigation from "@11ty/eleventy-navigation";
import { renderToStaticMarkup } from "react-dom/server.js";
// import { register } from "node:module";
// register("@mdx-js/node-loader", import.meta.url);
import mdx from "@jamshop/eleventy-plugin-mdx";
import bundle from '@11ty/eleventy-plugin-bundle';
import drafts from './eleventy-plugin-drafts.mjs';
import vite from '@11ty/eleventy-plugin-vite';

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
  // put all assets in one place, in particular so index.css can aggregate them through relative paths
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/prismjs/themes/prism-okaidia.css": "assets/prism-okaidia.css",
  });

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        return await this.defaultRenderer(data);
      };
    },
  });

  eleventyConfig.addTransform("tsx", async (content) =>
    typeof content === "object" &&
    content["$$typeof"] === Symbol.for("react.element")
      ? renderToStaticMarkup(content)
      : content
  );

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
  eleventyConfig.addPlugin(bundle);
  eleventyConfig.addPlugin(syntaxhighlight, { preAttributes: { tabindex: 0 } });
  eleventyConfig.addPlugin(drafts);
  eleventyConfig.addPlugin(vite, {});

  // Output year for copyright notices
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("currentBuildDate", () => {
    return new Date().toISOString();
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "dd LLLL yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  });

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(mdAttrs));

  eleventyConfig.addWatchTarget("./src");
  eleventyConfig.addWatchTarget("./pages");
  eleventyConfig.addWatchTarget("./public");

  return {
    dir: {
      input: "./pages",
      data: "../src/data",
      layouts: "../src/layouts",
      includes: "../src/includes",
      output: "./_dist/site", // vite plugin needs this to start with "./"
    },
  };
}
