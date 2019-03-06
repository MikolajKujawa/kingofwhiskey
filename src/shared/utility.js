import React, {Suspense} from "react";

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

export const dynamicSuspense = (component) => (
    <Suspense fallback={<div>Loading...</div>}>
        { component }
    </Suspense>
);
