import ReplaceInFileWebpackPlugin from 'replace-in-file-webpack-plugin';
import { REQUIRED_REF } from '../../const/common';
import { EchoWebpackOptions } from '../common/initOptions';
import { getFileName } from './configBuilders/output';

const devModuleCode = `(function webpackUniversalModuleDefinition(root, factory) {
/* Echo Module definition */ 
function define(dependencies, factory){
    const echoModule = factory(...dependencies.map(window["${REQUIRED_REF}"])); 
    typeof document!=='undefined' && (document.currentScript.module = echoModule);
}
define.amd=!0;`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function echoWebpackModulePlugin(options: EchoWebpackOptions): any {
    const file = options.echoModuleConfig.chunk
        ? `${options.echoModuleConfig.manifest.shortName}-main.js`
        : getFileName(options.main);
    return new ReplaceInFileWebpackPlugin([
        {
            dir: './build',
            files: [file],
            rules: options.isProduction
                ? [
                      {
                          search: /^\!function\s?\(e,\s?t\)\s?\{/m,
                          replace: `!function(e,t){function define(d,t){const echoModule = t(...d.map(window["${REQUIRED_REF}"])); console.log(echoModule); typeof document!=='undefined' && (document.currentScript.module = echoModule);}define.amd=!0;`
                      },
                      {
                          search: /^\!function\s?\(e,\s?n\)\s?\{/m,
                          replace: `!function(e,n){function define(d,n){const echoModule = n(...d.map(window["${REQUIRED_REF}"])); console.log(echoModule); typeof document!=='undefined' && (document.currentScript.module = echoModule);}define.amd=!0;`
                      },
                      {
                          search: /^\!function\s?\(e,\s?r\)\s?\{/m,
                          replace: `!function(e,r){function define(d,n){const echoModule = r(...d.map(window["${REQUIRED_REF}"])); console.log(echoModule); typeof document!=='undefined' && (document.currentScript.module = echoModule);}define.amd=!0;`
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
