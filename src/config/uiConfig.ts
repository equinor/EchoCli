import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import { Plugin } from 'rollup';
import postcss from 'rollup-plugin-postcss';
import { EchoBundleOptions } from '../tools/build/build';

export function uiPlugins(options: Partial<EchoBundleOptions>): Plugin[] {
    return [
        postcss({
            plugins: [autoprefixer()],
            sourceMap: false,
            extract: false,
            minimize: true,
            modules: true
        }),
        url(),
        svgr()
    ];
}
