import chalk from 'chalk';
import * as fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { TemplateDir } from '../../types/createTypes';

const access = promisify(fs.access);

export async function updateReadme(options: TemplateDir): Promise<void> {
    const readmePath = path.join(options.targetDirectory || '', '/readme.md');

    try {
        await access(readmePath, fs.constants.R_OK);
    } catch (err) {
        if (err instanceof Error) {
            console.error('%s Cant access new app readme file', chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }

    const readme = fs.readFileSync(readmePath).toString();

    fs.writeFileSync(readmePath, readme.replace(new RegExp(/\%moduleName\%/, 'g'), options.name));
}
