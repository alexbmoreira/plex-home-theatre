import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...stylistic.configs.recommended.rules,
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/jsx-tag-spacing': ['warn', { beforeSelfClosing: 'never', beforeClosing: 'allow' }],
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/jsx-closing-bracket-location': ['warn', 'line-aligned'],
      '@stylistic/jsx-closing-tag-location': ['warn', 'line-aligned'],
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/brace-style': ['warn', '1tbs'],
      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'always', propElementValues: 'always' }],
      'react/jsx-uses-vars': 'error'
    }
  }
];
