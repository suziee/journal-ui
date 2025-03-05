import { API_URL, build } from './shared';

export async function getByKeyword(keyword) {
    const response = await fetch(API_URL + `route/keyword/${keyword}`);
    const data = await response.json();
    return data;
}

export async function getRoute(guid) {
    const response = await fetch(API_URL + `route/${guid}`);
    return await build(response);
}

export async function addRoute(route) {
    const response = await fetch(
        API_URL + "route",
        {
            method: "POST",
            body: JSON.stringify(route),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function updateRoute(route) {
    const response = await fetch(
        API_URL + "route",
        {
            method: "PUT",
            body: JSON.stringify(route),
            headers: {
                "content-type": "application/json; charset=UTF-8",
            }
        });

    return await build(response);
}

export async function getRoutes() {
    const response = await fetch(API_URL + `route`);
    return await build(response);
}

export async function deleteRoute(guid) {
    const response = await fetch(
        API_URL + `route/${guid}`,
        {
            method: "DELETE"
        });

    return await build(response);
}