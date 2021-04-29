import path from 'path';
import { OutputOptions, RollupOptions, WatcherOptions } from 'rollup';
import { EchoBundleOptions } from '../tools/build/build';
import echoModuleCreator from './echoModulePlugin';
import { getBuildPlugging } from './plugins';

export async function getInputOptions(options: Partial<EchoBundleOptions>): Promise<RollupOptions> {
    return {
        input: path.join(options.currentDir || '', options.source ? options.source : '/src/index.tsx'),
        external: options.peerDependencies && Object.keys(options.peerDependencies),
        plugins: getBuildPlugging(options),
        watch: {
            include: ['/src']
        } as WatcherOptions
    };
}

export async function getOutputOptions(options: Partial<EchoBundleOptions>): Promise<OutputOptions> {
    const file = path.join(options.currentDir || '', options.main ? options.main : '/build/index.js');
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
