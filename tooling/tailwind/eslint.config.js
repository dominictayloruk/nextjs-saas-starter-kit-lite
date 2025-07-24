const { base } = require('@kit/eslint-config/eslint.config.js');

module.exports = [
  ...base,
  {
    ignores: ['eslint.config.js', 'package.json', 'tsconfig.json'],
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
