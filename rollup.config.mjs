import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json' assert { type: 'json' };

export default [{
  input: './src/index.ts',
  output: [{
    file: packageJson.main,
    format: 'cjs',
  },
  {
    file: packageJson.module,
    format: 'esm',
  }],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      plugins: [],
    }),
  ],
}, {
  input: './.build/esm/types/index.d.ts',
  output: [{ file: './.build/index.d.ts', format: 'esm' }],
  plugins: [dts()],
  external: [/\.(css|less|scss)$/, 'react', 'react-dom'],
}];
