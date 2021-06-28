import { getSrcFilePath } from '../../common/getCurrentIndexFile';

export interface EntryOptions {
    currentDir: string;
    main: string;
}

/**
 * Defines the WebpackEntry config with polyfills.
 *
 * @export
 * @param {EntryOptions} { currentDir, main } current project directory and main from package.json
 * @return {*}  {string[]}
 */
export function defineEntry({ currentDir, main }: EntryOptions): string[] {
    return ['babel-polyfill', 'react-hot-loader/patch', getSrcFilePath(currentDir, main)];
}
