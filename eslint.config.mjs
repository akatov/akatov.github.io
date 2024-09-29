import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";

/** @type import("./node_modules/eslint/lib/shared/types").ConfigData */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,
  { settings: { react: { version: "detect" } } },
  { ignores: ["_dist"] },
];
