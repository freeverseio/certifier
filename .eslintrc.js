module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'react/prop-types': 1,
        'react-hooks/exhaustive-deps': 0,
        'max-len': 1,
        'no-useless-escape': 1,
        'react/no-unescaped-entities': 1,
        'react/destructuring-assignment': 1,
        'consistent-return': 1,
        'default-case': 1,
        'no-mixed-spaces-and-tabs': 1,
        'no-plusplus': 1,
        'react/jsx-indent': 1,
        'no-use-before-define': 1,
        'no-continue': 1,
        'no-restricted-syntax': 1,
        'react/no-array-index-key': 1,
        'no-param-reassign': 1,
        'prefer-spread': 1,
        'no-prototype-builtins': 1,
        'no-return-assign': 1,
        'global-require': 1,
        'no-restricted-globals': 1,
        'linebreak-style': 1,
        'object-curly-newline': 1,
    }
}
