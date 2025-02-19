module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'n/exports-style': ['error', 'module.exports']
  },
  plugins: ['promise', 'n'],
  ignorePatterns: ['test/']
}
