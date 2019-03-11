/* tslint:disable */


// const credentials = {
//     "habId": "6d7d6651-604d-4e7c-adff-a040770a6768",
//     "habToken": "1017eb7e-d662-4b12-ba8f-9ab9ab09ca59"
// }

// async function subDoIt(): Promise<string> {
//     return new Promise(resolve => {
//         // throw new Error("Blarble");
//         resolve("hoops");
//     });
// }

// async function doIt(): Promise<string> {
//     return subDoIt().then(thing => {
//         return "cookies";
//     });
// }

// doIt()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(e => { console.log(">>>> error!", e); });


const thing = {
    cookies: "blarp",
    hooples: "shoomz",
    moreThing: {
        moreCookies: "dacks",
        moreHooples: "narps",
    }
};

console.log({...thing.moreThing});