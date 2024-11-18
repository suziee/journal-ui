export async function getToDo() {
    const response = await fetch(API_URL + `route/todo`);
    const data = await response.json();
    return data;
}

export async function addToDo(guid) {
    const response = await fetch(
        API_URL + `route/todo/${guid}`,
        {
            method: "POST",
        });

    return await build(response);
}