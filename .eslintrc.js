module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "indent": "off",
    "no-tabs": "off",
    "operator-linebreak": "warn",
    //"no-use-before-define": "off",
    "no-console": "off",
    //"global-require": "off",
    //"eqeqeq": "warn",
    "max-len": "warn",
    "no-plusplus": "off",
    "no-trailing-spaces": "warn",
    "no-multiple-empty-lines": "warn",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "warn",
    "import/no-named-as-default": "off",
    "spaced-comment": "warn",
  },
};
