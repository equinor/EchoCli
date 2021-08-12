import * as TerserPlugin from 'terser-webpack-plugin';

/**
 * Defines a Webpack Optimization config object.
 * https://webpack.js.org/configuration/optimization/
 * @param {"dev"|"prod"|"test"|undefined} env The environment indentifier.
 * @returns {Optimization} Optimization
 */
export function defineOptimizations(): Record<string, unknown> {
    return {
        minimizer: [
            new TerserPlugin({
              terserOptions: {
                warnings: false,
                ie8: true,
                output: {
                  comments: /^@echo-module/,
                },
              },
            }),
          ],
        // minimize: true,
        // emitOnErrors: true
        // splitChunks: {
        //     chunks: 'initial'
        // }
    };
}
