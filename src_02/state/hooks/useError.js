import React from 'react';
import * as SUB from './subscriptionKeys';
import { useError as id } from './hookNames';

export default function useError(args) {
    const {messenger, openHub, deleteHub} = args;
    const [errors, setErrors] = React.useState([]);
    const [isSuccessful, setIsSuccessful] = React.useState(false);
    const [shows, setShows] = React.useState({});

    function initShow(guid) {
        let _shows = {...shows, [guid]: false};
        setShows(x => _shows);
    }

    function setShow(guid) {
        resetShows();
        let _shows = {...shows, [guid]: true};
        setShows(x => _shows);
    }

    function resetShows() {
        for (let key in shows) {
            shows[key] = false;
        }
    }
    
    messenger.subscribe(id, {
        [SUB.DELETED_JOURNAL_ENTRY_ROUTE]: clearErrors,
    });

    React.useEffect(() => {
        clearErrors();
        setShows(x => {});
    }, [openHub.current]);

    React.useEffect(() => {
        clearErrors();
        resetShows();
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
        initError: initShow,
        showError: setShow,
        shows: shows,
    };
}