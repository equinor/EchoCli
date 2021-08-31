import ReplaceInFileWebpackPlugin from 'replace-in-file-webpack-plugin';
import { REQUIRED_REF } from '../../const/common';
const devModuleCode = `(function webpackUniversalModuleDefinition(root, factory) {
/* Echo Module definition */ 
function define(dependencies, factory){
    const echoModule = factory(...dependencies.map(window["${REQUIRED_REF}"])); 
    typeof document!=='undefined' && (document.currentScript.module = echoModule);
}
define.amd=!0;`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function echoWebpackModulePlugin(isProduction: boolean): any {
    return new ReplaceInFileWebpackPlugin([
        {
            dir: './build',
            files: ['index.js'],
            rules: isProduction
                ? [
                      {
                          search: /^\!function\s?\(e,\s?t\)\s?\{/m,
                          replace: `!function(e,t){function define(d,t){const echoModule = t(...d.map(window["${REQUIRED_REF}"])); console.log(echoModule); typeof document!=='undefined' && (document.currentScript.module = echoModule);}define.amd=!0;`
                      },
                      {
                          search: /^\!function\s?\(e,\s?n\)\s?\{/m,
                          replace: `!function(e,n){function define(d,n){const echoModule = n(...d.map(window["${REQUIRED_REF}"])); console.log(echoModule); typeof document!=='undefined' && (document.currentScript.module = echoModule);}define.amd=!0;`
                      }
                  ]
                : [
                      {
                          search: /^\(function\s?webpackUniversalModuleDefinition\(root,\s?factory\)\s?\{/m,
                          replace: devModuleCode
                      }
                  ]
        }
    ]);
}
