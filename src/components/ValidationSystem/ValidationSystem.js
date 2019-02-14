const validationSystem = (rules, value) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if(rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }

    if(rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
    }

    if(rules.number && isValid) {
        isValid = isNaN(value) !== rules.number;
    }

    return isValid;
};

export default validationSystem;