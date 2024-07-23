import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://spacex-production.up.railway.app/',
    documents: ['src/**/*.tsx'],
    generates: {
        './src/gql/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: 'gql'
            }
        }
    }
};
export default config;
