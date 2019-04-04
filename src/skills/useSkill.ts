import { callHabApi } from "../requests/HabiticaRequest";
import { HabiticaClass } from "../userData/IHabiticaData";
import { getUserData } from "../userData/userData";


function callSkillApi(skill: SkillId, habitId: string): Promise<any> {
    let apiSuffix = `/api/v3/user/class/cast/${skill}`;
    apiSuffix += habitId ? `?targetId=${habitId}` : "";
    return callHabApi(apiSuffix, "POST");
}

/**
 * Spams a skill a given number of times or until mana runs out.
 * @param skill The skill to be used.
 * @param count The number of times to perform the skill. Will run until out of mana if set to -1, which is the default.
 */
export async function spamSkill(skillId: SkillId, count = -1): Promise<any> {
    const skill = getSkillById(skillId);
    let habitId = "";
    if (skill.habit !== "none") {
        const habits = (await getUserData()).tasks.habits.sort((a: any, b: any) => a.value - b.value);
        habitId = skill.habit === "lowest" ? habits[0].id : habits[habits.length - 1].id;
    }

    return new Promise<string | undefined> (async (resolve) => {
        let i = 0;
        let run = true;
        while ((count === -1 || i < count) && run) {
            await callSkillApi(skillId, habitId).catch(e => {
                resolve(e.message === "Not enough mana."
                ? `Cast ${skill.name} ${i} time${s(i)} before running out of mana`
                : `${skill.name} failed after ${i} cast${s(i)}: \n${e.message}`);
                run = false;
            });
            i++;
        }
        resolve(`Succesfully cast ${skill.name} ${i} time${s(i)}`);
    });
}

function s(i: number): "s" | "" {
    return i === 1 ? "" : "s";
}

export type SkillId =
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

export interface ISkill {
    id: SkillId;
    name: string;
    habit: "lowest" | "highest" | "none";
    class: HabiticaClass;
}

export const skills: ISkill[] = [
    { id: "fireball",           name: "Burst of Flames",    habit: "highest",   class: "wizard" },
    { id: "mpHeal",             name: "Ethereal Surge",     habit: "none",      class: "wizard" },
    { id: "earth",              name: "Earthquake",         habit: "none",      class: "wizard" },
    { id: "frost",              name: "Chilling Frost",     habit: "none",      class: "wizard" },
    { id: "smash",              name: "Brutal Smash",       habit: "lowest",    class: "warrior" },
    { id: "defensiveStance",    name: "Defensive Stance",   habit: "none",      class: "warrior" },
    { id: "valorousPresence",   name: "Valorous Presence",  habit: "none",      class: "warrior" },
    { id: "intimidate",         name: "Intimidating Gaze",  habit: "none",      class: "warrior" },
    { id: "pickPocket",         name: "Pickpocket",         habit: "highest",   class: "rogue" },
    { id: "backStab",           name: "Backstab",           habit: "highest",   class: "rogue" },
    { id: "toolsOfTrade",       name: "Tools of the Trade", habit: "none",      class: "rogue" },
    { id: "stealth",            name: "Stealth",            habit: "none",      class: "rogue" },
    { id: "heal",               name: "Healing Light",      habit: "none",      class: "healer" },
    { id: "protectAura",        name: "Protective Aura",    habit: "none",      class: "healer" },
    { id: "brightness",         name: "Searing Brightness", habit: "none",      class: "healer" },
    { id: "healAll",            name: "Blessing",           habit: "none",      class: "healer" },
];

export function getSkillById(skillId: SkillId): ISkill {
    return skills.find(skill => skill.id === skillId)!;
}

export function getClassSkills(habiticaClass: HabiticaClass): ISkill[] {
    return skills.filter(skill => skill.class === habiticaClass);
}
