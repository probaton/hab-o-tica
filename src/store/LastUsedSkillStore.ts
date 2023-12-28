import { SkillId } from "../skills/useSkill";
import StoreItem from "./StoreItem";

export default abstract class LastUsedSkillStore {
    static store() {
        return new StoreItem("lastUsedSkill");
    }

    static get() {
        return this.store().get() as Promise<SkillId | null>;
    }

    static set(value: string) {
        return this.store().set(value);
    }

    static clear() {
        return this.store().clear();
    }
}

