import React from 'react';
import * as SUB from './subscriptionKeys';
import { useError as id } from './hookNames';

export default function useError(args) {
    const {messenger, openHub, deleteHub} = args;
    const [errors, setErrors] = React.useState([]);
    const [isSuccessful, setIsSuccessful] = React.useState(false);

    messenger.subscribe(id, {
        [SUB.DELETED_JOURNAL_ENTRY_ROUTE]: clearErrors,
    });

    React.useEffect(() => {
        clearErrors();
    }, [openHub.current]);

    React.useEffect(() => {
        clearErrors();
    }, [deleteHub.locks]);

    function clearErrors() {
        if (errors != null && errors.length != 0) {
            setErrors(x => []);
        }
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