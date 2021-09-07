import path from 'path';
import { EchoWebpackOptions } from '../../common/initOptions';

type LibraryTarget =
    | 'var'
    | 'assign'
    | 'this'
    | 'window'
    | 'global'
    | 'commonjs'
    | 'commonjs2'
    | 'amd'
    | 'umd'
    | 'jsonp'
    | 'system';

export interface Output {
    path: string;
    filename: string;
    // chunkFilename: string;
    // publicPath: string;
    libraryTarget: LibraryTarget;
    library: string;
}

export function defineOutput(options: EchoWebpackOptions): Output {
    const shortName = options.echoModuleConfig.manifest.shortName;
    return {
        path: path.join(options.currentDir, 'build'),
        filename: 'index.js', //`${shortName}.echo.bundle.js`,
        library: shortName,
        libraryTarget: 'umd'
        // chunkFilename: `assets/${options.shortName}.[name].[contenthash].chunk.js`,
        // publicPath: '/'
    };
}
