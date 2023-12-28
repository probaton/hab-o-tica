import { callHabApi } from "../requests/HabiticaRequest";

export function newToDo(text: string): void {
    const body = {
        text,
        type: "todo",
        priority: "1.5",
    };
    callHabApi("/api/v3/tasks/user", "POST", body);
}
