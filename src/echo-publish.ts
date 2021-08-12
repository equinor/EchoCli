import Command from '@oclif/command';
import { createEchoModuleManifest } from './config/common/echoManifest';
import { getEchoModuleConfig } from './config/common/echoModuleConfig';

export default class EchoPublish extends Command {
    public static description = 'Create Echo Module Manifest';

    public async run(): Promise<void> {
        const currentDir = process.cwd();
        const echoModuleConfig = await getEchoModuleConfig(currentDir);
        await createEchoModuleManifest(echoModuleConfig, currentDir);
    }
}

EchoPublish.run();
