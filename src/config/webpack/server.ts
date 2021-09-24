import { Compiler } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { EchoWebpackOptions } from '../common/initOptions';
import { defineDevServer } from './configBuilders/devServer';

export function devServer(compiler: Compiler, options: EchoWebpackOptions): void {
    const devServerOptions = defineDevServer(
        options.currentDir,
        options.wwwRoot,
        options.echoModuleConfig.manifest.path,
        options.echoModuleConfig
    );
    const server = new WebpackDevServer(devServerOptions, compiler);

    server.startCallback(() => {
        console.log(
            `Starting server on http://${options.echoModuleConfig.server.host}:${options.echoModuleConfig.server.port}`
        );
    });
}
