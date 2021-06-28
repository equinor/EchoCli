import { OutputOptions, RollupOptions } from 'rollup';
import { getBuildFilePath, getSrcFilePath } from '../common/getCurrentIndexFile';
import { EchoBundleOptions } from '../common/initOptions';
import echoModuleCreator from './echoModulePlugin';
import { getBuildPlugging } from './plugins';

export async function defineRollupInputOptions(options: Partial<EchoBundleOptions>): Promise<RollupOptions> {
    return {
        input: getSrcFilePath(options.currentDir, options.source),
        external: options.peerDependencies && Object.keys(options.peerDependencies),
        plugins: getBuildPlugging(options)
    };
}

export async function defineRollupOutputOptions(options: Partial<EchoBundleOptions>): Promise<OutputOptions> {
    const file = getBuildFilePath(options.currentDir, options.main);
    return {
        file,
        format: 'umd',
        exports: 'named',
        sourcemap: true,
        name: 'echo-module',
        compact: true,
        globals: options.peerDependencies,
        plugins: [echoModuleCreator(file, options.main ? options.main : 'index.js', options.requireRef)]
    };
}
