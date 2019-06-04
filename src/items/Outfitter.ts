import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import { createOutfit, IOutfit } from "./IOutfit";

export default class Outfitter {
    gearType: "equipped" | "costume";
    newOutfit: IOutfit;
    currentOutfit: IOutfit;
    failMessage = "";

    constructor(outfit: IOutfit, useCostume: boolean, userData: IHabiticaData) {
        this.gearType = useCostume ? "costume" : "equipped";
        this.newOutfit = outfit;
        const gear = userData.items.gear;
        this.currentOutfit = createOutfit("current", useCostume ? gear.costume : gear.equipped);
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
                await callHabApi(`/api/v3/user/equip/${this.gearType}/${item}`, "POST");
            } catch (e) {
                this.failMessage += `Failed to equip ${item}: ${e.message}\n`;
            }
        }
    }
}
