import { getCredentials } from "../store/CredentialStore";


export async function callHabApi(apiSuffix: string, method: "POST" | "GET", body?: any): Promise<any> {
    const credentials = await getCredentials();
    const options = {
        method,
        headers: {
            "x-client": "probaton-habotica",
            "x-api-user": credentials.userId,
            "x-api-key": credentials.apiToken,
        },
    };

    return fetch(`https://habitica.com${apiSuffix}`, options).then(async response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error((await response.json()).message);
    });
}
