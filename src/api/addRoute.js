import { API_URL } from './constants';

export default async function addJournalEntry(journalEntry) {
    const response = await fetch(
        API_URL + "journal/route",
        {
            method: "POST",
            body: JSON.stringify(journalEntry),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

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