import { API_URL } from './constants';

export default async function getByRoute(guid) {
    const response = await fetch(API_URL + `journal/getbyroute/${guid}`);
    const data = await response.json();
    return data;
}