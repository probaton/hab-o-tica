import { getUserData } from "../userData/userData";

export async function listItems(itemType: string): Promise<any> {
    const userData = await getUserData();
    return (userData.items as any)[itemType];
}
