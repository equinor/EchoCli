import path from 'path';
import WebpackDevServer from 'webpack-dev-server';

const defaultOptions = {
    // disableHostCheck: true,
    http2: true
};

const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH;
// default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

/**
 *  Defines options for the webpack dev server middleware.
 * @param - Additional options (https://webpack.js.org/configuration/dev-server/)
 * @returns {WebpackDevServerOptions} A settings object.
 */
export function defineDevServer(current: string, root: string): WebpackDevServer.Configuration {
    const publicPath = path.join(current, 'build');
    return {
        ...defaultOptions,
        // contentBase: [publicPath, root],
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
            index: true
        },
        onAfterSetupMiddleware: (devServer) =>
            devServer.app.get('*', (request, result) => result.sendFile(root + '/index.html')),
        client: {
            webSocketURL: {
                // Enable custom sockjs pathname for websocket connection to hot reloading server.
                // Enable custom sockjs hostname, pathname and port for websocket connection
                // to hot reloading server.
                hostname: 'localhost',
                port: 3000
            },
            overlay: true,
            logging: 'info',
            progress: true
        },
        historyApiFallback: {
            index: '/'
        },
        open: true
    };
}
