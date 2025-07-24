const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['eslint.config.js'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
];
