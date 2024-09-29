// @see https://johnnyreilly.com/typescript-eslint-with-jsdoc-js

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
//@ts-expect-error no type definitions for eslint-plugin-react
import pluginReact from "eslint-plugin-react";

/** @type {import("./node_modules/eslint/lib/shared/types").ConfigData} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["_dist", "eleventy.config.mjs", "eleventy-plugin-drafts.mjs"] },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // yes we are using type checked
  {
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginReact.configs.flat.recommended,
  { settings: { react: { version: "detect" } } },
  {
    rules: {
      // Not compatible with JSDoc according to @bradzacher and https://github.com/typescript-eslint/typescript-eslint/issues/8955#issuecomment-2097518639
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/parameter-properties": "off",
      "@typescript-eslint/typedef": "off",
    },
  },
];
