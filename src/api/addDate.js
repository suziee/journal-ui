import { API_URL } from './constants';

export default async function addJournalEntry(journalEntry) {
    const response = await fetch(
        API_URL + "journal/date",
        {
            method: "POST",
            body: JSON.stringify(journalEntry),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

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

    return {
        isSuccessful: response.ok,
        text: text,
        json: json,
    };
}