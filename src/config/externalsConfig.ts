import { EchoBundleOptions } from '../tools/build/build';

export function getExternalsConfig(options: Partial<EchoBundleOptions>): string[] {
    return [
        'react',
        'react-dom',
        '@equinor/echo-core',
        '@equinor/echo-framework',
        '@equinor/echo-components',
        '@equinor/echo-utils',
        '@equinor/eds-core-react',
        'styled-components'
    ];
}
