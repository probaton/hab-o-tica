import { IGearSet } from "../userData/IHabiticaData";

export interface IOutfit {
    name: string;
    armor: string;
    head: string;
    shield: string;
    body: string;
    weapon: string;
    eyeWear: string;
    headAccessory: string;
    back: string;
}

export function createOutfit(name: string, gearSet: IGearSet): IOutfit {
    return {
        name,
        armor: gearSet.armor,
        head: gearSet.head,
        shield: gearSet.shield,
        body: gearSet.body,
        weapon: gearSet.weapon,
        eyeWear: gearSet.eyewear,
        headAccessory: gearSet.headaccessory,
        back: gearSet.back,
    };
}
