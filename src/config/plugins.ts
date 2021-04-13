import { Plugin } from 'rollup';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import nodeResolve from 'rollup-plugin-node-resolve';
import optimizeJs from 'rollup-plugin-optimize-js';
import typescript2 from 'rollup-plugin-typescript2';
import workerLoader from 'rollup-plugin-web-worker-loader';
import { EchoBundleOptions } from '../tools/build/build';
import { merge } from '../utils/merge';
import { babelConfig } from './babel';
import { productionConfig } from './poductionConfig';
import { serverConfig } from './serverConfig';
import { uiPlugins } from './uiConfig';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export function getBuildPlugging(options: Partial<EchoBundleOptions>): Plugin[] {
    return merge(
        initialConfig(options),
        productionConfig(options),
        babelConfig(extensions),
        uiPlugins(options),
        serverConfig(options)
    );
}

export function initialConfig(options: Partial<EchoBundleOptions>): Plugin[] {
    return [
        del({ targets: `${options.currentDir}/lib/*`, runOnce: true }),
        nodeResolve({ extensions }),
        workerLoader({
            preserveFileNames: true,
            inline: false
        }),
        typescript2(),
        commonjs(),
        optimizeJs()
    ];
}
