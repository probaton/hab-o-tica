import { callHabApi } from "../requests/HabiticaRequest";
import { IOutfit } from "./IOutfit";

export default class Outfitter {
    outfit: IOutfit;

    constructor(outfit: IOutfit) {
        this.outfit = outfit;
    }

    async equipAll(): Promise<string> {
        return this.equipItem(this.outfit.armor);
    }

    async equipItem(item?: string): Promise<string> {
        if (item) {
            callHabApi(`/api/v3/user/equip/costume/${item}`, "POST");
            return `Successfully equipped ${item}`;
        }
        return "The outfit doesn't include that slot";
    }
}
