import { recommended as pluginCspellRecommended } from "@cspell/eslint-plugin/configs";
import eslint from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginImportX from "eslint-plugin-import-x";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginSonarjs from "eslint-plugin-sonarjs";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint, { configs as tseslintConfigs } from "typescript-eslint";

export default tseslint.config(
  { ignores: ["node_modules", ".pnpm-store", "dist", "build"] },
  {
    plugins: {
      ["react-hooks"]: pluginReactHooks,
      ["unused-imports"]: pluginUnusedImports,
    },
  },
  eslint.configs.recommended,
  ...tseslintConfigs.strictTypeChecked,
  ...tseslintConfigs.stylisticTypeChecked,
  configPrettier,
  pluginCspellRecommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  pluginJsxA11y.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  pluginSonarjs.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: "./tsconfig.eslint.json",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,

      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: false },
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    ...tseslintConfigs.disableTypeChecked,
  },
);
