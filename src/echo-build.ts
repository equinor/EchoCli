#!/usr/bin/env node

import Command, { flags } from '@oclif/command';
import { echoBundle } from './tools/build/build';
import { echoCliLogo } from './utils/logo';

export default class CreateBundle extends Command {
    public static description = 'Creates Echo Bundle';

    public static flags = {
        watch: flags.boolean({ char: 'w', description: 'Add the watch option' }),
        serve: flags.boolean({
            char: 's',
            description: 'Add the serve Echo Client with app'
        }),
        isDevelopment: flags.boolean({
            char: 'd',
            description: 'Production is default, add -d flag for development'
        })
    };

    public async run(): Promise<void> {
        const options = this.parse(CreateBundle);
        echoCliLogo();
        console.log('----------------> EchoCli Dev');
        await echoBundle(options.flags, options.flags.isDevelopment);
    }
}

CreateBundle.run();
