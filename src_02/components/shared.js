export function setValue(id, newValue) {
    const obj = document.getElementById(id);
    obj.value = newValue;
}

export function clearValues(fieldMap) {
    //https://stackoverflow.com/questions/9329446/loop-for-each-over-an-array-in-javascript
    for (const field of fieldMap) {
        setValue(field.ui, null);
    }
}

export function setValues(fieldMap, obj) {
    for (const field of fieldMap) {
        if (field.model) {
            setValue(field.ui, obj[field.model]);
        }
    }
}