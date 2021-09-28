import * as fs from 'fs';
import getFilePath from '../../utils/getFilePath';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getPackageJson(currentDir: string): Promise<any> {
    const configPath = await getFilePath(currentDir, '/package.json');
    return JSON.parse(fs.readFileSync(configPath).toString());
}
