// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * The project had Prettier but no linting, so nothing caught unused code,
 * mistaken hook dependencies, or the accessibility defects the audit had to
 * find by hand (a missing skip link, a menu with no Escape handler, controls
 * without labels). jsx-a11y catches that class of bug automatically from here
 * on.
 *
 * Warnings, not errors, for the a11y rules on first adoption: the goal is to
 * surface issues without blocking the build on a large existing codebase.
 * Correctness rules stay errors.
 */
export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "drizzle/**",
      "client/src/components/ui/**", // vendored shadcn primitives
      "client/public/**",
      "*.config.ts",
      "*.config.js",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Unused code is the single most common source of drift in this repo —
      // the audit found three whole components nobody imported.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // `any` is present in the existing code; flag it without failing yet.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",

      // Accessibility: report, do not block, during adoption.
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    languageOptions: { globals: { ...globals.node } },
  },

  {
    // Build and ingestion scripts are Node programs; `process` and `console`
    // are expected there.
    files: ["scripts/**/*.{mjs,js}"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: { "no-undef": "off" },
  },

  {
    // `setState` inside an effect is the documented pattern for syncing to an
    // external store (media queries, route changes, resolved query data). The
    // compiler rule flags all of them; the ones here are intentional and each
    // has a dependency array that prevents a loop.
    files: ["client/src/**/*.{ts,tsx}"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  }
);
