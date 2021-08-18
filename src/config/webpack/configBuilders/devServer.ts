export interface DevServerOptions {
    host: string;
    port: number;
    disableHostCheck: boolean;
}

export interface WebpackDevServerOptions extends DevServerOptions {
    http2: boolean;
    hot: boolean;
    historyApiFallback: boolean;
    stats: string;
    contentBase: string[];
}

const defaultOptions = {
    host: 'localhost',
    port: 3000,
    disableHostCheck: true
};

/**
 *  Defines options for the webpack dev server middleware.
 * @param - Additional options (https://webpack.js.org/configuration/dev-server/)
 * @returns {WebpackDevServerOptions} A settings object.
 */
export function defineDevServer(
    // current: string,
    // root: string,
    options: DevServerOptions = defaultOptions
): Record<string, any> {
    return {
        ...options,
        http2: true,
        hot: true,
        historyApiFallback: true,
        stats: 'errors-only'

        // contentBase: [`${current}\\build`, root]
    };
}
