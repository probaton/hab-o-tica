export interface IHabiticaData {
    stats: {
        per: number;
        int: number;
        con: number;
        str: number;
        points: number;
        class: string;
        lvl: number;
        gp: number;
        exp: number;
        mp: number;
        hp: number;
    }
    tasks: {
        habits: IHabit[];
    }
    lastCron: string;
    items: {
        food: IFood;
    }

}

export interface IFood {
    Meat: number;
    Milk: number;
    Potatoe: number;
    Strawberry: number;
    Chocolate: number;
    Fish: number;
    RottenMeat: number;
    CottonCandyBlue: number;
    CottonCandyPink: number;
    Honey: number;
    Cake_Base: number;
    Cake_White: number;
    Cake_Desert: number;
    Cake_Red: number;
    Cake_Shade: number;
    Cake_Skeleton: number;
    Cake_Zombie: number;
    Cake_CottonCandyPink: number;
    Cake_CottonCandyBlue: number;
    Cake_Golden: number;
    Candy_Base: number;
    Candy_White: number;
    Candy_Desert: number;
    Candy_Red: number;
    Candy_Shade: number;
    Candy_Skeleton: number;
    Candy_Zombie: number;
    Candy_CottonCandyPink: number;
    Candy_CottonCandyBlue: number;
    Candy_Golden: number;
    Saddle:number;
}

export interface IHabit {
    _id: string;
    userId: string;
    text: string;
    updatedAt: string;
    createdAt: string;
    challenge: {};
    attribute: string;
    priority: number;
    value: number;
    tags: string[];
    notes: string;
    type: string;
    history: Object[][];
    frequency: string;
    counterDown: number;
    counterUp: number;
    down: false;
    up: true
    id: string;
}

export function getLowestValueHabit(habits: IHabit[]): IHabit {
    let res: IHabit;
    let lowestValue: number;
    habits.forEach((habit) => {
        if (habit.value < lowestValue || lowestValue === undefined) {
            res = habit;
            lowestValue = habit.value;
        }
    });
    return res;
}

export function getHighestValueHabit(habits: IHabit[]): IHabit {
    let res: IHabit;
    let highestValue: number;
    habits.forEach((habit) => {
        if (habit.value > highestValue || highestValue === undefined) {
            res = habit;
            highestValue = habit.value;
        }
    });
    return res;
}