export function s(i: number): "s" | "" {
    return i === 1 ? "" : "s";
}

export function spacify(rawString: string) {
    return rawString.substr(0, 1) + rawString.substr(1).replace(/([A-Z])/g, " $1");
}
