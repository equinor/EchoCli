import { getSrcFilePath } from '../../common/getCurrentIndexFile';

export interface EntryOptions {
    currentDir: string;
    source: string;
}

/**
 * Defines the WebpackEntry config with polyfills.
 *
 * @export
 * @param {EntryOptions} { currentDir, main } current project directory and main from package.json
 * @return {*}  {string[]}
 */
export function defineEntry({ currentDir, source }: EntryOptions): string[] {
    return ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', getSrcFilePath(currentDir, source)];
}
