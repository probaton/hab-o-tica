import { getHabReqOpts, callHabApi } from "../requests/HabiticaRequest";

function newToDo(message: string) {
    const body = {
        text: message, 
        type: "todo",
        priority: "1.5",
    }
    const toDoOpts = getHabReqOpts("post", "/api/v3/tasks/user", body);
    callHabApi(toDoOpts, () => console.log("Message sent"));
}

const toDoMessage = process.argv[2];
if (!toDoMessage) {
    console.log("No to-do message");
    process.exit(1);
}

newToDo(toDoMessage);
