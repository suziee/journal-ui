import React from 'react';
import * as SUB from './subscriptionKeys';
import { useError as id } from './hookNames';

export default function useError(args) {
    const {messenger, openHub, deleteHub} = args;
    const [errors, setErrors] = React.useState([]);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [showErrors, setShowErrors] = React.useState({});

    function initShowError(guid) {
        let _showErrors = {...showErrors, [guid]: false};
        setShowErrors(x => _showErrors);
    }

    function setShowError(guid) {
        resetShowErrors();
        let _showErrors = {...showErrors, [guid]: true};
        setShowErrors(x => _showErrors);
    }

    function resetShowErrors() {
        for (let key in showErrors) {
            showErrors[key] = false;
        }
    }
    
    messenger.subscribe(id, {
        [SUB.DELETED_JOURNAL_ENTRY_ROUTE]: clearErrors,
    });

    React.useEffect(() => {
        clearErrors();
        setShowErrors(x => {});
    }, [openHub.current]);

    React.useEffect(() => {
        clearErrors();
        resetShowErrors();
    }, [deleteHub.locks]);

    function clearErrors() {
        if (errors != null && errors.length != 0) {
            setErrors(x => []);
        }
    }

    async function callApi(func, obj = null, useObj = false) {
        let response;
        if (useObj) {
            response = await func(obj);
        } else {
            response = await func();
        }

        if (!response.isSuccessful) {
            setErrors(response.errors);
        } else {
            clearErrors();
        }

        setIsSuccessful(x => response.isSuccessful);

        return response;
    }

    return {
        errors: errors,
        callApi: callApi,
        isSuccessful: isSuccessful,
        initError: initShowError,
        showError: setShowError,
        showErrors: showErrors,
    };
}