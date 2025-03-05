import { API_URL, build } from './shared';

export async function addJournalEntry(journalEntry) {
    const response = await fetch(
        API_URL + "journal/entry",
        {
            method: "POST",
            body: JSON.stringify(journalEntry),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function updateJournalEntry(journalEntry) {
    const response = await fetch(
        API_URL + "journal/entry",
        {
            method: "PUT",
            body: JSON.stringify(journalEntry),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function getJournalEntry(guid) {
    const response = await fetch(API_URL + `journal/entry/${guid}`);
    return await build(response);
}

export async function getByYear(year) {
    const response = await fetch(API_URL + `journal/${year}`);
    const data = await response.json();
    return data;
}

export async function deleteJournalEntry(guid) {
    const response = await fetch(
        API_URL + `journal/entry/${guid}`,
        {
            method: "DELETE"
        });

    return await build(response);
}