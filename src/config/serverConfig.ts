// import server from 'rollup-plugin-server';
import * as fs from 'fs';
import path from 'path';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { EchoBundleOptions } from '../tools/build/build';

const https = (
    root: string
): {
    key: Buffer;
    cert: Buffer;
} => ({
    key: fs.readFileSync(path.join(root, './ssl/server.key')),
    cert: fs.readFileSync(path.join(root, './ssl/server.crt'))
});

export function serverConfig(options: Partial<EchoBundleOptions>): Plugin[] {
    if (options.serve && options.wwwRoot) {
        return [
            serve({
                contentBase: [`${options.currentDir}/build`, options.wwwRoot],
                port: 3000,
                verbose: true,
                open: true,
                https: https(options.wwwRoot),
                host: 'localhost',
                historyApiFallback: true
            }),

            livereload({
                https: https(options.wwwRoot)
            })
        ];
    }
    return [];
}
