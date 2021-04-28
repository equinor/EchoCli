import fs from 'fs';
import { InputOptions, OutputOptions } from 'rollup';

interface EchoModuleCreator {
    name: string;
    buildStart(options: InputOptions): Promise<void>;
    writeBundle(options: OutputOptions, bundle: any): Promise<void>;
}

export default function echoModuleCreator(): EchoModuleCreator {
    let fileName = '';
    return {
        name: 'echo-moduleCreator',
        async buildStart(options: InputOptions): Promise<void> {
            fileName = options.input!.toString();
        },
        async writeBundle(options: OutputOptions, bundle): Promise<void> {
            const config = {
                match: /\(function\(g\,f\)\{/,
                replace: `(function(g,f){function define(d, f){typeof document !== "undefined" && (document.currentScript.module = {});f(document.currentScript.module, ...d.filter((d) => d !== "exports").map(window.app));}define.amd = !0;`
            };
            for (const [fileName] of Object.entries(bundle)) {
                if (bundle[fileName]) {
                    let data = fs.readFileSync(bundle[fileName], { encoding: 'utf8' });
                    data = data.replace(config.match, config.replace);
                    fs.writeFileSync(options.file ?? fileName, data);
                }
            }
        }
    };
}
