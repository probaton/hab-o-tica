const credentials = require("../../secret/credentials").credentials;

export async function callHabApi(apiSuffix: string, method: "POST" | "GET", body?: any): Promise<any> {
    const options = {
        method: method,
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        }
    }

    return fetch(`https://habitica.com${apiSuffix}`, options).then(response => response.json());
}
