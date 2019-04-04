import { AsyncStorage } from "react-native";

export default class StoreItem {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    get(): Promise<string | null> {
        return AsyncStorage.getItem(this.key);
    }

    set(value: string): Promise<void> {
        return AsyncStorage.setItem(this.key, value);
    }

    clear(): Promise<void> {
        return AsyncStorage.removeItem(this.key);
    }
}
