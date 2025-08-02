// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  prettier,
  { rules: {
    'object-curly-newline': ['error', {
      ObjectExpression  : { minProperties: 2 },
      ImportDeclaration : {
        multiline     : true,
        minProperties : 3,
      },
      ExportDeclaration: 'never',
    }],
    'comma-dangle': ['error', {
      arrays    : 'always-multiline',
      objects   : 'always-multiline',
      imports   : 'always-multiline',
      exports   : 'always-multiline',
      functions : 'never',
    }],
    'object-property-newline' : ['error'],
    indent                    : ['error', 2],
    quotes                    : ['error', 'single'],
    'quote-props'             : ['error', 'as-needed'],
    'key-spacing'             : ['error', {
      beforeColon : false,
      afterColon  : true,
      mode        : 'strict',
      align       : {
        afterColon  : true,
        beforeColon : true,
        on          : 'colon',
      },
    }],
    'eol-last'                               : ['error', 'always'],
    'brace-style'                            : ['error', 'stroustrup'],
    'object-curly-spacing'                   : ['error', 'always'],
    '@typescript-eslint/no-extraneous-class' : ['warn'],
    'no-trailing-spaces'                     : ['error'],
    'comma-spacing'                          : ['error', {
      before : false,
      after  : true,
    }],
    'object-shorthand'                : ['error', 'always'],
    'padding-line-between-statements' : [
      'error',
      // Disallow multiple blank lines
      {
        blankLine : 'any',
        prev      : '*',
        next      : '*',
      },
      {
        blankLine : 'never',
        prev      : '*',
        next      : '*',
      },
      // Allow blank line before return
      {
        blankLine : 'always',
        prev      : '*',
        next      : 'return',
      },
      // Allow blank line after imports
      {
        blankLine : 'always',
        prev      : 'import',
        next      : '*',
      },
      {
        blankLine : 'any',
        prev      : 'import',
        next      : 'import',
      },
      // Allow blank line after directives (like 'use strict')
      {
        blankLine : 'always',
        prev      : 'directive',
        next      : '*',
      },
      {
        blankLine : 'any',
        prev      : 'directive',
        next      : 'directive',
      },
      {
        blankLine : 'always',
        prev      : 'function',
        next      : 'function',
      },
    ],
    'no-multiple-empty-lines': ['error', {
      max    : 1,
      maxEOF : 1,
    }],
  } }
);
