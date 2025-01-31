# Linter

## Package.json
```
{
    "version": "1.0.0",
    "name": "api",
    "type": "module",
    "scripts": {
        "lint": "eslint .",
        "lint-fix": "eslint . --fix"
    },
    "devDependencies": {
        "@stylistic/eslint-plugin": "^2.12.0",
        "eslint-config-airbnb": "^19.0.4",
        "eslint-config-prettier": "^9.1.0",
        "eslint-plugin-prettier": "^5.2.1",
        "eslint-plugin-promise": "^7.2.1",
        "prettier": "^3.4.2"
    }
}
```

## .eslintrc.cjs (à mettre à la racine)

```
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    ignorePatterns: ["node_modules"],
    extends: ["eslint:recommended", "airbnb", "plugin:prettier/recommended"],
    plugins: ["@stylistic"],
    rules: {
        // Classic rules
        "no-console": ["warn", { allow: ["error"] }],

        // Prettier rules
        "prettier/prettier": [
        "error",
        {
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: false,
            quoteProps: "consistent",
            trailingComma: "all",
            bracketSpacing: true,
            bracketSameLine: false,
            arrowParens: "always",
            endOfLine: "auto",
            singleAttributePerLine: true,
        },
        ],
    },
};
```

## Linter en .mjs (.eslintrc.cjs)

```
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.mjs"], // Spécifiez les fichiers concernés
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            // Règles ESLint classiques
            "no-console": ["warn", { allow: ["error"] }],

            // Règles Prettier
            "prettier/prettier": [
                "error",
                {
                    printWidth: 80,
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    singleQuote: false,
                    trailingComma: "all",
                    bracketSpacing: true,
                    arrowParens: "always",
                    endOfLine: "auto",
                },
            ],
        },
    },
];
```
