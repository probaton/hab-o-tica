export type PetType = "Base" | "White" | "Desert" | "Red" | "Shade" | "Skeleton" | "Zombie" | "CottonCandyPink" | "CottonCandyBlue" | "Golden";

export interface IPickerOption {
    id: string;
    label: string;
}

export interface IPetMap {
    name: string;
    displayName: string;
    variants: string[];
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
