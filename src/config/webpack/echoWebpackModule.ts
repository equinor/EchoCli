import ReplaceInFileWebpackPlugin from 'replace-in-file-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function echoWebpackModulePlugin(requireRef: string): any {
    return new ReplaceInFileWebpackPlugin([
        {
            dir: './build',
            files: ['index.js'],
            rules: [
                {
                    search: /^\!function\s?\(e,\s?t\)\s?\{/m,
                    replace: `!function(e,t){function define(d,t){typeof document!=='undefined' && (document.currentScript.module = t.apply(d.map(window["${requireRef}"])));}define.amd=!0;`
                }
            ]
        }
    ]);
}
