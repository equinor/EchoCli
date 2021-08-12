import chalk from 'chalk';
import * as fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);

export default async function getFilePath(fileName: string, currentDir: string): Promise<string> {
    const currentPath = path.join(currentDir, `${fileName}`);

    try {
        await access(currentPath, fs.constants.R_OK);
        return currentPath;
    } catch (err) {
        if (err instanceof Error) {
            console.error(`%s Cant access ${fileName}`, chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }
}
