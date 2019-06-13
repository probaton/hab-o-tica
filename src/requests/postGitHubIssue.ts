export async function postGitHubIssue(title: string, description: string): Promise<string> {
    const headers: any = {
        "Authorization": `Token ${require("../../secret/gitHubToken").gitHubToken}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    };
    const body: any = {
        title: `[NEW] ${title}`,
        body: description,
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };

    const response = await fetch("https://api.github.com/repos/probaton/habotica/issues", options);
    if (!response.ok) {
        return "Something went wrong while submitting your issue:\n" + (await response.json()).message;
    }
    return "Issue reported. You can track your issue here:\nhttps://github.com/probaton/habotica/issues";
}
