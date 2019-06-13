export async function postGitHubIssue(title: string, description: string): Promise<string> {
    const headers: any = {
        "Authorization": `Token 2cd2787d636bc78e04caf796e52a66dda3477496`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    };
    const body: any = {
        title,
        body: description,
        labels: ["NEW", "SubmittedFromApp"],
    };
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    };

    try {
        await fetch("https://api.github.com/repos/probaton/habotica/issues", options);
        return "";
    } catch (e) {
        return "Something went wrong while submitting your issue: " + e;
    }
}
