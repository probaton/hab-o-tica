import { callHabApi } from "../requests/HabiticaRequest";
import IHabiticaData from "../userData/IHabiticaData";
import { initializeServingsPerType, PetType, ServingsPerType, ISpeciesMap, IPetTypeMap } from "./servingsHelpers";
import { UnfeedablePets } from "./UnfeedablePets";

export class PetFeeder {
    petData: any;
    mountData: any;
    servingsPerType: ServingsPerType;
    speciesList: ISpeciesMap[] = [];
    petTypeList: IPetTypeMap[] = [];

    constructor(userData: IHabiticaData) {
        this.petData = userData.items.pets;
        this.mountData = userData.items.mounts;
        this.servingsPerType = initializeServingsPerType();

        for (const petId of Object.keys(this.petData)) {
            if (this.isFeedable(petId)) {
                const petValues = petId.split("-");
                const species = petValues[0];
                const petType = petValues[1];

                const lastSpeciesIndex = this.speciesList.findIndex(p => p.name === species);
                if (lastSpeciesIndex > -1) {
                    this.speciesList[lastSpeciesIndex].types.push(petType);
                } else {
                    const displayName = this.parseDisplayName(species);
                    this.speciesList.push({ name: species, types: [petType], displayName });
                }

                const lastPetTypeIndex = this.petTypeList.findIndex(p => p.name === petType);
                if (lastPetTypeIndex > -1) {
                    this.petTypeList[lastPetTypeIndex].species.push(species);
                } else {
                    const displayName = this.parseDisplayName(petType);
                    this.petTypeList.push({ name: petType, species: [species], displayName });
                }
            }
        }

        this.mapServingsPerType(userData.items.food);
    }

    feedPet(species: string, petType: PetType): Promise<string> {
        const servings = this.servingsPerType[petType];

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
                        ? `Congratulations! Your ${this.parseDisplayName(species)} grew into a mount after ${i} feeding${this.s(i)}`
                        : `Feeding failed after ${i} serving${this.s(i)}: \n${e.message}`);
                    run = false;
                });
                i++;
            }
            resolve(`Fed ${species} ${i} time${this.s(i)}`);
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
        }
    }

    private s(i: number): "s" | "" {
        return i === 1 ? "" : "s";
    }

    private isFeedable(petId: string): boolean {
        const petNr = this.petData[petId];
        if (petNr === -1) {
            return false;
        } else if (UnfeedablePets.indexOf(petId) > -1) {
            return false;
        } else if (petNr === 5) {
            return !this.mountData.hasOwnProperty(petId);
        } else {
            return true;
        }
    }

    private parseDisplayName(species: string): string {
        return species.substr(0, 1) + species.substr(1).replace(/([A-Z])/g, " $1");
    }
}
