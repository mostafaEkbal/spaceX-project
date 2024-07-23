import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://spacex-production.up.railway.app/',
    documents: ['src/**/*.graphql'],
    generates: {
        './src/gql/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: 'gql'
            }
        }
    },
    watch: true
};
export default config;
