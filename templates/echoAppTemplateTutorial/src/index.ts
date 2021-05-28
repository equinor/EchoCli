import { EchoModuleApi } from '@equinor/echo-core';
import App from 'app';

export function setup(api: EchoModuleApi): void {
    api.registerApp(App);
}
