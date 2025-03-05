import { API_URL, build } from './shared';

export async function addCrag(crag) {
    const response = await fetch(
        API_URL + "crag",
        {
            method: "POST",
            body: JSON.stringify(crag),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function updateCrag(crag) {
    const response = await fetch(
        API_URL + "crag",
        {
            method: "PUT",
            body: JSON.stringify(crag),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function getCrag(guid) {
    const response = await fetch(API_URL + `crag/${guid}`);
    return await build(response);
}

export async function getCrags() {
    const response = await fetch(API_URL + `crag`);
    return await build(response);
}

export async function deleteCrag(guid) {
    const response = await fetch(
        API_URL + `crag/${guid}`,
        {
            method: "DELETE"
        });

    return await build(response);
}