import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import { createOutfit, IOutfit } from "./IOutfit";

export default class Outfitter {
    newOutfit: IOutfit;
    currentOutfit: IOutfit;

    constructor(outfit: IOutfit, userData: IHabiticaData) {
        this.newOutfit = outfit;
        this.currentOutfit = createOutfit("current", userData.items.gear.costume);
    }

    async equipAll(): Promise<string> {
        return this.equipItem("armor", this.newOutfit.armor);
    }

    async equipItem(slot: "armor" | "head" | "shield" | "body" | "weapon" | "eyeWear" | "headAccessory" | "back", item?: string): Promise<string> {
        if (item !== this.currentOutfit[slot]) {
            callHabApi(`/api/v3/user/equip/costume/${item}`, "POST");
            return `Successfully equipped ${item}`;
        }
        return "That item is already equipped";
    }
}
