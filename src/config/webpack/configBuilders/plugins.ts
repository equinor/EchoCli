import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { Compiler, WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackBar from 'webpackbar';
import { echoWebpackModulePlugin } from '../echoWebpackModule';

type WebpackPlugin = ((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance;

const fastRefresh = new ReactRefreshWebpackPlugin();
// const hotModuleReplacement = new HotModuleReplacementPlugin();

/**
 * More info can be found here:
 * https://www.npmjs.com/package/clean-webpack-plugin
 * @type {*} CleanWebpackPlugin */
const cleanWebpackPlugin = new CleanWebpackPlugin();

function defineHtmlWebPackPlugin(): HtmlWebPackPlugin {
    return new HtmlWebPackPlugin({
        template: './public/template/index.html',
        filename: './index.html',
        favicon: './public/template/favicon.ico',
        inject: true
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

const analyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerPort: 3001,
    openAnalyzer: true
});

/**
 * Export all plugins which are used in all environments.
 * @returns {WebpackPlugin[]}
 */
function defineBasePlugins(): WebpackPlugin[] {
    return [progressReport()];
}

/**
 * Creates an array of webpack plugins that will be used in the build process.
 * @param {"dev"|"remote"} env
 * @returns {WebpackPlugin[]}
 */
export function definePlugins(envPath: string, requireRef: string): WebpackPlugin[] {
    return [
        ...defineBasePlugins(),
        // hotModuleReplacement,
        // fastRefresh,
        new Dotenv({
            ignoreStub: false,
            expand: true,
            systemvars: false,
            path: envPath
        }),
        echoWebpackModulePlugin(requireRef)
    ];
}
