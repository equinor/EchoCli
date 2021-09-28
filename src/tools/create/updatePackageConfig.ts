import chalk from 'chalk';
import * as fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { TemplateDir } from '../../types/createTypes';

const access = promisify(fs.access);

export async function updatePackageConfig(options: TemplateDir): Promise<void> {
    const configPath = path.join(options.targetDirectory || '', '/package.json');

    try {
        await access(configPath, fs.constants.R_OK);
    } catch (err) {
        if (err instanceof Error) {
            console.error('%s Cant access new app config', chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }

    const config = JSON.parse(fs.readFileSync(configPath).toString());
    config.name = `@equinor/echo-${options.name.trim().toLocaleLowerCase()}`;
    config.description = options.description;
    config.scripts = {
        ...config.scripts
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
}
