import { IGearSet } from "../userData/IHabiticaData";

export default class Outfit {
    name: string;
    armor?: string;
    head?: string;
    shield?: string;
    body?: string;
    weapon?: string;
    eyeWear?: string;
    headAccessory?: string;
    back?: string;

    constructor(name: string, gearSet: IGearSet) {
        this.name = name;
        this.armor = gearSet.armor;
        this.head = gearSet.head;
        this.shield = gearSet.shield;
        this.body = gearSet.body;
        this.weapon = gearSet.weapon;
        this.eyeWear = gearSet.eyewear;
        this.headAccessory = gearSet.headaccessory;
        this.back = gearSet.back;
    }
}
