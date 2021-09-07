import { Configuration } from 'webpack';
import { extensions } from '../common/extensions';
import { EchoWebpackOptions } from '../common/initOptions';
import { defineEntry } from './configBuilders/entry';
import { defineModule } from './configBuilders/module';
import { defineOptimizations } from './configBuilders/optimization';
import { defineOutput } from './configBuilders/output';
import { definePlugins } from './configBuilders/plugins';

export async function defineWebpackConfig(options: EchoWebpackOptions): Promise<Configuration> {
    const peerDependencies = Object.keys(options.peerDependencies ?? {});
    const mode = options.isProduction ? 'production' : 'development';
    console.log('Webpack Mode', mode);

    return {
        entry: defineEntry(options),
        mode,
        context: options.currentDir,
        devtool: !options.isProduction && 'source-map',
        externals: [...peerDependencies],
        output: defineOutput(options),
        target: !options.isProduction && 'web',
        resolve: {
            extensions
        },
        devServer: {
            hot: true
        },
        target: 'web',
        module: defineModule(),
        plugins: definePlugins(options.envPath, options.isProduction),
        optimization: defineOptimizations(options.isProduction)
    };
}
