const path = require('path');

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    "plugin:@typescript-eslint/recommended",

    // tsconfig で "jsx": "react-jsx" を設定しているので一部ルールを無効化するために使用
    'plugin:react/jsx-runtime',

    "plugin:jsx-a11y/recommended",
    "plugin:total-functions/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist","vite.config.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh", "@typescript-eslint", "jsx-a11y", "total-functions"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-implicit-coercion": "error",
    // キャメルケースの強制
    camelcase: ["error", { properties: "never" }],
    quotes: ["error", "single"],
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "single"],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/method-signature-style": "error",
    "prefer-template": "error",
    // PrettierのルールをESLintに適用
    "prettier/prettier": ["error", {
      "printWidth": 80,
      "semi": false,
      "tabWidth": 2,
      "bracketSpacing": true,
      "singleQuote": true,
      "jsxSingleQuote": true,
      "trailingComma": "none"
    }],
  },

  parserOptions: {
    ecmaVersion: "latest", // 最新のECMAScriptの構文を使う
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: path.resolve(__dirname, './tsconfig.json')
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
      node: true,
    },
    react: {
      version: "detect",
    },
  },
};
