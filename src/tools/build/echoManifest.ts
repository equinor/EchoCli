import chalk from 'chalk';
import * as fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);

export async function createEchoModuleManifest(currentPath?: string, requireRef?: string ): Promise<void> {
    if (!currentPath) {
        console.error('%s The current path is undefined ', chalk.red.bold('ERROR'));
        return;
    }

    const configPath = path.join(currentPath || '', '/package.json');
    const filePath = `${currentPath}/build/echoModuleManifest.json`;

    try {
        await access(configPath, fs.constants.R_OK);
    } catch (err) {
        if (err instanceof Error) {
            console.error('%s Cant access package.json', chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }

    const pkj = JSON.parse(fs.readFileSync(configPath).toString());

    try {
        const newEchoModuleManifest = [{
            name: pkj.name,
            key: pkj.manifest.key,
            shortName: pkj.manifest.shortName,
            fileUri: getFilePath(pkj.main),
            path: pkj.manifest.path,
            version: pkj.version,
            requireRef
        }];
        fs.writeFileSync(filePath, JSON.stringify(newEchoModuleManifest, null, 4));
    } catch (error) {
        console.error(error);
    }
}

function getFilePath(filePath: string): string {
    const arr = filePath.split('/');
    const fileName = arr[arr.length - 1];
    return `/${fileName}`;
}
