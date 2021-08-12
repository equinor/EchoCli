import * as fs from 'fs';
import { TemplateDir } from '../../types/createTypes';
import getFilePath from '../../utils/getFilePath';

export interface EchoModuleConfig {
    moduleId: string;
    bundler: string;
    manifest: {
        name: string;
        key: string;
        shortName: string;
        path: string;
        description: string;
        private: boolean;
    };
    server: {
        contentBase: string;
        port: number;
        open: boolean;
        host: string;
    };
}

export async function createEchoModuleConfig(options: TemplateDir): Promise<void> {
    const filePath = `${options.targetDirectory}/echoModule.config.json`;

    try {
        const newModuleConfig: EchoModuleConfig = {
            moduleId: '<<------Insert moduleId here ------>>',
            bundler: 'rollup',
            manifest: {
                name: options.name,
                key: options.key,
                shortName: options.shortName,
                path: options.path,
                description: options.description,
                private: false
            },
            server: {
                contentBase: '/build',
                port: 3000,
                open: true,
                host: 'localhost'
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(newModuleConfig, null, 4));
    } catch (error) {
        console.error(error);
    }
}

export async function getEchoModuleConfig(currentDir: string): Promise<EchoModuleConfig> {
    const moduleConfigPath = await getFilePath(currentDir, '/echoModule.config.json');
    return JSON.parse(fs.readFileSync(moduleConfigPath).toString()) as EchoModuleConfig;
}
