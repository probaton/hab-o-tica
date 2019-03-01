import { IHabiticaData } from "./IHabiticaData";
import { callHabApi } from "../requests/HabiticaRequest";

export async function getUserData(): Promise<IHabiticaData> {
    return callHabApi("/export/userdata.json", "GET");
}
