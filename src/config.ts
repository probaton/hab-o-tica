import { Constants } from "expo";

export function getEnv(): string {
    const haboticaVars = Constants.manifest.extra;
    if (!haboticaVars || !haboticaVars.habiticaEnv) {
        throw new Error("Habitica environment not set in app.json");
    }
    return haboticaVars.habiticaEnv;
}
