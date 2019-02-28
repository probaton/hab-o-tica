import { useSkillOnHighestValueHabit } from "./useSkill";


// Count defaults to arbitrary high number as a poor man's version of 'spam until OOM'.
const count = isNaN(+process.argv[2]) ? 1000 : +process.argv[2];
useSkillOnHighestValueHabit("fireball", count, "Fuego!");
