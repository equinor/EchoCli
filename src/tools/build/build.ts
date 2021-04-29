#!/usr/bin/env node
import chalk from 'chalk';
import * as fs from 'fs';
import path from 'path';
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import { promisify } from 'util';
import { getInputOptions, getOutputOptions } from '../../config/options';
import { createEchoModuleManifest } from './echoManifest';

const access = promisify(fs.access);

export interface EchoBundleOptions {
    watch?: boolean;
    serve?: boolean;
    isProduction: boolean;
    currentDir: string;
    wwwRoot: string;
    main: string;
    source: string;
    inputOptions: RollupOptions;
    outputOptions: OutputOptions;
    peerDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    requireRef: string;
}

export async function echoBundle(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<void> {

    const options = await getInitOptions(echoBundleOptions, isDevelopment);
    options.inputOptions = await getInputOptions(options);
    options.outputOptions = await getOutputOptions(options);
    
    try {
        const bundle = await rollup(options.inputOptions);
        await bundle.write(options.outputOptions);
        await createEchoModuleManifest(options.currentDir, options.requireRef);

        bundle.close();
        console.log('done!!');
    } catch (error) {
        console.log(error);
    }
}

async function getInitOptions(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<Partial<EchoBundleOptions>> {
    const currentDir = process.cwd();
    const configPath = path.join(currentDir || '', '/package.json');

    try {
        await access(configPath, fs.constants.R_OK);
    } catch (err) {
        if (err instanceof Error) {
            console.error('%s Cant access package.json', chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }

    const pkj = JSON.parse(fs.readFileSync(configPath).toString());

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
        requireRef: "echoDepLoader"
    };
}
