import * as request from "request";
import { credentials } from "../../secret/credentials";

export function getHabReqOpts(method: "post" | "get", apiSuffix: string, body?: any) {
    return {
        method: method,
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

export function callHabApi(options: any, onEnd?: (data?: any) => void): any {
    request(options, function (err: any, res: any, body: any) {
        if (err) {
          console.error("Request failed: ", err);
          throw err;
        } else if (res.statusCode != 200 && res.statusCode != 201) {
            console.log(`${res.statusCode} ${body["error"]}: ${body["message"]}`);
        } else if (onEnd) {
            onEnd(body);
        }
    });
}
