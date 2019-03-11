import { AsyncStorage } from "react-native";
import { IHabiticaData } from "../userData/IHabiticaData";

export async function getCredentials(): Promise<ICredentials> {
    return new Promise<ICredentials> (resolve => {
        AsyncStorage.multiGet(["userId", "apiToken"]).then(items => {
            resolve({ userId: items[0][1], apiToken: items[1][1] });
        });
    });
}

function _setCredentials(userId: string, apiToken: string): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.multiSet([["userId", userId], ["apiToken", apiToken]]).then(() => { resolve(true); });
    });
}

export function getVerifiedCredentials(): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.getItem("verifiedCredentials").then(item => { resolve(Boolean(item === "1")); });
    });
}

function _setVerifiedCredentials(value: boolean): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.setItem("verifiedCredentials", value ? "1" : "0").then(() => { resolve(true); });
    });
}

export async function verifyCredentialsAndReturnUserName(credentials: ICredentials): Promise<string> {
    await _setCredentials(credentials.userId, credentials.apiToken);
    return new Promise<string> (resolve => {
        _getUserName()
            .then(async userName => {
                if (userName === "Invalid credentials") {
                    await _setVerifiedCredentials(false);
                    resolve(userName);
                } else {
                    await _setVerifiedCredentials(true);
                    resolve(userName);
                }
            });
    });
}

async function _getUserName(): Promise<string> {
    const credentials = await getCredentials();
    const options = {
        method: "GET",
        headers: {
            "x-api-user": credentials.userId,
            "x-api-key": credentials.apiToken,
        },
    };

    return fetch("https://habitica.com/export/userData.json", options).then(async response => {
        if (response.ok) {
            return (await response.json() as IHabiticaData).auth.local.username;
        }
        return("Invalid credentials");
    });
}

interface ICredentials {
    userId: string;
    apiToken: string;
}
