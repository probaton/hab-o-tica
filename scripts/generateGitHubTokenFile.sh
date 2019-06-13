if [[ ! -f ./secret/gitHubToken.ts ]]; then
    mkdir -p secret && echo 'export const gitHubToken = "<your-api-token-here>";' > secret/gitHubToken.ts
fi;