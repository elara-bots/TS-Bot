module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        semi: ["error", "always"],
        curly: ["error", "all"],
        "@typescript-eslint/no-var-requires": 0,
        "no-warning-comments": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "object-shorthand": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-explicit-any": 0,
        "no-async-promise-executor": 0,
        "@typescript-eslint/ban-ts-comment": 0
    },
    "ignorePatterns": [
        "dist/*"
    ]
};