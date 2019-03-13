import { callHabApi } from "../requests/HabiticaRequest";
import { IFood, IHabiticaData } from "../userData/IHabiticaData";

export function feedPet(species: string, petType: string, food: IFood): Promise<any> {
    const likedFoodTypes = mapLikedFoodTypes(petType);
    const servings = mapServings(likedFoodTypes, food);

    return new Promise<string | undefined> (async (resolve) => {
        let i = 0;
        while (i < servings.length) {
            const servingType = servings[i];
            await callFeedApi(species, petType, servingType!).catch(e => {
                resolve(e.message === "You already have that mount. Try feeding another pet."
                    ? `${species} grew into a mount after ${i} feeding${s(i)}`
                    : `Feeding failed after ${i} serving${s(i)}: \n${e.message}`);
            });
            i++;
        }
        resolve(`Fed ${species} ${i} time${s(i)}`);
    });
}

function mapLikedFoodTypes(petType: string): string[] {
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

function mapServings(likedFoodTypes: string[], availableFood: IFood): string[] {
    const servings: string[] = [];
    likedFoodTypes.forEach(food => {
        for (let i = (availableFood as any)[food]; i > 0; i--) servings.push(food);
    });
    return servings;
}

function callFeedApi(species: string, type: string, food: string): Promise<any> {
    return callHabApi(`/api/v3/user/feed/${species}-${type}/${food}`, "POST");
}

function s(i: number): "s" | "" {
    return i === 1 ? "" : "s";
}
