import path from 'path';
import { OutputOptions, RollupOptions } from 'rollup';
import { Configuration } from 'webpack';
import { ECHO_MODULE_CONFIG_PATH, REQUIRED_REF } from '../../const/common';
import { getFile } from '../../utils/getFile';
import { EchoModuleConfig } from './echoModuleConfig';
import getPackageJson from './getPackageJson';
import { Https } from './https';

export interface EchoRollupOptions extends EchoBundleOptions {
    inputOptions: RollupOptions;
    outputOptions: OutputOptions;
}

export interface EchoWebpackOptions extends EchoBundleOptions {
    config: Configuration;
}

export interface EchoBundleOptions {
    watch?: boolean;
    serve?: boolean;
    isProduction: boolean;
    currentDir: string;
    wwwRoot: string;
    main: string;
    source: string;
    peerDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    requireRef: string;
    https: Https;
    envPath: string;
    adminModule?: boolean;
    adminModulePath: string;
    echoModuleConfig: EchoModuleConfig;
}

export async function defineInitOptions(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<Partial<EchoWebpackOptions | EchoRollupOptions>> {
    const currentDir = process.cwd();
    const echoModuleConfig: EchoModuleConfig = await getFile<EchoModuleConfig>(currentDir, ECHO_MODULE_CONFIG_PATH);
    const pkj = await getPackageJson(currentDir);

    return {
        ...echoBundleOptions,
        isProduction: isDevelopment ? false : true,
        currentDir,
        source: pkj.source,
        main: pkj.main,
        peerDependencies: pkj.peerDependencies,
        dependencies: pkj.dependencies,
        devDependencies: pkj.devDependencies,
        wwwRoot: path.resolve(__dirname, '../../../', 'client'),
        adminModulePath: path.resolve(__dirname, '../../../', 'admin'),
        requireRef: REQUIRED_REF,
        // envPath: await getFilePath(currentDir, '/.env'),
        echoModuleConfig
    };
}
