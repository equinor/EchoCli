import path from 'path';
import { EchoWebpackOptions } from '../../common/initOptions';

export interface WebpackOutputOptions {
    path: string;
    filename: string;
    chunkFilename: string;
    publicPath: string;
}

export function defineOutput(options: EchoWebpackOptions): WebpackOutputOptions {
    return {
        path: path.resolve(__dirname, 'build'),
        filename: `${options.shortName}.echo.bundle.js`,
        chunkFilename: `assets/${options.shortName}.[contenthash].chunk.js`,
        publicPath: '/'
    };
}
