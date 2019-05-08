export type PetType = "Base" | "White" | "Desert" | "Red" | "Shade" | "Skeleton" | "Zombie" | "CottonCandyPink" | "CottonCandyBlue" | "Golden";

export interface ISpeciesMap {
    name: string;
    displayName: string;
    types: string[];
}

export interface IPetTypeMap {
    name: string;
    displayName: string;
    species: string[];
}

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
    };
}
