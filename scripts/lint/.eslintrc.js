module.exports =  {
    parser: '@typescript-eslint/parser',
    parserOptions:  {
        warnOnUnsupportedTypeScriptVersion: false,
        project: 'tsconfig.json',
        ecmaVersion:  2018,
        sourceType:  'module',
        ecmaFeatures:  {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es6: true,
    },
    extends:  [
        'airbnb/base',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    settings:  {
        'import/resolver': {
            'node': {
            'paths': ['src'],
            'extensions': ['.ts', '.tsx']
            }
        }
    },
    rules:  {
        'indent': ["error", 4, { SwitchCase: 1 }],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/interface-name-prefix': ['error', { "prefixWithI": "never" }],
        '@typescript-eslint/prefer-interface': 'off',
    },
    overrides: [
        {
            files: ['*.spec.ts'],
            rules: {
               '@typescript-eslint/explicit-function-return-type': 'off',
               'dot-notation': 'off',
            },
        },
        {
            files: ['**/scripts/**/*.ts', '**/scripts/**/*.js'],
            rules: {
               'import/no-extraneous-dependencies': 'off',
            },
        },
        {
            files: ['index.ts'],
            rules: {
               'import/prefer-default-export': 'off',
            },
        }
    ],
};
