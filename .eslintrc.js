const platformSuffixes = ['', '.android', '.ios', '.web'];
const extensions = ['js', 'jsx', 'ts', 'tsx'];

const platformExtensions = platformSuffixes.flatMap((platform) =>
  extensions.map((extension) => [platform, extension].join('.')),
);

module.exports = {
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/react-native',
    'plugin:react/all',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: [
        './tests/**/*.{js,ts,tsx}',
        '*.{spec,test}.{js,ts,tsx}',
        '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
      ],
      rules: {
        'react/display-name': 'off',
        'react-native/no-color-literals': 'off',
      },
    },
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json', './tsconfig.json'],
  },
  root: true,
  rules: {
    camelcase: ['error', { allow: ['^UNSAFE_'] }],
    curly: 'error',
    'no-console': 'error',
    'no-param-reassign': [
      'error',
      { ignorePropertyModificationsFor: ['state'], props: true },
    ],
    'no-underscore-dangle': 'error',
    // ---
    // Import
    // Many imports are not named, especially from I18n and React
    'import/no-named-as-default-member': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './modules/payments',
            from: './modules/bank/payments/**/*[qQ][rR][bB]ill*',
            message: 'The payments module should never import from bank one.',
          },
        ],
      },
    ],
    // ---
    // Jest
    // Allow custom expectations functions starting with "expect"
    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'expect\\w*'] },
    ],
    // ---
    // React
    // Once we migrate to ts we can remove js extension
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    // We are bad guys
    'react/jsx-max-depth': ['error', { max: 9 }],
    // Allow uppercase and namespaced components
    'react/jsx-pascal-case': [
      'error',
      { allowAllCaps: true, allowNamespace: true },
    ],
    // Allow props spreading
    'react/jsx-props-no-spreading': 'off',
    // Allow functions inline declarations
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    // Allow multiple stateless components in a file
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    // Disallow usages of unsafe lifecycle methods
    'react/no-unsafe': ['error', { checkAliases: true }],
    // Disallow using class components
    'react/prefer-stateless-function': 'error',
    // Check props types only when defined
    'react/prop-types': ['error', { skipUndeclared: true }],
    // Allow raw text for custom components
    'react-native/no-raw-text': [
      'error',
      {
        skip: [
          'Caption',
          'Footnote',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'Label',
          'Regular',
          'Subtitle',
          'Typography',
        ],
      },
    ],
    // ---
    // ! Auto-fixable rules we could enable in the future
    // Disallow passing style as a prop
    'react/forbid-component-props': 'off',
    // Enforce components to be written as an arrow function
    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Disallow useless curly braces around props
    'react/jsx-curly-brace-presence': 'off',
    // Enforce common handler names
    'react/jsx-handler-names': 'off',
    // Enforce curly braces around children
    'react/jsx-no-literals': 'off',
    // Enforce sorting props alphabetically
    'react/jsx-sort-props': 'off',
    // Disallow not memoized nested components
    'react/no-unstable-nested-components': 'off',
    // Enforce not required props to have default values
    'react/require-default-props': 'off',
    // ---
    // * Disable checks for class components since they are disallowed
    'react/jsx-sort-default-props': 'off',
    'react/require-optimization': 'off',
    'react/static-property-placement': 'off',
    // ---
    // Testing Library
    'testing-library/no-await-sync-events': 'error',
    'testing-library/no-global-regexp-flag-in-query': 'error',
    'testing-library/no-manual-cleanup': 'error',
    'testing-library/prefer-explicit-assert': [
      'error',
      { assertion: 'toBeDefined' },
    ],
    // ! Remove this rule after upgrading Testing Library to the latest version
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/prefer-wait-for': 'error',
    // ---
    // TypeScript
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
  settings: {
    'import/extensions': platformExtensions,
    'import/ignore': [
      // Deprecate packages that will be removed soon
      'react-native-action-sheet-ios',
      'react-native-push-notification',
      // * `Animated` default export is not detected
      'react-native-reanimated',
    ],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: platformExtensions,
      },
    },
  },
};
