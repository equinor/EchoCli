#!/usr/bin/env node

import Command from '@oclif/command';
import { createEchoModuleManifest } from './config/common/echoManifest';

export default class StartApp extends Command {
    public static description = 'Create Echo Module Manifest';

    public async run(): Promise<void> {
        const currentDir = process.cwd();
        await createEchoModuleManifest(currentDir);
    }
}

StartApp.run();
