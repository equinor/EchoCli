import * as fs from 'fs';
import { ECHO_MODULE_ID_PATH } from '../../const/common';
import { TemplateDir } from '../../types/createTypes';

export interface EchoModuleId {
    moduleId: string;
}

export async function createEchoModuleId(options: TemplateDir): Promise<void> {
    const filePath = `${options.targetDirectory}${ECHO_MODULE_ID_PATH}`;

    try {
        const newModuleConfig: EchoModuleId = {
            moduleId: '<<------Insert moduleId here ------>>'
        };

        fs.writeFileSync(filePath, JSON.stringify(newModuleConfig, null, 4));
    } catch (error) {
        console.error(error);
    }
}

export async function updateEnvFile(envPath: string, clientEnv: string) {}
