module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // disable NodeJS not defined
  globals: {
    NodeJS: true,
  },

  overrides: [
    {
      // check only .ts, .tsx files
      files: ['src/**/*.{ts,tsx}'],
      extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: ['react', '@typescript-eslint', 'react-hooks'],

      rules: {
        camelcase: 'off',
        'react/prop-types': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': [
          1,
          { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'react/react-in-jsx-scope': 'off',
        'no-console': [0, { extensions: ['.js', '.jsx'] }],
        //disable requiring importing file extension
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],

        // fix enum type already declared eslint issue
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-props-no-spreading': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      },
      settings: {
        //disable requiring importing file extension
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
  ],
};
