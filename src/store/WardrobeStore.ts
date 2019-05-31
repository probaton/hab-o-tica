import { IOutfit } from "../items/IOutfit";
import StoreItem from "./StoreItem";

export default abstract class WardrobeStore {
    static store() {
        return new StoreItem("outfit");
    }

    static async get(): Promise<IOutfit[] | undefined> {
        const wardrobeString = await this.store().get();
        return wardrobeString ? JSON.parse(wardrobeString) as Promise<IOutfit[] | undefined> : undefined;
    }

    static async add(outfit: IOutfit): Promise<void> {
        const wardrobe = await this.get();
        if (!wardrobe) {
            this.set([outfit]);
        } else {
            wardrobe.push(outfit);
            this.set(wardrobe);
        }
    }

    private static set(outfit: IOutfit[]) {
        this.store().set(JSON.stringify(outfit));
    }
}

