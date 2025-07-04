import prettier from 'eslint-plugin-prettier';
import stylistic from '@stylistic/eslint-plugin';
import unicorn from 'eslint-plugin-unicorn';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import n from 'eslint-plugin-n';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import yamlParser from 'yaml-eslint-parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = import.meta.dirname;
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [{
    ignores: [
        '**/coverage',
        '**/.vscode',
        '**/docker-compose.yml',
        '!.github',
        'assets/build',
        'lib/routes-deprecated',
        'lib/router.js',
        '**/babel.config.js',
        'scripts/docker/minify-docker.js',
        'dist',
    ],
}, ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:yml/recommended',
    'plugin:@typescript-eslint/recommended',
),
n.configs['flat/recommended-script'],
unicorn.configs.recommended,
{
    plugins: {
        prettier,
        '@stylistic': stylistic,
        '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    rules: {
        // possible problems
        'array-callback-return': ['error', {
            allowImplicit: true,
        }],

        'no-await-in-loop': 'error',
        'no-control-regex': 'off',
        'no-duplicate-imports': 'error',
        'no-prototype-builtins': 'off',

        // suggestions
        'arrow-body-style': 'error',
        'block-scoped-var': 'error',
        'curly': 'error',
        'dot-notation': 'error',
        'eqeqeq': 'error',

        'default-case': ['warn', {
            commentPattern: '^no default$',
        }],

        'default-case-last': 'error',
        'no-console': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-label': 'error',

        'no-implicit-coercion': ['error', {
            boolean: false,
            number: false,
            string: false,
            disallowTemplateShorthand: true,
        }],

        'no-implicit-globals': 'error',
        'no-labels': 'error',
        'no-multi-str': 'error',
        'no-new-func': 'error',
        'no-restricted-imports': 'error',

        'no-restricted-syntax': ['error', {
            selector: "CallExpression[callee.property.name='get'][arguments.length=0]",
            message: "Please use .toArray() instead.",
        }, {
            selector: "CallExpression[callee.property.name='toArray'] MemberExpression[object.callee.property.name='map']",
            message: "Please use .toArray() before .map().",
        }],

        'no-unneeded-ternary': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'warn',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-object-has-own': 'error',
        'no-useless-escape': 'warn',

        'prefer-regex-literals': ['error', {
            disallowRedundantWrapping: true,
        }],

        'require-await': 'error',

        // typescript
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        '@typescript-eslint/no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTernary: true,
        }],

        // unicorn
        'unicorn/consistent-function-scoping': 'warn',
        'unicorn/explicit-length-check': 'off',

        'unicorn/filename-case': ['error', {
            case: 'kebabCase',
            ignore: [String.raw`.*\.(yaml|yml)$`, String.raw`RequestInProgress\.js$`],
        }],

        'unicorn/no-array-callback-reference': 'warn',
        'unicorn/no-array-reduce': 'warn',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-empty-file': 'warn',
        'unicorn/no-hex-escape': 'warn',
        'unicorn/no-null': 'off',
        'unicorn/no-object-as-default-parameter': 'warn',
        'unicorn/no-nested-ternary': 'warn',
        'unicorn/no-process-exit': 'off',
        'unicorn/no-useless-switch-case': 'off',

        'unicorn/no-useless-undefined': ['error', {
            checkArguments: false,
        }],

        'unicorn/numeric-separators-style': ['warn', {
            onlyIfContainsSeparator: false,

            number: {
                minimumDigits: 7,
                groupLength: 3,
            },

            binary: {
                minimumDigits: 9,
                groupLength: 4,
            },

            octal: {
                minimumDigits: 9,
                groupLength: 4,
            },

            hexadecimal: {
                minimumDigits: 5,
                groupLength: 2,
            },
        }],

        'unicorn/prefer-code-point': 'warn',
        'unicorn/prefer-global-this': 'off',
        'unicorn/prefer-import-meta-properties': 'warn',
        'unicorn/prefer-module': 'off',

        'unicorn/prefer-number-properties': ['error', {
            checkInfinity: false,
            checkNaN: false,
        }],

        'unicorn/prefer-spread': 'warn',
        'unicorn/prefer-string-slice': 'warn',

        'unicorn/prefer-switch': ['warn', {
            emptyDefaultCase: 'do-nothing-comment',
        }],

        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/switch-case-braces': ['error', 'avoid'],
        'unicorn/text-encoding-identifier-case': 'off',

        // formatting rules
        '@stylistic/arrow-parens': 'error',
        '@stylistic/arrow-spacing': 'error',
        '@stylistic/comma-spacing': 'error',
        '@stylistic/comma-style': 'error',
        '@stylistic/function-call-spacing': 'error',
        '@stylistic/keyword-spacing': 'error',
        '@stylistic/linebreak-style': 'error',

        '@stylistic/lines-around-comment': ['error', {
            beforeBlockComment: false,
        }],

        '@stylistic/no-multiple-empty-lines': 'error',
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/rest-spread-spacing': 'error',
        '@stylistic/semi': 'error',
        '@stylistic/space-before-blocks': 'error',
        '@stylistic/space-in-parens': 'error',
        '@stylistic/space-infix-ops': 'error',
        '@stylistic/space-unary-ops': 'error',
        '@stylistic/spaced-comment': 'error',

        // https://github.com/eslint-community/eslint-plugin-n
        // node specific rules
        'n/no-extraneous-require': 'error',

        'n/no-deprecated-api': 'warn',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-process-exit': 'off',
        'n/no-unpublished-import': 'off',

        'n/no-unpublished-require': ['error', {
            allowModules: ['tosource'],
        }],

        'prettier/prettier': 'off',

        'yml/quotes': ['error', {
            prefer: 'single',
        }],

        'yml/no-empty-mapping-value': 'off',
    },
}, {
        files: ['.puppeteerrc.cjs', 'api/vercel.ts'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
}, {
        files: ['**/*.yaml', '**/*.yml'],

        languageOptions: {
            parser: yamlParser,
        },

        rules: {
            'lines-around-comment': ['error', {
                beforeBlockComment: false,
            }],
        },
}];
