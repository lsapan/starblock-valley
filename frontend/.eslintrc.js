module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-cycle': 'off',
        indent: ['error', 4],
        'max-len': 'off',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-param-reassign': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'no-underscore-dangle': 'off',
        'prefer-destructuring': 'off',
        radix: ['error', 'as-needed'],
        semi: ['error', 'never'],
        'consistent-return': 'off',
        camelcase: 'off',
        'no-nested-ternary': 'off',
    },
}
