import express from 'express';
import * as path from 'path';
import WebpackDevServer from 'webpack-dev-server';
/**
 *  Defines options for the webpack dev server middleware.
 * @param - Additional options (https://webpack.js.org/configuration/dev-server/)
 * @returns {WebpackDevServerOptions} A settings object.
 */
export function defineDevServer(current: string, root: string, modulePath: string): WebpackDevServer.Configuration {
    const publicPath = path.join(current, 'build');
    return {
        https: true,
        host: 'localhost',
        port: 3000,
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
            stats: 'errors-warnings'
        },
        onBeforeSetupMiddleware: (devServer) => {
            devServer.app.use('/', [express.static(root), express.static(publicPath)]);
        },
        onAfterSetupMiddleware: (devServer) => {
            devServer.app.get('*', (req, res) => res.sendFile(root + '/index.html'));
        },
        client: {
            // webSocketURL: {
            //     // Enable custom sockjs pathname for websocket connection to hot reloading server.
            //     // Enable custom sockjs hostname, pathname and port for websocket connection
            //     // to hot reloading server.
            //     hostname: '0.0.0.0',
            //     pathname: '/ws',
            //     port: 3000
            // },
            // overlay: {
            //     errors: true,
            //     warnings: false
            // },
            logging: 'none'
        },
        historyApiFallback: true,
        open: ['/', modulePath],
        compress: true
    };
}
