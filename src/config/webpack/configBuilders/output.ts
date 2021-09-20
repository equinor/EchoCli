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
    chunkFilename: string;
    // publicPath: string;
    libraryTarget: LibraryTarget;
    library: string;
}

export function defineOutput(options: EchoWebpackOptions): Output {
    const { manifest, chunk } = options.echoModuleConfig;

    const shortName = manifest.shortName;
    return {
        path: path.join(options.currentDir, 'build'),
        filename: chunk ? `${shortName}-main.js` : getFileName(options.main), //`${shortName}.echo.bundle.js`,
        library: shortName,
        libraryTarget: 'umd',
        chunkFilename: `${shortName}.[name].[contenthash].chunk.js`
        // publicPath: '/'
    };
}

export function getFileName(filePath: string): string {
    const arr = filePath.split('/');
    const fileName = arr[arr.length - 1];
    return fileName;
}
