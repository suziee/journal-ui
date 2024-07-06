export function validate(year) {
    let regex = new RegExp(/^\d{4}$/g);

    if (regex.test(year)) {
        return { isValid: true };
    }

    return {
        isValid: false,
        error: `${year} is not valid. The input should be a 4-digit year.`
    }
}