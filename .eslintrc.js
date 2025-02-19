module.exports = {
  env: {
    node: true,
    es2022: true // or newer version if needed
  },
  extends: [
    'standard',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module' // This is important for ESM
  },
  rules: {
    'import/extensions': ['error', 'always'], // Enforce .js extensions for ESM
    'no-console': 'warn',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/'
  ]
}
