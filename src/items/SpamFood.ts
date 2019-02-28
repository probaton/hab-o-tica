import { callHabApi, getHabReqOpts } from "../requests/HabiticaRequest";
import { getUserData } from"../userData/userData";
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
    let likedFoods = [];
    likedFoodTypes.forEach(foodType => {
        likedFoods.push(foodType.likedFood);
        likedFoods.push("Candy_" + foodType.petType);
        likedFoods.push("Cake_" + foodType.petType);
    });
    return likedFoods;
}

function makeFoodCounter(likedFoods: string[], userData: IHabiticaData): string[] {
    const userFood = userData.items.food;
    const foodCount = [];
    likedFoods.forEach(food => {
        for (let i = userFood[food]; i > 0; i--) foodCount.push(food);
    });
    return foodCount;
}   

function spamFood(petId: string, petType: string): void {
    const likedFoods = collectLikedFoods(petType);
    
    function iterate(foodCount: string[]) {
        if (foodCount.length > 0) {
            const feedOpts = getHabReqOpts("post", `/api/v3/user/feed/${petId}-${petType}/${foodCount.pop()}`); 
            callHabApi(feedOpts, () => {
                console.log("Omnomnom")
                iterate(foodCount);
            });
        }
    }

    getUserData(userData => {
        iterate(makeFoodCounter(likedFoods, userData));
    });
}

const petId = process.argv[2];
if (!petId) { 
    console.log("No pet id");
} else {
    const petAttributes = petId.split("-");
    if (petAttributes.length != 2) {
        console.log("Invalid pet id");
    } else {
        spamFood(petAttributes[0], petAttributes[1]);
    }
}
