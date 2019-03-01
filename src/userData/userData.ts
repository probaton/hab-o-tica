import { IHabiticaData } from "./IHabiticaData";
import { getHabReqOpts, callHabApi } from "../requests/HabiticaRequest";

const credentials = require("../../secret/credentials").credentials;

export async function getUserData(): Promise<string> {
    const userDataCallOpts = {
        method: "GET",
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        }
    }
    return fetch("https://habitica.com/export/userdata.json", userDataCallOpts).then(response => response.json());
}
