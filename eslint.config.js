import globals from "globals";
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      eslintJs.configs.recommended,
      eslintReact.configs.recommended
    ],

    // Configure language/parsing options
    languageOptions: {
      // Include browser global variables (window, document, etc.)
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax support
        },
      },
    },
    rules: {
    },
  },
  globalIgnores([
    "dist/**",
  ])
);
