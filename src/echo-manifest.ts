#!/usr/bin/env node

import Command from '@oclif/command';

export default class StartApp extends Command {
    public static description = 'Create Echo Module Manifest';

    public async run(): Promise<void> {
        // const currentDir = process.cwd();
        // const echoModuleConfig = await getEchoModuleConfig(currentDir);
        // await createEchoModuleManifest(echoModuleConfig, currentDir);
        console.log('hello form maifest');
    }
}

StartApp.run();
