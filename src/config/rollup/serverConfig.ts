import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { EchoRollupOptions } from '../common/initOptions';

export function serverConfig(options: Partial<EchoRollupOptions>): Plugin[] {
    if (options.serve && options.wwwRoot && options.echoModuleConfig) {
        const { contentBase, port, open, host } = options.echoModuleConfig.server;
        return [
            serve({
                contentBase: [`${options.currentDir}${contentBase}`, options.wwwRoot],
                port,
                verbose: true,
                open,
                https: options.https,
                host: host,
                historyApiFallback: true
            }),

            livereload({
                watch: `${options.currentDir}${contentBase}`,
                https: options.https
            })
        ];
    }
    return [];
}
