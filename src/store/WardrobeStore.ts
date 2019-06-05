import { Outfit } from "../items/Outfit";
import StoreItem from "./StoreItem";

export default abstract class WardrobeStore {
    static async get(): Promise<Outfit[] | undefined> {
        const wardrobeString = await this.store().get();
        return wardrobeString ? JSON.parse(wardrobeString) as Promise<Outfit[] | undefined> : undefined;
    }

    static async add(outfit: Outfit): Promise<void> {
        const wardrobe = await this.get();
        if (!wardrobe) {
            this.set([outfit]);
        } else {
            wardrobe.push(outfit);
            this.set(wardrobe);
        }
    }

    private static set(outfit: Outfit[]) {
        this.store().set(JSON.stringify(outfit));
    }

    private static store() {
        return new StoreItem("outfit");
    }

}

