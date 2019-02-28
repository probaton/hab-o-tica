import { IHabiticaData } from "./IHabiticaData";
import { getHabReqOpts, callHabApi } from "../requests/HabiticaRequest";

export function getUserData(onEnd: (userData: IHabiticaData) => void) {
    const userDataCallOpts = getHabReqOpts("get", "/export/userdata.json");
    callHabApi(userDataCallOpts, onEnd); 
}
