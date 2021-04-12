export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules !== undefined && rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules !== undefined &&rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules !== undefined &&rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules !== undefined && rules.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
    }
    if (rules !== undefined && rules.isNumeric) {
        const pattern = /^[0-9]*$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
};
