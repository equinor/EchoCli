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
    return {
        path: path.join(options.currentDir, 'build'),
        filename: `${options.shortName}.echo.bundle.js`,
        library: options.shortName,
        libraryTarget: 'umd'
        // chunkFilename: `assets/${options.shortName}.[name].[contenthash].chunk.js`,
        // publicPath: '/'
    };
}
