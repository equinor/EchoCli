import { ExternalOption } from 'rollup';

export function getExternalsConfig(): ExternalOption {
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
