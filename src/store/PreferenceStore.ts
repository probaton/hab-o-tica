import { AsyncStorage } from "react-native";
import { SkillId } from "../skills/useSkill";

export function setLastSkill(skill: SkillId): Promise<boolean> {
    return new Promise<boolean> (resolve => {
        return AsyncStorage.setItem("lastSkill", skill).then(() => { resolve(true); });
    });
}

export async function getLastSkill(): Promise<SkillId | undefined> {
    const result = await AsyncStorage.getItem("lastSkill");
    return result as SkillId | undefined;
}
