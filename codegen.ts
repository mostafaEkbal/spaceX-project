import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "https://spacex-production.up.railway.app/",
    documents: ["src/**/*.graphql"],
    generates: {
        "./src/graphql/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql"
            }
        }
    }
};
export default config;
