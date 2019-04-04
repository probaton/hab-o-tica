import { AsyncStorage } from "react-native";
import { SkillId } from "../skills/useSkill";

/** Stores the designated skill or clears the field if left empty. */
export function setLastUsedSkill(skill?: SkillId): Promise<void> {
    return AsyncStorage.setItem("lastUsedSkill", skill || "");
}

export async function getLastUsedSkill(): Promise<SkillId | undefined> {
    const result = await AsyncStorage.getItem("lastUsedSkill");
    return result as SkillId | undefined;
}
