// import server from 'rollup-plugin-server';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { EchoBundleOptions } from '../tools/build/build';

export function serverConfig(options: Partial<EchoBundleOptions>): Plugin[] {
    if (options.serve && options.wwwRoot) {
        return [
            serve({
                contentBase: [`${options.currentDir}/build`, options.wwwRoot],
                port: 3000,
                verbose: true,
                open: true,
                https: options.https,
                host: 'localhost',
                historyApiFallback: true
            }),

            livereload({
                https: options.https
            })
        ];
    }
    return [];
}
