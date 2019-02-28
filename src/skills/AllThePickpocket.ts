import { IHabit } from "../userData/IHabiticaData";
import { useSkillOnHighestValueHabit, Skills, useSkill } from "./useSkill";

function multiPickpocket(pickCount: number) {
    useSkillOnHighestValueHabit("pickPocket", pickCount);
}

const pickCount = +process.argv[2];
if (isNaN(pickCount)) {
    console.log("Non-numeric input parameter");
    process.exit(1);
}
multiPickpocket(pickCount);
