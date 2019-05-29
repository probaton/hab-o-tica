import { s } from "../helpers/pluralizer";
import { callHabApi } from "../requests/HabiticaRequest";

/**
 * Loots the armoire a given number of times or until gold runs out.
 * @param count The number of times to loot.
 */
export async function spamArmoire(condition: (lootCount: number) => Promise<boolean>): Promise<any> {
    return new Promise<string> (async (resolve) => {
        let i = 0;
        let run = true;
        while ((await condition(i)) && run) {
            await callHabApi("/api/v3/user/buy-armoire", "POST").catch(e => {
                let customMessage = "";
                if (e.message === "Not Enough Gold") {
                    customMessage = i > 0
                        ? `Looted the armoire ${i} times before running out of gold`
                        : `Tried to loot the armoire, but you don't seem to have enough gold`;
                }
                resolve(customMessage || `Looting the armoire failed after ${i} times: \n${e.message}`);
                run = false;
            });
            i++;
        }
        resolve(`Succesfully looted the armoire ${i} time${s(i)}`);
    });
}
