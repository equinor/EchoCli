import path from 'path';

export function getBuildFilePath(currentDir?: string, relativePath?: string): string {
    return getPath(currentDir || '', relativePath ? relativePath : '/build/index.js');
}

export function getSrcFilePath(currentDir?: string, relativePath?: string): string {
    return getPath(currentDir || '', relativePath ? relativePath : '/src/index.tsx');
}

function getPath(currentDir: string, relativePath: string): string {
    return path.join(currentDir, relativePath);
}
