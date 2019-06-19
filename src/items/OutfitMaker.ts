import WardrobeStore from "../store/WardrobeStore";
import IHabiticaData from "../userData/IHabiticaData";
import IOutfit from "./IOutfit";
import OutfitChecklist from "./OutfitChecklist";

export default class OutfitMaker {
    userData: Promise<IHabiticaData>;
    checklist: OutfitChecklist;

    constructor(userData: Promise<IHabiticaData>) {
        this.userData = userData;
        this.checklist = new OutfitChecklist();
    }

    async save(name: string, useCostume: boolean): Promise<string> {
        const data = await this.userData;
        const rawGearSet = data.items.gear[useCostume ? "costume" : "equipped"];
        const outfit: IOutfit = {
            name,
            gearSet: {
                armor: this.checklist.armor ? rawGearSet.armor : undefined,
                head: this.checklist.head ? rawGearSet.head : undefined,
                shield: this.checklist.shield ? rawGearSet.shield : undefined,
                body: this.checklist.body ? rawGearSet.body : undefined,
                weapon: this.checklist.weapon ? rawGearSet.weapon : undefined,
                eyewear: this.checklist.eyewear ? rawGearSet.eyewear : undefined,
                headAccessory: this.checklist.headAccessory ? rawGearSet.headAccessory : undefined,
                back: this.checklist.back ? rawGearSet.back : undefined,
            },
            skin: this.checklist.skin ? data.preferences.skin : undefined,
            background: this.checklist.background ? data.preferences.background : undefined,
            pet: this.checklist.pet ? data.items.currentPet : undefined,
            mount: this.checklist.mount ? data.items.currentMount : undefined,
        };
        await WardrobeStore.add(outfit);
        return `Successfully added ${name} to your wardrobe.`;
    }
}
