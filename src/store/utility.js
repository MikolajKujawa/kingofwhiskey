export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    };
};

export const returnError = (oldState, error) => {
    console.log(error);
    return {
        ...oldState,
        loading: false
    };
};
