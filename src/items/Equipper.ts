import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import IOutfit from "./IOutfit";

export default class Equipper {
    gearType: "equipped" | "costume";
    newOutfit: IOutfit;
    currentOutfit: IOutfit;
    failMessage = "";

    constructor(outfit: IOutfit, useCostume: boolean, userData: IHabiticaData) {
        this.gearType = useCostume ? "costume" : "equipped";
        this.newOutfit = outfit;
        const gear = userData.items.gear;
        this.currentOutfit = { name: "current", gearSet: useCostume ? gear.costume : gear.equipped };
    }

    async equipAll(): Promise<string> {
        await this.equipItem("armor", this.newOutfit.gearSet.armor);
        await this.equipItem("head", this.newOutfit.gearSet.head);
        await this.equipItem("shield", this.newOutfit.gearSet.shield);
        await this.equipItem("body", this.newOutfit.gearSet.body);
        await this.equipItem("weapon", this.newOutfit.gearSet.weapon);
        await this.equipItem("eyewear", this.newOutfit.gearSet.eyewear);
        await this.equipItem("headAccessory", this.newOutfit.gearSet.headAccessory);
        await this.equipItem("back", this.newOutfit.gearSet.back);
        return this.failMessage || `${this.newOutfit.name} equipped successfully.`;
    }

    async equipItem(slot: "armor" | "head" | "shield" | "body" | "weapon" | "eyewear" | "headAccessory" | "back", item?: string): Promise<void> {
        const currentItem = this.currentOutfit.gearSet[slot];
        if (item && item !== currentItem) {
            const newItem = item.endsWith("_base_0") ? currentItem : item; // Unequip current item if the outfit slot is explicitly empty.
            try {
                await callHabApi(`/api/v3/user/equip/${this.gearType}/${newItem}`, "POST");
            } catch (e) {
                this.failMessage += `Failed to equip ${item}: ${e.message}\n`;
            }
        }
    }
}
