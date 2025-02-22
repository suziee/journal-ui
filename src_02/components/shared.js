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

export function getValueOrDefault(str) {
    if (str == null) {
        return null;
    }
    
    str = str.trim();
    
    if (str.length == 0) {
        return null;
    }

    return str;
}

export function getControlledValue(str) {
    /**
     * without this method, then doing <input ... value={obj?.val} ... />
     * throws Warning: A component is changing an uncontrolled input to be controlled
     * b/c it could go from undefined to an actual value when obj is not null
     */
    return str ?? "";
}