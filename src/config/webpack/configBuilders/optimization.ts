import TerserPlugin from 'terser-webpack-plugin';
/**
 * Defines a Webpack Optimization config object.
 * https://webpack.js.org/configuration/optimization/
 * @param {"dev"|"prod"|"test"|undefined} env The environment indentifier.
 * @returns {Optimization} Optimization
 */
export function defineOptimizations(isProduction: boolean): Record<string, unknown> {
    return isProduction
        ? {
              minimizer: [
                  new TerserPlugin({
                      terserOptions: {
                          warnings: false,
                          ie8: false,
                          output: {
                              comments: /^@echo-module/
                          }
                      }
                  })
              ]
              //   splitChunks: {
              //       chunks: 'all'
              //   }
          }
        : {
              minimize: false
          };
}
