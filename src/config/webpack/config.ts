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

    return {
        entry: defineEntry(options),
        mode,
        context: options.currentDir,
        devtool: !options.isProduction && 'source-map',
        externals: [...peerDependencies],
        output: defineOutput(options),
        resolve: {
            extensions
        },
        target: 'web',
        module: defineModule(),
        plugins: definePlugins(options),
        optimization: defineOptimizations(options.isProduction),
        infrastructureLogging: {
            level: 'none',
            debug: false,
            appendOnly: true
        }
    };
}
