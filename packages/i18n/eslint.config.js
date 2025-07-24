const { base, react } = require('@kit/eslint-config/eslint.config.js');

module.exports = [
  ...base,
  ...react,
  {
    ignores: ['eslint.config.js'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];