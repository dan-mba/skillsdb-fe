import globals from "globals";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsx from "eslint-plugin-react/configs/jsx-runtime.js";
import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**/*"],
  },
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    ...reactRecommended,
    ...reactJsx,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
      }
    },
    rules: {
    },
  }
];
