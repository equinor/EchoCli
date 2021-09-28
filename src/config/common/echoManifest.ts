import chalk from 'chalk';
import * as fs from 'fs';
import { EchoModuleConfig } from './echoModuleConfig';
import getPackageJson from './getPackageJson';

export async function createEchoModuleManifest(
    echoModuleConfig: EchoModuleConfig,
    currentPath?: string,
    requireRef?: string,
    adminModulePath?: string,
    adminModule?: boolean
): Promise<void> {
    if (!currentPath) {
        console.error('%s The current path is undefined ', chalk.red.bold('ERROR'));
        return;
    }

    const pkj = await getPackageJson(currentPath);

    const buildPath = `${currentPath}${echoModuleConfig.server.contentBase}`;
    const filePath = `${buildPath}/echoModuleManifest.json`;

    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath, {
            recursive: true
        });
    }

    try {
        const newEchoModuleManifest = [
            {
                name: echoModuleConfig.manifest.name,
                key: echoModuleConfig.manifest.key,
                shortName: echoModuleConfig.manifest.shortName,
                fileUri: echoModuleConfig.chunk
                    ?`${echoModuleConfig.manifest.shortName}-main.js`: getFileUriPath(pkj.main),
                    
                path: echoModuleConfig.manifest.path,
                version: pkj.version,
                private: echoModuleConfig.manifest.private,
                requireRef
            }
        ];
        adminModule === true &&
            adminModulePath &&
            newEchoModuleManifest.push({
                name: 'Echo Administration',
                key: 'EchoAdmin',
                shortName: 'EchoAdmin',
                fileUri: adminModulePath,
                path: '/admin',
                version: '1.0.0',
                private: false,
                requireRef
            });
        fs.writeFileSync(filePath, JSON.stringify(newEchoModuleManifest, null, 4));
    } catch (error) {
        console.error(error);
    }
}

export function getFileUriPath(filePath: string): string {
    const arr = filePath.split('/');
    const fileName = arr[arr.length - 1];
    return `/${fileName}`;
}
