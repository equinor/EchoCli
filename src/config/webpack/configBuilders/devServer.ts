import path from "path";
import WebpackDevServer from "webpack-dev-server";

const defaultOptions = {

    // disableHostCheck: true,
    http2: true,
    writeToDisk: true,
};

/**
 *  Defines options for the webpack dev server middleware.
 * @param - Additional options (https://webpack.js.org/configuration/dev-server/)
 * @returns {WebpackDevServerOptions} A settings object.
 */
export function defineDevServer(
    current: string,
    root: string,
): WebpackDevServer.Configuration {
    const publicPath=  path.join(current, 'build');
    return {
        ...defaultOptions,
        contentBase: [publicPath, root],
        publicPath,
        host: 'localhost',
        port: 3000,
        stats: "errors-only",
        liveReload: true,
        hot: true,
        historyApiFallback: true,
        injectHot: true,
        open: true, 
        watchContentBase: true,
    };
}
