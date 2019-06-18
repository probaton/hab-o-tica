import { IGearSet } from "../userData/IHabiticaData";

export default interface IOutfit {
    name: string;
    gearSet: IGearSet;
    skin?: string;
    background?: string;
    pet?: string;
    mount?: string;
}
