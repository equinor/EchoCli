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

    return {
        entry: defineEntry(options),
        // mode: options.isProduction ? 'production' : 'development',
        mode: 'production',
        devtool: 'source-map',
        externals: [...peerDependencies],
        output: defineOutput(options),
        resolve: {
            extensions
        },
        module: defineModule(),
        plugins: definePlugins(options.envPath, options.requireRef),
        optimization: defineOptimizations()
    };
}
