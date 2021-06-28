import { Configuration } from 'webpack';
import { extensions } from '../common/extensions';
import { EchoWebpackOptions } from '../common/initOptions';
import { defineEntry } from './configBuilders/entry';
import { defineModule } from './configBuilders/module';
import { defineOptimizations } from './configBuilders/optimization';
import { defineOutput } from './configBuilders/output';
import { definePlugins } from './configBuilders/plugins';

export async function defineWebpackConfig(options: EchoWebpackOptions): Promise<Configuration> {
    return {
        entry: defineEntry(options),
        mode: options.isProduction ? 'production' : 'development',
        devtool: 'source-map',
        output: defineOutput(options),
        resolve: {
            extensions
        },
        module: defineModule(),
        plugins: definePlugins(options.envPath),
        optimization: defineOptimizations()
    };
}
