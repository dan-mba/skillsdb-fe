module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off",
    }
};
