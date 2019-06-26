import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData, { IHair } from "../userData/IHabiticaData";
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
            hair: userData.preferences.hair,
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
            await this.setPreferences(),
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

    async setPreferences(): Promise<string | undefined> {
        const body: any = {};

        const background = this.newOutfit.background;
        if (background && background !== this.currentOutfit.background) {
            body["preferences.background"] = background;
        }

        const skin = this.newOutfit.skin;
        if (skin && skin !== this.currentOutfit.skin) {
            body["preferences.skin"] = skin;
        }

        const hair = this.newOutfit.hair;
        if (hair && hair !== this.currentOutfit.hair) {
            body["preferences.hair.color"] = hair.color;
            body["preferences.hair.base"] = hair.base;
            body["preferences.hair.bangs"] = hair.bangs;
            body["preferences.hair.beard"] = hair.beard;
            body["preferences.hair.mustache"] = hair.mustache;
            body["preferences.hair.flower"] = hair.flower;
        }

        if (Object.keys(body).length > 0) {
            try {
                await callHabApi(`/api/v4/user`, "PUT", body);
            } catch (e) {
                return `Failed to equip background, skin, and/or hair: ${e.message}`;
            }
        }
    }
}
