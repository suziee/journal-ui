import { API_URL, build } from './shared';

export async function addArea(area) {
    const response = await fetch(
        API_URL + "area",
        {
            method: "POST",
            body: JSON.stringify(area),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function updateArea(area) {
    const response = await fetch(
        API_URL + "area",
        {
            method: "PUT",
            body: JSON.stringify(area),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function getArea(guid) {
    const response = await fetch(API_URL + `area/${guid}`);
    return await build(response);
}

export async function getAreas() {
    const response = await fetch(API_URL + `area`);
    return await build(response);
}