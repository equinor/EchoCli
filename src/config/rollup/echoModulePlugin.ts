import fs, { PathLike } from 'fs';
import { OutputOptions } from 'rollup';

interface EchoModuleCreator {
    name: string;
    writeBundle(options: OutputOptions, bundle: any): Promise<void>;
}

export default function echoModuleCreator(filepath: string, fileToChange: string, requireRef?: string) {
    return {
        name: 'echo-moduleCreator',
        async writeBundle(options: OutputOptions, bundle): Promise<void> {
            const config = {
                fileName: 'index.js',
                match: /\(function\(g\,f\)\{/,
                replace: `(function(g,f){function define(d, f){typeof document !== "undefined" && (document.currentScript.module = {});f(document.currentScript.module, ...d.filter((d) => d !== "exports").map(window["${requireRef}"]));}define.amd = !0;`
            };
            if (bundle[config.fileName]) {
                const data = bundle[config.fileName].code.replace(config.match, config.replace);
                fs.writeFileSync(filepath as PathLike, data);
            }
        }
    };
}
