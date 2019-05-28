import { callHabApi } from "../requests/HabiticaRequest";

export function lootArmoire() {
    return new Promise<string>(async resolve => {
        await callHabApi("/api/v3/user/buy-armoire", "POST");
        resolve("Successfully looted the armoire");
    });
}
