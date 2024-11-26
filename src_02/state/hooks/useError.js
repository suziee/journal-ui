import React from 'react';
import * as SUB from './subscriptionKeys';
import { useError as id } from './hookNames';

export default function useError(args) {
    const {messenger} = args;
    const [errors, setErrors] = React.useState([]);
    const [isSuccessful, setIsSuccessful] = React.useState(false);

    messenger.subscribe(id, {
        [SUB.ADD_AREA]: clearErrors,
        [SUB.UPDATE_AREA]: clearErrors,
        [SUB.ADD_CRAG]: clearErrors,
        [SUB.UPDATE_CRAG]: clearErrors,
        [SUB.ADD_ROUTE]: clearErrors,
        [SUB.UPDATE_ROUTE]: clearErrors,
    });

    function clearErrors() {
        setErrors(x => []);
    }

    async function callApi(func, obj = null, useObj = false) {
        clearErrors(); // kinda redundant here, but necessary for getall and get

        let response;
        if (useObj) {
            response = await func(obj);
        } else {
            response = await func();
        }

        if (!response.isSuccessful) {
            setErrors(x => response.errors);
        }

        setIsSuccessful(x => response.isSuccessful);

        return response;
    }

    return {
        errors: errors,
        callApi: callApi,
        isSuccessful: isSuccessful,
    };
}