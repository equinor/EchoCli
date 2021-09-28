#!/usr/bin/env node

import Command from '@oclif/command';
import { sendGetRequest } from './tools/publish/publish';

export default class EchoPublish extends Command {
    public static description = 'Create Echo Module Manifest';

    public async run(): Promise<void> {
        // const currentDir = process.cwd();
        // const echoModuleConfig = await getEchoModuleConfig(currentDir);
        // await createEchoModuleManifest(echoModuleConfig, currentDir);

        console.log('hello form publish file');
        sendGetRequest();
    }
}

EchoPublish.run();
