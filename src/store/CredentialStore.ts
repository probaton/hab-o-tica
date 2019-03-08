import { AsyncStorage } from "react-native";

export async function getCredentials(): Promise<ICredentials> {
    return new Promise<ICredentials> (resolve => {
        AsyncStorage.multiGet(["userId", "apiToken"]).then(items => {
            resolve({ userId: items[0][1], apiToken: items[1][1] });
        });
    });
}

export async function setCredentials(userId: string, apiToken: string): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.multiSet([["userId", userId], ["apiToken", apiToken]]).then(() => { resolve(true); });
    });
}


interface ICredentials {
    userId: string;
    apiToken: string;
}
