module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, parser: 'flow' },
      {
        printWidth: 80,
        trailingComma: 'es5',
        semi: false,
        jsxSingleQuote: true,
        singleQuote: true,
        useTabs: true,
      },
    ],
  },
};
