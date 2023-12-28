import { IGearSet, IHair } from "../userData/IHabiticaData";

export default interface IOutfit {
    name: string;
    gearSet: IGearSet;
    skin?: string;
    hair?: IHair;
    background?: string;
    pet?: string;
    mount?: string;
}
