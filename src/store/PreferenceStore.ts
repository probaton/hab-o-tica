import { AsyncStorage } from "react-native";
import { SkillId } from "../skills/useSkill";

export function setLastSkill(skill: SkillId): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.setItem("lastSkill", skill).then(() => { resolve(true); });
    });
}

export function getLastSkill(): Promise<string | null> {
    return AsyncStorage.getItem("lastSkill");
}
