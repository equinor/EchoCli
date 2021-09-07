import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { Compiler, WebpackPluginInstance } from 'webpack';
import WebpackBar from 'webpackbar';
import { echoWebpackModulePlugin } from '../echoWebpackModule';

type WebpackPlugin = ((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance;

/**
 * More info can be found here:
 * https://www.npmjs.com/package/clean-webpack-plugin
 * @type {*} CleanWebpackPlugin */
function cleanWebpackPlugin(): CleanWebpackPlugin {
    return new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!echoModuleManifest.json', '**/*.js', '**/*hot-update.json', '**/*.map']
    });
}

// Custom bundling stats.
function progressReport(): WebpackBar {
    return new WebpackBar({
        name: 'Echo module',
        color: '#007079',
        profile: true
    });
}

/**
 * Export all plugins which are used in all environments.
 * @returns {WebpackPlugin[]}
 */
function defineBasePlugins(): WebpackPlugin[] {
    return [cleanWebpackPlugin()];
}

/**
 * Creates an array of webpack plugins that will be used in the build process.
 * @param {"dev"|"remote"} env
 * @returns {WebpackPlugin[]}
 */
export function definePlugins(envPath: string, isProduction: boolean): WebpackPlugin[] {
    return [
        ...defineBasePlugins(),
        new NodePolyfillPlugin(),
        // new HotModuleReplacementPlugin(),
        // new ReactRefreshWebpackPlugin(),
        new Dotenv({
            ignoreStub: false,
            expand: true,
            systemvars: false,
            path: envPath
        }),
        // new NoEmitOnErrorsPlugin(),
        echoWebpackModulePlugin(isProduction)
    ];
}
