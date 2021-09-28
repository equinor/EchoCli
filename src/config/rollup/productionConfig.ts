import { Plugin } from 'rollup';
import cleanup from 'rollup-plugin-cleanup';
import { EchoRollupOptions } from '../common/initOptions';

export function productionConfig({ isProduction }: Partial<EchoRollupOptions>): Plugin[] {
    if (isProduction) {
        return [
            cleanup({
                comments: 'none',
                extensions: ['js', 'ts']
            })
        ];
    }
    return [];
}
