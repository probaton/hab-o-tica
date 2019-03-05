import { callHabApi } from "../requests/HabiticaRequest";
import { getHighestValueHabit } from "../userData/IHabiticaData";
import { getUserData } from "../userData/userData";


export function useSkill(skill: Skills, habitId?: string, onEnd?: () => void) {
    let apiSuffix = `/api/v3/user/class/cast/${skill}`;
    apiSuffix += habitId ? `?targetId=${habitId}` : "";
    callHabApi(apiSuffix, "POST");
}

export async function useSkillOnHighestValueHabit(skill: Skills, count: number, successMessage?: string): Promise<any> {
    const userData = await getUserData();
    const habit = getHighestValueHabit(userData.tasks.habits);
    return useSkill(skill, habit.id);
}

export type Skills =
    "fireball" |
    "mpHeal" |
    "earth" |
    "frost" |
    "smash" |
    "defensiveStance" |
    "valorousPresence" |
    "intimidate" |
    "pickPocket" |
    "backStab" |
    "toolsOfTrade" |
    "stealth" |
    "heal" |
    "protectAura" |
    "brightness" |
    "healAll";
