import { getEnv } from "../config";
import { getCredentials } from "../store/CredentialStore";

export async function callHabApi(apiSuffix: string, method: "POST" | "GET" | "PUT", body?: any): Promise<any> {
    const credentials = await getCredentials();
    const headers: any = {
        "x-client": "probaton-habotica",
        "x-api-user": credentials.userId,
        "x-api-key": credentials.apiToken,
    };
    if (body) {
        headers["Content-Type"] = "application/json";
    }
    const options = {
        method,
        headers,
        body: JSON.stringify(body),
    };

    return fetch(`${getEnv()}${apiSuffix}`, options).then(async response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error((await response.json()).message);
    });
}
