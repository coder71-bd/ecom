import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'warn',
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['**/node_modules/', '**/dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
