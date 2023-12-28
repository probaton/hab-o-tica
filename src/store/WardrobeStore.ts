import IOutfit from "../items/IOutfit";
import StoreItem from "./StoreItem";

export default abstract class WardrobeStore {
    static async get(): Promise<IOutfit[]> {
        const wardrobeString = await this.store().get();
        return wardrobeString ? JSON.parse(wardrobeString) as IOutfit[] : [];
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

    static async remove(name: string): Promise<void> {
        const wardrobe = await this.get();
        this.set(wardrobe.filter(o => o.name !== name));
    }

    private static set(outfit: IOutfit[]): void {
        this.store().set(JSON.stringify(outfit));
    }

    private static store() {
        return new StoreItem("outfit");
    }

}

