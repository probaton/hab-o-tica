export type PetType = "Base" | "White" | "Desert" | "Red" | "Shade" | "Skeleton" | "Zombie" | "CottonCandyPink" | "CottonCandyBlue" | "Golden";

export type ServingsPerType = {
    Base: string[],
    White: string[],
    Desert: string[],
    Red: string[],
    Shade: string[],
    Skeleton: string[],
    Zombie: string[],
    CottonCandyPink: string[],
    CottonCandyBlue: string[],
    Golden: string[],
    Other: string[],
};

export function initializeServingsPerType(): ServingsPerType {
    return {
        Base: [],
        White: [],
        Desert: [],
        Red: [],
        Shade: [],
        Skeleton: [],
        Zombie: [],
        CottonCandyPink: [],
        CottonCandyBlue: [],
        Golden: [],
        Other: [],
    };
}
