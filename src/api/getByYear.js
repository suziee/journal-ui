import { API_URL } from './constants';

export default async function getByYear(year) {
    const response = await fetch(API_URL + `journal/getbyyear/${year}`);
    const data = await response.json();
    return data;
}