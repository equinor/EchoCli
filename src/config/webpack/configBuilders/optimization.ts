/**
 * Defines a Webpack Optimization config object.
 * https://webpack.js.org/configuration/optimization/
 * @param {"dev"|"prod"|"test"|undefined} env The environment indentifier.
 * @returns {Optimization} Optimization
 */
export function defineOptimizations(): Record<string, unknown> {
    return {
        minimize: true,
        emitOnErrors: true,
        splitChunks: {
            chunks: 'initial'
        }
    };
}
