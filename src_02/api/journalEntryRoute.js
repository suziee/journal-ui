import { API_URL, build } from './shared';

export async function addJournalEntryRoute(jre) {
    const response = await fetch(
        API_URL + "journal/entry/route",
        {
            method: "POST",
            body: JSON.stringify(jre),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function updateJournalEntryRoute(jre) {
    const response = await fetch(
        API_URL + "journal/entry/route",
        {
            method: "PUT",
            body: JSON.stringify(jre),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}