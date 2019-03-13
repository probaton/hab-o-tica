import { callHabApi } from "../requests/HabiticaRequest";
import { IHabiticaData } from "../userData/IHabiticaData";
import { getUserData } from "../userData/userData";

interface IPet {
    species: string;
    type: string;
}

export async function getPetList(): Promise<IPet[]> {
    const rawPets = (await getUserData()).items.pets;
    const pets = [];
    for (const pet of Object.keys(rawPets)) {
        const petValues = pet.split("-");
        pets.push({ species: petValues[0], type: petValues[1] });
    }
    return pets;
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
