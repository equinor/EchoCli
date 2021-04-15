import * as chalk from 'chalk';
import * as fs from 'fs';

export async function createAndSetTargetDir(key: string): Promise<string> {
    const newDir = './' + key;
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
        return process.cwd() + '/' + key;
    }
    console.error('%s Target directory already exists, select a different app key', chalk.red.bold('ERROR'));
    process.exit(1);
}
