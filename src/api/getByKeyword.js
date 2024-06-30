import { API_URL } from './constants';

export default async function getByKeyword(keyword) {
    const response = await fetch(API_URL + `journal/getbykeyword/${keyword}`);
    const data = await response.json();
    return data;
}