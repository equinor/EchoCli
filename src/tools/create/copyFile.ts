import * as fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { TemplateDir } from '../../types/createTypes';

const copy = promisify(ncp);

export async function copyTemplateFiles(options: TemplateDir): Promise<boolean> {
    const success = await copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    });

    const indexJsPath = path.join(options.targetDirectory || '', 'src', 'index.tsx');
    const indexJsContent = fs.readFileSync(indexJsPath).toString();

    const indexJsContentReplaced = indexJsContent.replace('{appKey}', options.key || 'app-key');

    fs.writeFileSync(indexJsPath, indexJsContentReplaced);

    return success;
}
