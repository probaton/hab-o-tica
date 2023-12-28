import { s, spacify } from "../helpers/stringUtils";
import { initializeServingsPerType, PetType, ServingsPerType } from "./servingsHelpers";

import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import { UnfeedablePets } from "./UnfeedablePets";

export default class PetFeeder {
    petData: string[];
    mountData: any;
    servingsPerType: ServingsPerType;
    speciesList: string[] = [];
    petTypeList: string[] = [];

    constructor(userData: IHabiticaData) {
        this.petData = [];
        this.mountData = userData.items.mounts;
        this.servingsPerType = initializeServingsPerType();

        for (const petId of Object.keys(userData.items.pets)) {
            if (this.isFeedable(petId, userData.items.pets)) {
                this.petData.push(petId);
                const petValues = petId.split("-");

                const species = petValues[0];
                if (this.speciesList.indexOf(species) === -1) {
                    this.speciesList.push(species);
                }

                const petType = petValues[1];
                if (this.petTypeList.indexOf(petType) === -1) {
                    this.petTypeList.push(petType);
                }
            }
        }

        this.mapServingsPerType(userData.items.food);
    }

    feedPet(species: string, petType: PetType): Promise<string> {
        const servings = this.servingsPerType[petType] || this.servingsPerType.Other;

        if (servings.length === 0) {
            return new Promise<string>(resolve => { resolve(`You don't have any food suitable for ${petType} pets.`); });
        }

        return new Promise<string> (async (resolve) => {
            let i = 0;
            let run = true;
            while (i < servings.length && run) {
                const servingType = servings[i];
                await this.callFeedApi(species, petType, servingType!).catch(e => {
                    resolve(e.message === "You already have that mount. Try feeding another pet."
                        ? `Congratulations! Your ${spacify(species)} grew into a mount after ${i} feeding${s(i)}`
                        : `Feeding failed after ${i} serving${s(i)}: \n${e.message}`);
                    run = false;
                });
                i++;
            }
            resolve(`Fed ${species} ${i} time${s(i)}`);
        });
    }

    private callFeedApi(species: string, type: string, food: string): Promise<any> {
        return callHabApi(`/api/v3/user/feed/${species}-${type}/${food}`, "POST");
    }

    private mapServingsPerType(larder: any): void {
        Object.keys(larder).forEach((foodType: string) => {
            if (foodType === "Meat" || foodType.endsWith("Base")) {
                this.convertFoodTypeToServings("Base", foodType, larder);
            } else if (foodType === "Milk" || foodType.endsWith("White")) {
                this.convertFoodTypeToServings("White", foodType, larder);
            } else if (foodType === "Potatoe" || foodType.endsWith("Desert")) {
                this.convertFoodTypeToServings("Desert", foodType, larder);
            } else if (foodType === "Strawberry" || foodType.endsWith("Red")) {
                this.convertFoodTypeToServings("Red", foodType, larder);
            } else if (foodType === "Chocolate" || foodType.endsWith("Shade")) {
                this.convertFoodTypeToServings("Shade", foodType, larder);
            } else if (foodType === "Fish" || foodType.endsWith("Skeleton")) {
                this.convertFoodTypeToServings("Skeleton", foodType, larder);
            } else if (foodType === "RottenMeat" || foodType.endsWith("Zombie")) {
                this.convertFoodTypeToServings("Zombie", foodType, larder);
            } else if (foodType === "CottonCandyPink" || foodType.endsWith("CottonCandyPink")) {
                this.convertFoodTypeToServings("CottonCandyPink", foodType, larder);
            } else if (foodType === "CottonCandyBlue" || foodType.endsWith("CottonCandyBlue")) {
                this.convertFoodTypeToServings("CottonCandyBlue", foodType, larder);
            } else if (foodType === "Honey" || foodType.endsWith("Golden")) {
                this.convertFoodTypeToServings("Golden", foodType, larder);
            }
        });
    }

    private convertFoodTypeToServings(petType: PetType, foodType: string, larder: any) {
        for (let i = larder[foodType]; i > 0; i--) {
            this.servingsPerType[petType].push(foodType);
            this.servingsPerType.Other.push(foodType);
        }
    }

    private isFeedable(petId: string, rawPetData: any): boolean {
        const petValue = rawPetData[petId];
        if (petValue === -1 || UnfeedablePets.indexOf(petId) > -1) {
            return false;
        } else if (petValue === 5) {
            // Returns undefined for pets without a mount, true for pets with one, and null for mounts set free with a kennel key.
            const matchingMount = this.mountData[petId];
            return !matchingMount;
        } else {
            return true;
        }
    }
}
