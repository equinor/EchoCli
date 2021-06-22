import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import { Plugin } from 'rollup';
import del from 'rollup-plugin-delete';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import postcss from 'rollup-plugin-postcss';
import typescript2 from 'rollup-plugin-typescript2';
import workerLoader from 'rollup-plugin-web-worker-loader';
import { EchoBundleOptions } from '../tools/build/build';
import { merge } from '../utils/merge';
import { productionConfig } from './poductionConfig';
import { serverConfig } from './serverConfig';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export function getBuildPlugging(options: Partial<EchoBundleOptions>): Plugin[] {
    return merge(initialConfig(options), productionConfig(options), serverConfig(options));
}

export function initialConfig(options: Partial<EchoBundleOptions>): Plugin[] {
    return [
        del({ targets: `${options.currentDir}/lib/*`, runOnce: true }),
        nodePolyfills({
            fs: true
        }),
        nodeResolve({
            extensions,
            preferBuiltins: true,
            browser: true
        }),
        workerLoader({
            preserveFileNames: true,
            inline: false
        }),
        typescript2(),
        json(),
        postcss({
            plugins: [autoprefixer()],
            sourceMap: false,
            extract: false,
            minimize: true,
            modules: true
        }),
        url(),
        svgr(),
        commonjs({
            // transformMixedEsModules: true,
        }),
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
            extensions,
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        })
    ];
}
