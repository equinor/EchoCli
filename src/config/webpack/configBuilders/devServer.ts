import express from 'express';
import * as path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import { EchoModuleConfig } from '../../common/echoModuleConfig';
/**
 *  Defines options for the webpack dev server middleware.
 * @param - Additional options (https://webpack.js.org/configuration/dev-server/)
 * @returns {WebpackDevServerOptions} A settings object.
 */
export function defineDevServer(
    current: string,
    root: string,
    modulePath: string,
    echoModuleConfig: EchoModuleConfig
): WebpackDevServer.Configuration {
    const publicPath = path.join(current, 'build');
    const { port, host, open, logging } = echoModuleConfig.server;
    const { stats } = echoModuleConfig.devMiddleware;

    return {
        https: true,
        host,
        port,
        static: [
            {
                directory: root,
                serveIndex: true,
                publicPath: '/'
            },
            {
                directory: publicPath,
                watch: true
            }
        ],
        hot: true,
        liveReload: true,
        devMiddleware: {
            writeToDisk: true,
            publicPath,
            index: true,
            stats
        },
        onBeforeSetupMiddleware: (devServer): void => {
            devServer.app.use('/', [express.static(root), express.static(publicPath)]);
        },
        onAfterSetupMiddleware: (devServer): void => {
            devServer.app.get('*', (req, res) => res.sendFile(root + '/index.html'));
        },
        client: {
            // overlay: {
            //     errors: true,
            //     warnings: false
            // },
            logging
        },
        historyApiFallback: true,
        open,
        compress: true
    };
}
