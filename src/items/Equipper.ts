import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import IOutfit from "./IOutfit";

export default class Equipper {
    gearType: "equipped" | "costume";
    newOutfit: IOutfit;
    currentOutfit: IOutfit;

    constructor(outfit: IOutfit, useCostume: boolean, userData: IHabiticaData) {
        this.gearType = useCostume ? "costume" : "equipped";
        this.newOutfit = outfit;
        const gear = userData.items.gear;
        this.currentOutfit = {
            name: "current",
            gearSet: useCostume ? gear.costume : gear.equipped,
            skin: userData.preferences.skin,
            background: userData.preferences.background,
            pet: userData.items.currentPet,
            mount: userData.items.currentMount,
        };
    }

    async equipAll(): Promise<string> {
        const failMessage = [
            await this.equipItem("armor"),
            await this.equipItem("head"),
            await this.equipItem("shield"),
            await this.equipItem("body"),
            await this.equipItem("weapon"),
            await this.equipItem("eyewear"),
            await this.equipItem("headAccessory"),
            await this.equipItem("back"),
            await this.equip("pet", this.newOutfit.pet, this.currentOutfit.pet),
            await this.equip("mount", this.newOutfit.mount, this.currentOutfit.mount),
            await this.setPreferences(this.newOutfit.background, this.newOutfit.skin),
        ].filter(Boolean).join("\n");
        return failMessage || `${this.newOutfit.name} equipped successfully.`;
    }

    async equipItem(type: "armor" | "head" | "shield" | "body" | "weapon" | "eyewear" | "headAccessory" | "back" ): Promise<string | undefined> {
        return await this.equip(this.gearType, this.newOutfit.gearSet[type], this.currentOutfit.gearSet[type]);
    }

    async equip(type: "mount" | "pet" | "costume" | "equipped", newItem?: string, currentItem?: string): Promise<string | undefined> {
        if (newItem && newItem !== currentItem) {
            const toBeEquipped = newItem.endsWith("_base_0") ? currentItem : newItem; // Unequip current item if the outfit slot is explicitly empty.
            try {
                await callHabApi(`/api/v3/user/equip/${type}/${toBeEquipped}`, "POST");
            } catch (e) {
                return `Failed to (un)equip ${newItem}: ${e.message}`;
            }
        }
    }

    async setPreferences(background?: string, skin?: string): Promise<string | undefined> {
        const body: any = {};
        let failMessage = "Failed to equip ";

        if (background && background !== this.currentOutfit.background) {
            body["preferences.background"] = background;
            failMessage += background;
        }
        if (skin && skin !== this.currentOutfit.skin) {
            body["preferences.skin"] = skin;
            failMessage += background ? ` and ${skin}` : skin;
        }

        if (Object.keys(body).length > 0) {
            try {
                await callHabApi(`/api/v4/user`, "PUT", body);
            } catch (e) {
                return `${failMessage}: ${e.message}`;
            }
        }
    }
}
