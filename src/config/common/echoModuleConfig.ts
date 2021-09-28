import * as fs from 'fs';
import { ECHO_MODULE_CONFIG_PATH } from '../../const/common';
import { TemplateDir } from '../../types/createTypes';

export interface EchoModuleConfig {
    bundler: string;
    chunk?: boolean;
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
        logging: 'none' | 'verbose' | 'error' | 'log' | 'info' | 'warn';
    };
    devMiddleware: {
        stats:
            | boolean
            | 'none'
            | 'verbose'
            | 'summary'
            | 'errors-only'
            | 'errors-warnings'
            | 'minimal'
            | 'normal'
            | 'detailed';
    };
}

export async function createEchoModuleConfig(options: TemplateDir): Promise<void> {
    const filePath = `${options.targetDirectory}${ECHO_MODULE_CONFIG_PATH}`;

    try {
        const newModuleConfig: EchoModuleConfig = {
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
                host: 'localhost',
                logging: 'none'
            },
            devMiddleware: {
                stats: 'errors-warnings'
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(newModuleConfig, null, 4));
    } catch (error) {
        console.error(error);
    }
}
