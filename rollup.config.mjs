/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

const packageJson = JSON.parse(readFileSync('./package.json'));
const tsConfig = JSON.parse(readFileSync('./tsconfig.json'));

const applyCustomization = (defaultConfig, customConfig) => {
    let output = defaultConfig.output;

    if (customConfig.output?.[0] !== undefined) {
        output[0] = {
            ...output[0],
            ...customConfig.output[0]
        };

        if (customConfig.output[1] !== undefined) {
            customConfig.output.shift();

            output = [
                ...output,
                ...customConfig.output
            ];
        }
    }

    const plugins = [
        ...sharedConfigs.plugins,
        ...customConfig.plugins,
        ...defaultConfig.plugins
    ];

    return {
        ...sharedConfigs,
        ...customConfig,
        output,
        plugins
    };
};

// #region Mock Data:
const tempFolder = '.temp';
if (!existsSync(tempFolder))
    mkdirSync(tempFolder);

const mockFile = `${tempFolder}/mock.js`;
if (!existsSync(mockFile))
    writeFileSync(mockFile, 'export default () => 42;');

const mockConfig = {
    input: '.temp/mock.js',
    output: [{ dir: '.temp/' }]
};
// #endregion

// #region Base Configs:
const { exports } = packageJson;

const config = [];

const sharedConfigs = {
    input: 'src/index.ts',
    plugins: [
        nodeResolve(),
        peerDepsExternal(),
        json()
    ]
};

const hasCjs = exports['.'].require !== undefined;
const hasEsm = exports['.'].import !== undefined;
const hasTypes = tsConfig.compilerOptions.declaration === true;

let declaration = hasTypes;
let declarationDir = declaration ? './dist/types/' : undefined;
const preserveModules = (Object.keys(exports)).length > 1;
// #endregion

// #region Customizations:
const configCjs = {
    output: [{}],
    plugins: []
};

const configEsm = {
    output: [{}],
    plugins: [
        postcss(),
        {
            name: 'Custom Rollup Plugin`',
            generateBundle: (options, bundle) => {
                Object.entries(bundle).forEach((entry) => {
                    bundle[entry[0]].code = entry[1].code.replace(
                        /\.\.?\/[^\n"?:*<>|]+\/node_modules\/style-inject\/dist\/style-inject.es.mjs/g,
                        'style-inject'
                    );
                });
            }
        }
    ],
    onwarn(warning, warn) {
        if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
            warn(warning);
        }
    },
    external: [
        './node_modules/*'
    ]
};
// #endregion

// #region Preparing Export Data:
if (hasCjs) {
    const finalConfigCjs = applyCustomization({
        output: [{
            exports: 'named',
            dir: 'dist/',
            format: 'cjs',
            preserveModules,
            entryFileNames: '[name].cjs'
        }],
        plugins: [
            typescript({ tsconfig: 'tsconfig.json', declaration, declarationDir })
        ]
    }, configCjs);

    config.push(finalConfigCjs);
}

if (hasEsm) {
    let folder = 'dist/';

    if (hasCjs) {
        folder = 'dist/esm/';
        declaration = false;
        declarationDir = undefined;

        config.push({
            ...mockConfig,
            plugins: [
                copy({
                    targets: [
                        { src: ['dist/*', '!dist/cjs', '!dist/types', '!dist/esm'], dest: 'dist/cjs/' }
                    ]
                })
            ]
        });

        config.push({
            ...mockConfig,
            plugins: [
                del({
                    targets: ['dist/*', '!dist/cjs', '!dist/types'],
                    recursive: true
                })
            ]
        });
    }

    const finalConfigEsm = applyCustomization({
        output: [{
            exports: 'named',
            dir: folder,
            format: 'esm',
            preserveModules,
            entryFileNames: '[name].mjs'
        }],
        plugins: [
            typescript({ tsconfig: 'tsconfig.json', declaration, declarationDir })
        ]
    }, configEsm);

    config.push(finalConfigEsm);
}
// #endregion

// #region Organizing Types:
if (hasTypes) {
    config.push({
        ...mockConfig,
        plugins: [
            copy({
                targets: [
                    { src: 'dist/types/src/*', dest: 'dist/types' },
                    { src: 'dist/src/*', dest: 'dist' }
                ]
            })
        ]
    });

    config.push({
        ...mockConfig,
        plugins: [
            del({
                targets: ['dist/types/src', 'dist/src', 'dist/types/tests'],
                recursive: true
            })
        ]
    });
}
// #endregion

config.push({
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, 'react', 'react-dom']
});

config.push({
    input: 'dist/types/client/index.d.ts',
    output: [{ file: 'dist/types/client.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, 'react', 'react-dom']
});

config.push({
    ...mockConfig,
    plugins: [
        del({
            targets: ['dist/types/*', '!dist/types/index.d.ts', '!dist/types/client.d.ts', '!dist/types/types.d.ts'],
            recursive: true
        })
    ]
});

export default config;
