export const API_URL = "http://localhost:5185/";

export async function build(response) {
    // used to clone and json, but...
    //https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise-but-not-when-it-passes-through-then
    const text = await response.text();

    // don't know the least hacky way to check if a string is json
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        json = null;
    }

    let errors = [];
    if (!response.ok) {
        if (json != null && json.errors) {
            const values = Object.values(json.errors);
            errors = [...errors, ...values.flat()];
        } else { 
            errors = [...errors, text];
        }
    }

    return {
        isSuccessful: response.ok,
        json: json,
        errors: errors,
    };
}