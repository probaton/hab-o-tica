import { IHabiticaData } from "../userData/IHabiticaData";

export interface IPet {
    species: string;
    types: string[];
}

export class PetParser {
    petData: any;
    mountData: any;

    constructor(userData: IHabiticaData) {
        this.petData = userData.items.pets;
        this.mountData = userData.items.mounts;
    }

    parsePets(): IPet[] {
        const petList: IPet[] = [];
        for (const petId of Object.keys(this.petData)) {
            if (this.isFeedable(petId)) {
                const pet = this.parsePetId(petId);
                const lastIndex = petList.findIndex(p => p.species === pet.species);
                lastIndex > -1
                    ? petList[lastIndex].types.push(pet.types[0])
                    : petList.push(pet);
            }
        }

        return petList;
    }

    private isFeedable(petId: string): boolean {
        const unfeedablePets = [
            "Wolf-Veteran",
            "Wolf-Cerberus",
            "Dragon-Hydra",
            "Turkey-Base",
            "BearCub-Polar",
            "MantisShrimp-Base",
            "JackOLantern-Base",
            "Mammoth-Base",
            "Tiger-Veteran",
            "Phoenix-Base",
            "Turkey-Gilded",
            "MagicalBee-Base",
            "Lion-Veteran",
            "Gryphon-RoyalPurple",
            "JackOLantern-Ghost",
            "Jackalope-RoyalPurple",
            "Orca-Base",
            "Bear-Veteran",
            "Hippogriff-Hopeful",
            "Fox-Veteran",
            "JackOLantern-Glow",
        ];

        const petNr = this.petData[petId];
        if (petNr === -1) {
            return false;
        } else if (unfeedablePets.indexOf(petId) > -1) {
            return false;
        } else if (petNr === 5) {
            return !this.mountData.hasOwnProperty(petId);
        } else {
            return true;
        }
    }

    private parsePetId(rawPet: string): IPet {
        const petValues = rawPet.split("-");
        return { species: petValues[0], types: [petValues[1]] };
    }
}
