import express from 'express';
import https from 'https';
import open from 'open';
import path from 'path';
import { Compiler } from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { EchoWebpackOptions } from '../common/initOptions';

export function devServer(compiler: Compiler, options: EchoWebpackOptions): void {
    // const serverOptions = defineDevServer(options.currentDir, options.wwwRoot);
    // const server = new WebpackDevServer(compiler, serverOptions);

    //     server.listen(3000, '127.0.0.1', (error?: Error | undefined) => {
    //         // console.log('Starting server on https://localhost:3000');
    //         if (error) {
    //             // throw error;
    //             console.warn(error);
    //         }
    //     });

    // Custom
    const server = express();
    const { port, host } = options.echoModuleConfig.server;

    const publicPath = path.join(options.currentDir, 'build');

    server.use(devMiddleware(compiler, { publicPath, writeToDisk: true }));
    server.use(
        hotMiddleware(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000
        })
    );

    server.use('/', [express.static(options.wwwRoot), express.static(publicPath)]);
    server.get('*', (req, res) => {
        res.sendFile(options.wwwRoot + '/index.html');
    });

    const httpsServer = https.createServer(options.https, server);

    httpsServer.listen(port, host, undefined, () => {
        const uri = `https://${host}:${port}`;
        console.log(`⚡️ [Server]: Server is running at ${uri}`);
        console.log(`⚡️ [Module]: Current module is running at ${uri}${options.echoModuleConfig.manifest.path}`);
        console.log(`⚡️ [Manifest]: Server is running at ${uri}/echoModuleManifest.json`);
        console.log(`⚙️[Admin]: Server is running at ${uri}/admin`);

        options.echoModuleConfig.server.open && open(uri);
    });
}
