import ncp from 'ncp';
import { promisify } from 'util';
import { EchoWebpackOptions } from './initOptions';

const copy = promisify(ncp);

export async function copyClientFiles(options: EchoWebpackOptions): Promise<boolean> {
    const success = await copy(options.wwwRoot, options.currentDir + options.echoModuleConfig.server.contentBase, {
        clobber: false
    });
    return success;
}
