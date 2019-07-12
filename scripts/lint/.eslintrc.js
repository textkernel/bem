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
        'airbnb',
        'plugin:jest/recommended',
        // 'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    settings:  {
        // react:  {
        //     version:  'detect',
        // },
        'import/resolver': {
            'node': {
            'paths': ['src'],
            'extensions': ['.ts', '.tsx']
            }
        }
    },
    rules:  {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/interface-name-prefix': 'always',
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
