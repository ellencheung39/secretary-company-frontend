module.exports = {
  // "env": {
  //   "amd": true
  // },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    //'plugin:vue/vue3-recommended'
    'plugin:vue/recommended',
    '@vue/standard',
    "prettier",
    // "plugin:prettier/recommended",
    "prettier/vue",
    // "eslint:recommended"
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}