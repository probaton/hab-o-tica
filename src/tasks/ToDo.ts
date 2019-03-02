import { callHabApi } from "../requests/HabiticaRequest";

export function newToDo(message: string) {
    const body = {
        text: message, 
        type: "todo",
        priority: "1.5",
    }
    callHabApi("/api/v3/tasks/user", "POST", body);
}
