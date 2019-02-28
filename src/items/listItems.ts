import { getUserData } from "../userData/userData";

const itemType = process.argv[2];
if (!itemType) {
    console.log("Specify an item type");
} else {
    getUserData(userData => console.log(userData.items[itemType] || `No results for item type ${itemType}`));
}
