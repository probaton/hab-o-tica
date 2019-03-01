const credentials = require("../../secret/credentials").credentials;

export function getHabReqOpts(method: "post" | "get", apiSuffix: string, body?: any) {
    return {
        method: method.toUpperCase(),
        json: true,
        url: "https://habitica.com" + apiSuffix,
        body: body,
        headers: {
            "x-api-user": credentials.habId,
            "x-api-key": credentials.habToken
        },
        strictSSL: false,
    };
}

export function callHabApi(options: any, suffix?: string, onEnd?: (data?: any) => void): Promise<string> {
    return fetch(`https://habitica.com${suffix}`, options).then(response => response.json());
}
