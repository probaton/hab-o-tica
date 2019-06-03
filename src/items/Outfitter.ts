import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import { createOutfit, IOutfit } from "./IOutfit";

export default class Outfitter {
    newOutfit: IOutfit;
    currentOutfit: IOutfit;
    failMessage = "";

    constructor(outfit: IOutfit, userData: IHabiticaData) {
        this.newOutfit = outfit;
        this.currentOutfit = createOutfit("current", userData.items.gear.costume);
    }

    async equipAll(): Promise<string> {
        await this.equipItem("armor", this.newOutfit.armor);
        await this.equipItem("head", this.newOutfit.head);
        await this.equipItem("shield", this.newOutfit.shield);
        await this.equipItem("body", this.newOutfit.body);
        await this.equipItem("weapon", this.newOutfit.weapon);
        await this.equipItem("eyeWear", this.newOutfit.eyeWear);
        await this.equipItem("headAccessory", this.newOutfit.headAccessory);
        await this.equipItem("back", this.newOutfit.back);
        return this.failMessage || `${this.newOutfit.name} equipped successfully.`;
    }

    async equipItem(slot: "armor" | "head" | "shield" | "body" | "weapon" | "eyeWear" | "headAccessory" | "back", item?: string): Promise<void> {
        if (item && item !== this.currentOutfit[slot]) {
            try {
                await callHabApi(`/api/v3/user/equip/costume/${item}`, "POST");
            } catch (e) {
                this.failMessage += `Failed to equip ${item}: ${e.message}\n`;
            }
        }
    }
}
