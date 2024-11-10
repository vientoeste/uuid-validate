import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default {
  ignores: ["**/*.js"],
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  )
};