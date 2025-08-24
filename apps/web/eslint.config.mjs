import pkg from '@kit/eslint-config/eslint.config.js';

const { base, react, nextjs } = pkg;

export default [
  ...base,
  ...react,
  ...nextjs,
  {
    ignores: [
      'eslint.config.js',
      '.next/**/*',
      'postcss.config.cjs',
      'next.config.mjs',
    ],
  },
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        crypto: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'import/consistent-type-specifier-style': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];
