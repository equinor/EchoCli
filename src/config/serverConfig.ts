import server from 'rollup-plugin-server';
import { EchoBundleOptions } from '../tools/build/build';

export function serverConfig(options: Partial<EchoBundleOptions>): Plugin[] {
    if (options.serve) {
        return [
            server({
                contentBase: [options.wwwRoot, `${options.currentDir}/build`],
                port: 3000,
                verbose: true,
                open: true,
                ssl: true,
                host: 'localhost',
                historyApiFallback: true
            })
        ];
    }
    return [];
}
