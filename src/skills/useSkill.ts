import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData, { HabiticaClass } from "../userData/IHabiticaData";
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
    const skill = skills.find(sk => sk.id === skillId)!;
    let habitId = "";
    if (skill.habit !== "none") {
        const habits = (await getUserData()).tasks.habits.sort((a: any, b: any) => a.value - b.value);
        habitId = skill.habit === "lowest" ? habits[0].id : habits[habits.length - 1].id;
    }

    return new Promise<string> (async (resolve) => {
        let i = 0;
        let run = true;
        while ((count === -1 || i < count) && run) {
            await callSkillApi(skill.id, habitId).catch(e => {
                let customMessage = "";
                if (e.message === "Not enough mana.") {
                    customMessage = i > 0
                        ? `Cast ${skill.name} ${i} time${s(i)} before running out of mana`
                        : `Tried to use ${skill.name}, but you don't seem to have enough mana`;
                }
                resolve(customMessage || `${skill.name} failed after ${i} cast${s(i)}: \n${e.message}`);
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
    "mpheal" |
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

interface ISkill {
    id: SkillId;
    name: string;
    habit: "lowest" | "highest" | "none";
    class: HabiticaClass;
    unlockLevel: 11 | 12 | 13 | 14;
}

const skills: ISkill[] = [
    { id: "fireball",           name: "Burst of Flames",    habit: "highest",   class: "wizard",    unlockLevel: 11 },
    { id: "mpheal",             name: "Ethereal Surge",     habit: "none",      class: "wizard",    unlockLevel: 12 },
    { id: "earth",              name: "Earthquake",         habit: "none",      class: "wizard",    unlockLevel: 13 },
    { id: "frost",              name: "Chilling Frost",     habit: "none",      class: "wizard",    unlockLevel: 14 },
    { id: "smash",              name: "Brutal Smash",       habit: "lowest",    class: "warrior",   unlockLevel: 11 },
    { id: "defensiveStance",    name: "Defensive Stance",   habit: "none",      class: "warrior",   unlockLevel: 12 },
    { id: "valorousPresence",   name: "Valorous Presence",  habit: "none",      class: "warrior",   unlockLevel: 13 },
    { id: "intimidate",         name: "Intimidating Gaze",  habit: "none",      class: "warrior",   unlockLevel: 14 },
    { id: "pickPocket",         name: "Pickpocket",         habit: "highest",   class: "rogue",     unlockLevel: 11 },
    { id: "backStab",           name: "Backstab",           habit: "highest",   class: "rogue",     unlockLevel: 12 },
    { id: "toolsOfTrade",       name: "Tools of the Trade", habit: "none",      class: "rogue",     unlockLevel: 13 },
    { id: "stealth",            name: "Stealth",            habit: "none",      class: "rogue",     unlockLevel: 14 },
    { id: "heal",               name: "Healing Light",      habit: "none",      class: "healer",    unlockLevel: 11 },
    { id: "brightness",         name: "Searing Brightness", habit: "none",      class: "healer",    unlockLevel: 12 },
    { id: "protectAura",        name: "Protective Aura",    habit: "none",      class: "healer",    unlockLevel: 13 },
    { id: "healAll",            name: "Blessing",           habit: "none",      class: "healer",    unlockLevel: 14 },
];

export function getUserSkills(userData: IHabiticaData): ISkill[] {
    return skills.filter(skill => skill.class === userData.stats.class && skill.unlockLevel <= userData.stats.lvl);
}
