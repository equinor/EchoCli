import babel from '@rollup/plugin-babel';
import { Plugin } from 'rollup';

export function babelConfig(extensions: string[]): Plugin[] {
    return [
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
            extensions,
            exclude: './node_modules/**',
            babelHelpers: 'bundled'
        })
    ];
}
