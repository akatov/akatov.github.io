/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./theme/templates/*.html",
    "./posts/*.org",
  ],
  safelist: [
    "note",
    "org-builtin",
    "org-doc",
    "org-function-name",
    "org-keyword",
    "org-string",
    "org-type",
    "org-variable-name",
    "org-comment",
    "org-comment-delimiter",
    "org-src-container",
  ],
  theme: {
    extend: {
      colors: {
        "cl-border": "var(--cl-border)",
        "cl-foreground": "var(--cl-foreground)",
        "cl-background": "var(--cl-background)",
        "cl-gray": "var(--cl-gray)",
        "cl-note": "var(--cl-note)",
        "cl-link": "var(--cl-link)",
        "cl-code-background": "var(--cl-code-background)",
        "cl-code-foreground": "var(--cl-code-foreground)",
        "cl-code-builtin": "var(--cl-code-builtin)",
        "cl-code-comment": "var(--cl-code-comment)",
        "cl-code-function-name": "var(--cl-code-function-name)",
        "cl-code-keyword": "var(--cl-code-keyword)",
        "cl-code-string": "var(--cl-code-string)",
        "cl-code-type": "var(--cl-code-type)",
        "cl-code-variable-name": "var(--cl-code-variable-name)",
      },
    },
    fontFamily: {
      "serif": [
        "Lora",
        "serif",
      ]
    }
  },
  plugins: [],
};
