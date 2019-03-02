import { callHabApi } from "../requests/HabiticaRequest";
import { IHabiticaData } from "../userData/IHabiticaData";

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
    ]

    const foodMatch = foodTypes.find(foodType => foodType.petType == petType);
    const likedFoodTypes = foodMatch ? [foodMatch] : foodTypes;
    let likedFoods: string[] = [];
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

function spamFood(petId: string, petType: string): void {
    const likedFoods = collectLikedFoods(petType);
    
    function iterate(foodCount: string[]) {
        if (foodCount.length > 0) {
            callHabApi(`/api/v3/user/feed/${petId}-${petType}/${foodCount.pop()}`, "POST"); 
        }
    }
}
