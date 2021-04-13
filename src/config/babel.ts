import { Plugin } from 'rollup';
import babel from 'rollup-plugin-babel';

export function babelConfig(extensions: string[]): Plugin[] {
    return [
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
            extensions,
            exclude: './node_modules/**'
        })
    ];
}
