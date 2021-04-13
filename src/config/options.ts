import { OutputOptions, RollupOptions } from 'rollup';
import { EchoBundleOptions } from '../tools/build/build';
import { getExternalsConfig } from './externalsConfig';
import { getBuildPlugging } from './plugins';

export async function getInputOptions(options: Partial<EchoBundleOptions>): Promise<RollupOptions> {
    return {
        input: `${options.currentDir}/src/index.tsx`,
        external: getExternalsConfig(options),
        plugins: getBuildPlugging(options)
    };
}

export async function getOutputOptions(options: Partial<EchoBundleOptions>): Promise<OutputOptions> {
    return {
        file: `${options.currentDir}/lib/index.js`,
        format: 'umd',
        exports: 'named',
        sourcemap: true
    };
}
