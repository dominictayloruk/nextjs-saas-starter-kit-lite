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
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'no-redeclare': 'off',
      'no-constant-binary-expression': 'off',
    },
  },
];