#!/usr/bin/env node
import Command, { flags } from '@oclif/command';
import { createProject } from './tools/create/createProject';
import { promptForMissingOptions } from './tools/create/promptOptions';
import { echoCliLogo } from './utils/logo';

export default class CreateApp extends Command {
    public static description = 'Creates a new Echo app';

    public static flags = {
        description: flags.string({ char: 'd', description: 'App description' }),
        git: flags.boolean({ char: 'g', description: 'Initialize git repository' }),
        help: flags.help({ char: 'h' }),
        install: flags.boolean({
            char: 'i',
            description: 'Install dev dependencies'
        }),
        key: flags.string({ char: 'k', description: 'Key for app/tile' }),
        name: flags.string({
            char: 'n',
            description: 'Name for app/tile(use quotes for spaces)'
        }),
        shortName: flags.string({ char: 'N', description: 'App short name' }),
        templateName: flags.string({
            char: 't',
            description: 'App template to use'
        })
    };

    public async run(): Promise<void> {
        const parsed = this.parse(CreateApp);
        echoCliLogo();
        const options = await promptForMissingOptions(parsed.flags);
        await createProject(options);
    }
}

CreateApp.run();
