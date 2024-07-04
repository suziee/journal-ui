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

    return response.ok;
}