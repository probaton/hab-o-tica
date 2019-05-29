import { s } from "../helpers/pluralizer";
import { callHabApi } from "../requests/HabiticaRequest";


export default class ArmoireLooter {
    xpGain = 0;
    gearGain: string[] = [];
    foodGain: Array<{ count: number, type: string }> = [];

    /**
     * Loots the armoire a given number of times or until gold runs out.
     * @param count The number of times to loot.
     */
    async spamArmoire(condition: (lootCount: number) => Promise<boolean>): Promise<any> {
        return new Promise<string> (async (resolve) => {
            let i = 0;
            let run = true;
            while ((await condition(i)) && run) {
                await callHabApi("/api/v3/user/buy-armoire", "POST")
                    .then(response => {
                        this.parseArmoireResponse(response);
                    })
                    .catch(e => {
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

    parseArmoireResponse(response: any): void {
        if (!response.data || !response.data.armoire) {
            console.log(">>>> unexpected armoire response", response);
            return;
        }

        const gain = response.data.armoire;
        switch (gain.type) {
            case "experience": {
                this.xpGain += gain.value;
                break;
            }
            case "food": {
                const existingFood = this.foodGain.find(f => f.type === gain.dropKey);
                existingFood ? existingFood.count++ : this.foodGain.push({ count: 1, type: gain.dropKey });
                break;
            }
            case "gear": {
                this.gearGain.push(gain.dropText);
                break;
            }
            default: {
                console.log(">>>> unexpected type", response);
            }
        }
    }
}
