import express from 'express';
import https from 'https';
import open from 'open';
import path from 'path';
import { Compiler } from 'webpack';
import middleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import { EchoWebpackOptions } from '../common/initOptions';
import { defineDevServer } from './configBuilders/devServer';
export interface EchoServerOptions {
    port: number;
    wwwRoot: string;
    currentBuildDri: string;
}

export function devServer(compiler: Compiler, options: EchoWebpackOptions): void {
    const server = express();
    const port = 3000;
    const buildUri = path.join(options.currentDir, 'build');
    const middlewareOptions = defineDevServer();
    middlewareOptions.publicPath = buildUri;
    middlewareOptions.writeToDisk = true;
    server.use(WebpackHotMiddleware(compiler));
    server.use(middleware(compiler, middlewareOptions));
    console.log('Serving files form', options.wwwRoot, buildUri);
    server.use('/', [express.static(options.wwwRoot), express.static(buildUri)]);

    const httpsServer = https.createServer(options.https, server);

    httpsServer.listen(port, 'localhost', undefined, () => {
        const uri = `https://localhost:${port}`;
        console.log(`⚡️ [Server]: Server is running at ${uri}`);
        console.log(`⚡️ [Module]: Current module is running at ${uri}${options.echoModuleConfig.manifest.path}`);
        console.log(`⚡️ [Manifest]: Server is running at ${uri}/echoModuleManifest.json`);
        console.log(`⚙️[Admin]: Server is running at ${uri}/admin`);

        open(uri);
    });
}
