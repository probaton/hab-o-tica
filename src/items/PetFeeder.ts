import { callHabApi } from "../requests/HabiticaRequest";
import { IHabiticaData } from "../userData/IHabiticaData";
import { IFood } from "../userData/IHabiticaData";

export interface IPet {
    species: string;
    displayName: string;
    types: string[];
}

export class PetFeeder {
    petData: any;
    mountData: any;
    foodData: IFood;
    petList: IPet[] = [];

    constructor(userData: IHabiticaData) {
        this.petData = userData.items.pets;
        this.mountData = userData.items.mounts;
        this.foodData = userData.items.food;

        for (const petId of Object.keys(this.petData)) {
            if (this.isFeedable(petId)) {
                const pet = this.parsePetId(petId);
                const lastIndex = this.petList.findIndex(p => p.species === pet.species);
                lastIndex > -1
                    ? this.petList[lastIndex].types.push(pet.types[0])
                    : this.petList.push(pet);
            }
        }
    }

    feedPet(species: string, petType: string): Promise<string> {
        const likedFoodTypes = this.mapLikedFoodTypes(petType);
        const servings = this.mapServings(likedFoodTypes);

        return new Promise<string> (async (resolve) => {
            let i = 0;
            while (i < servings.length) {
                const servingType = servings[i];
                await this.callFeedApi(species, petType, servingType!).catch(e => {
                    resolve(e.message === "You already have that mount. Try feeding another pet."
                        ? `Congratulations! Your ${this.parseSpeciesDisplayName(species)} grew into a mount after ${i} feeding${this.s(i)}`
                        : `Feeding failed after ${i} serving${this.s(i)}: \n${e.message}`);
                });
                i++;
            }
            resolve(`Fed ${species} ${i} time${this.s(i)}`);
        });
    }

    private mapLikedFoodTypes(petType: string): string[] {
        const petToFoodMap = [
            { petType: "Base", likedFood: "Meat" },
            { petType: "White", likedFood: "Milk" },
            { petType: "Desert", likedFood: "Potatoe" },
            { petType: "Red", likedFood: "Strawberry" },
            { petType: "Shade", likedFood: "Chocolate" },
            { petType: "Skeleton", likedFood: "Fish" },
            { petType: "Zombie", likedFood: "RottenMeat" },
            { petType: "CottonCandyPink", likedFood: "CottonCandyPink" },
            { petType: "CottonCandyBlue", likedFood: "CottonCandyBlue" },
            { petType: "Golden", likedFood: "Honey" },
        ];

        const petFoodMatch = petToFoodMap.find(foodType => foodType.petType === petType);
        const petFoodMatches = petFoodMatch ? [petFoodMatch] : petToFoodMap;
        const likedFoodTypes: string[] = [];
        petFoodMatches.forEach(foodType => {
            likedFoodTypes.push(foodType.likedFood);
            likedFoodTypes.push("Candy_" + foodType.petType);
            likedFoodTypes.push("Cake_" + foodType.petType);
        });
        return likedFoodTypes;
    }

    private mapServings(likedFoodTypes: string[]): string[] {
        const servings: string[] = [];
        likedFoodTypes.forEach(food => {
            for (let i = (this.foodData as any)[food]; i > 0; i--) servings.push(food);
        });
        return servings;
    }

    private callFeedApi(species: string, type: string, food: string): Promise<any> {
        return callHabApi(`/api/v3/user/feed/${species}-${type}/${food}`, "POST");
    }

    private s(i: number): "s" | "" {
        return i === 1 ? "" : "s";
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
        const species = petValues[0];
        const displayName = this.parseSpeciesDisplayName(species);
        return { species, types: [petValues[1]], displayName };
    }

    private parseSpeciesDisplayName(species: string): string {
        return species.substr(0, 1) + species.substr(1).replace(/([A-Z])/g, " $1");
    }
}
