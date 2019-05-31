export default interface IHabiticaData {
    auth: {
        local: {
            username: string;
        };
    };
    stats: {
        per: number;
        int: number;
        con: number;
        str: number;
        points: number;
        class: HabiticaClass;
        lvl: number;
        gp: number;
        exp: number;
        mp: number;
        hp: number;
    };
    flags: {
        armoireEmpty: boolean;
    };
    tasks: {
        habits: IHabit[];
    };
    lastCron: string;
    items: {
        food: any;
        pets: any;
        mounts: any;
    };
}

export type HabiticaClass = "wizard" | "healer" | "warrior" | "rogue";

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
    history: object[][];
    frequency: string;
    counterDown: number;
    counterUp: number;
    down: false;
    up: true;
    id: string;
}
