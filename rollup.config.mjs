import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';

const plugins = [
  peerDepsExternal(),
  nodeResolve(),
  commonjs(),
  postcss({
    plugins: [],
  }),
];

const outputConfig = {
  exports: 'named',
  sourcemap: true,
  preserveModules: true,
  interop: 'auto',
};

export default [{
  input: 'src/index.ts',
  output: [{
    ...outputConfig,
    dir: '.build/cjs',
    format: 'cjs',
  }],
  plugins: [
    ...plugins,
    typescript({
      tsconfig: 'tsconfig.json',
      declarationDir: '.build/cjs/types/',
    }),
    preserveDirectives(),
  ],
  onwarn(warning, warn) {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning);
    }
  },
}, {
  input: 'src/index.ts',
  output: [{
    ...outputConfig,
    dir: '.build/esm',
    format: 'esm',
  }],
  plugins: [
    ...plugins,
    typescript({
      tsconfig: 'tsconfig.json',
      declarationDir: '.build/esm/types/',
    }),
    preserveDirectives(),
  ],
  onwarn(warning, warn) {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning);
    }
  },
}, {
  input: '.build/esm/types/index.d.ts',
  output: [{ file: '.build/index.d.ts', format: 'esm' }],
  plugins: [dts()],
  external: [/\.(css|less|scss)$/, 'react', 'react-dom'],
}];
