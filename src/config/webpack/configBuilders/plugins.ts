import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { Compiler, WebpackPluginInstance } from 'webpack';
import { EchoWebpackOptions } from '../../common/initOptions';
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
export function definePlugins(options: EchoWebpackOptions): WebpackPlugin[] {
    const { envPath } = options;
    return [
        ...defineBasePlugins(),
        new NodePolyfillPlugin(),
        new Dotenv({
            ignoreStub: false,
            expand: true,
            systemvars: false,
            path: envPath
        }),
        echoWebpackModulePlugin(options)
    ];
}
