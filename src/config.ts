import Constants from "expo-constants";

export function getEnv(): string {
    const haboticaVars = Constants.expoConfig?.extra;
    if (!haboticaVars || !haboticaVars.habiticaEnv) {
        throw new Error("Habitica environment not set in app.json");
    }
    return haboticaVars.habiticaEnv;
}
