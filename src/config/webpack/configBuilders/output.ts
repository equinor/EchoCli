import path from 'path';
import { EchoWebpackOptions } from '../../common/initOptions';

export interface WebpackOutputOptions {
    path: string;
    filename: string;
    // chunkFilename: string;
    // publicPath: string;
    libraryTarget: string;
    library: string;
}

export function defineOutput(options: EchoWebpackOptions): WebpackOutputOptions {
    const shortName = options.echoModuleConfig.manifest.shortName;
    return {
        path: path.join(options.currentDir, 'build'),
        filename: `${shortName}.echo.bundle.js`,
        library: shortName,
        libraryTarget: 'umd'
        // chunkFilename: `assets/${options.shortName}.[name].[contenthash].chunk.js`,
        // publicPath: '/'
    };
}
