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
        console.log(`Starting server on http://localhost:${options.echoModuleConfig.server.port}`);
    });

    // Custom
    //     const server = express();
    //     const { port, host } = options.echoModuleConfig.server;

    //     const publicPath = path.join(options.currentDir, 'build');

    //     server.use(devMiddleware(compiler, { publicPath, writeToDisk: true }));
    //     server.use(
    //         hotMiddleware(compiler, {
    //             log: console.log,
    //             path: '/__webpack_hmr',
    //             heartbeat: 10 * 1000
    //         })
    //     );

    //     server.use('/', [express.static(options.wwwRoot), express.static(publicPath)]);
    //     server.get('*', (req, res) => {
    //         res.sendFile(options.wwwRoot + '/index.html');
    //     });

    //     const httpsServer = https.createServer(options.https, server);

    //     httpsServer.listen(port, host, undefined, () => {
    //         const uri = `https://${host}:${port}`;
    //         console.log(`⚡️ [Server]: Server is running at ${uri}`);
    //         console.log(`⚡️ [Module]: Current module is running at ${uri}${options.echoModuleConfig.manifest.path}`);
    //         console.log(`⚡️ [Manifest]: Server is running at ${uri}/echoModuleManifest.json`);
    //         console.log(`⚙️[Admin]: Server is running at ${uri}/admin`);

    //         options.echoModuleConfig.server.open && open(uri);
    //     });
}
