import * as fs from 'fs';
import getFilePath from './getFilePath';

export async function getFile<T>(currentDir: string, filePath: string): Promise<T> {
    const path = await getFilePath(currentDir, filePath);
    return JSON.parse(fs.readFileSync(path).toString()) as T;
}
