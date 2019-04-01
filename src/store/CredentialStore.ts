import { AsyncStorage } from "react-native";
import { IHabiticaData } from "../userData/IHabiticaData";

export async function getCredentials(): Promise<ICredentials> {
    return new Promise<ICredentials> (resolve => {
        AsyncStorage.multiGet(["userId", "apiToken"]).then(items => {
            resolve({ userId: items[0][1], apiToken: items[1][1] });
        });
    });
}

export function setCredentials(credentials: ICredentials): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.multiSet([["userId", credentials.userId], ["apiToken", credentials.apiToken]]).then(() => { resolve(true); });
    });
}

export function getVerifiedCredentials(): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.getItem("verifiedCredentials").then(item => { resolve(Boolean(item === "1")); });
    });
}

export function setVerifiedCredentials(value: boolean): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.setItem("verifiedCredentials", value ? "1" : "0").then(() => { resolve(true); });
    });
}

export async function verifyCredentialsAndReturnUserData(credentials: ICredentials): Promise<IHabiticaData> {
    return new Promise<IHabiticaData> (async (resolve) => {
        const userData = await _getUserData(credentials);
        if (userData) {
            await setVerifiedCredentials(true);
            await setCredentials(credentials);
        }
        resolve(userData);
    });
}

async function _getUserData(credentials: ICredentials): Promise<IHabiticaData | undefined> {
    const options = {
        method: "GET",
        headers: {
            "x-api-user": credentials.userId,
            "x-api-key": credentials.apiToken,
        },
    };

    return fetch("https://habitica.com/export/userData.json", options).then(async response => {
        if (response.ok) {
            return await response.json() as IHabiticaData;
        }
        return(undefined);
    });
}

interface ICredentials {
    userId: string;
    apiToken: string;
}
