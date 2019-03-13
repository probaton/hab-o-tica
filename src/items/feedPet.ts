import { callHabApi } from "../requests/HabiticaRequest";
import { IHabiticaData } from "../userData/IHabiticaData";
import { getUserData } from "../userData/userData";

export interface IPet {
    species: string;
    types: string[];
}

export async function getPetList(): Promise<IPet[]> {
    const rawPets = (await getUserData()).items.pets;
    const petList: IPet[] = [];

    for (const rawPet of Object.keys(rawPets)) {
        const pet = parseRawPet(rawPet);
        const lastIndex = petList.findIndex(p => p.species === pet.species);
        lastIndex > -1
            ? petList[lastIndex].types.push(pet.types[0])
            : petList.push(pet);
    }

    return petList;
}

function parseRawPet(rawPet: string): IPet {
    const petValues = rawPet.split("-");
    return { species: petValues[0], types: [petValues[1]] };
}

function collectLikedFoods(petType: string): string[] {
    const foodTypes = [
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

    const foodMatch = foodTypes.find(foodType => foodType.petType === petType);
    const likedFoodTypes = foodMatch ? [foodMatch] : foodTypes;
    const likedFoods: string[] = [];
    likedFoodTypes.forEach(foodType => {
        likedFoods.push(foodType.likedFood);
        likedFoods.push("Candy_" + foodType.petType);
        likedFoods.push("Cake_" + foodType.petType);
    });
    return likedFoods;
}

function makeFoodCounter(likedFoods: string[], userData: IHabiticaData): string[] {
    const userFood = (userData.items.food) as any;
    const foodCount: string[] = [];
    likedFoods.forEach(food => {
        for (let i = userFood[food]; i > 0; i--) foodCount.push(food);
    });
    return foodCount;
}

function callFeedApi(species: string, type: string, food: string): Promise<any> {
    return callHabApi(`/api/v3/user/feed/${species}-${type}/${food}`, "POST");
}

export function feedPet(species: string, type: string): Promise<any> {
    const likedFoods = collectLikedFoods(type);
    return callFeedApi(species, type, "cookies");
}
