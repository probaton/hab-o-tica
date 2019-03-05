import { callHabApi } from "../requests/HabiticaRequest";
import { IHabiticaData } from "./IHabiticaData";

export async function getUserData(): Promise<IHabiticaData> {
    return callHabApi("/export/userdata.json", "GET");
}
