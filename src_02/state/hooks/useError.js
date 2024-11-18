import React from 'react';

export default function useError(args) {
    const [errors, setErrors] = React.useState([]);

    async function callApi(func, obj = null, useObj = false) {
        setErrors(x => []);

        let response;
        if (useObj) {
            response = await func(obj);
        } else {
            response = await func();
        }

        if (!response.isSuccessful) {
            setErrors(x => response.errors);
        }

        return response;
    }

    return {
        errors: errors,
        callApi: callApi
    };
}