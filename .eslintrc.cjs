module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    project: './tsconfig.app.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  ignorePatterns: [
    "_dist/**",
    ".eslintrc.cjs",
  ],
  overrides: [
    {
      files: ["vitest.config.ts"],
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        project: './tsconfig.node.json',
      },      
      "rules": {
        "@typescript-eslint/switch-exhaustiveness-check": "error",
      }
    }
  ],  
};
