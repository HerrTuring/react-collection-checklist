import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export default [{
  input: 'src/index.ts',
  output: [{
    exports: 'named',
    sourcemap: true,
    preserveModules: true,
    interop: 'auto',
    dir: '.build/',
    format: 'esm',
  }],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    postcss({
      plugins: [],
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      declarationDir: '.build/types/',
    }),
    preserveDirectives(),
  ],
  onwarn(warning, warn) {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning);
    }
  },
}, {
  input: '.build/types/index.d.ts',
  output: [{ file: '.build/index.d.ts', format: 'esm' }],
  plugins: [dts()],
  external: [/\.(css|less|scss)$/, 'react', 'react-dom'],
}, {
  input: '.build/types/clientComponents/index.d.ts',
  output: [{ file: '.build/client.d.ts', format: 'esm' }],
  plugins: [dts()],
  external: [/\.(css|less|scss)$/, 'react', 'react-dom'],
}];
