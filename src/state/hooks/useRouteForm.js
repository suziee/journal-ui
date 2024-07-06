import React from 'react';
import * as SUB from './subscriptionKeys';
import { useKeyword as id } from './hookNames';
import { addRoute } from '../../api';

export default function useRouteForm(args) {
    const {messenger} = args;

    messenger.subscribe(id, {
        [SUB.SHOW_ROUTE_FORM]: show,
        [SUB.HIDE_ROUTE_FORM]: hide,
    });

    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = React.useState([]);

    function show() {
        // broadcast does not work here, but it works in the component (RouteListContainer >> add event)
        // ended up having to move all the broadcast messages from hooks to components
        // messenger.broadcast(SUB.HIDE_DATE_FORM);
        // messenger.broadcast(SUB.HIDE_ROUTE);
        setOpen(x => true);
    }

    function hide() {
        clearErrors();
        setOpen(x => false);
    }

    async function save(obj) {
        clearErrors();

        const response = await addRoute(obj);
        
        if (!response.isSuccessful) {
            if (response.json != null && response.json.errors) {
                const values = Object.values(response.json.errors);
                setErrors(x => [...x, ...values.flat()]);
            } else {
                setErrors(x => [...x, response.text]);
            }
        }

        return response.isSuccessful;
    }

    function clearErrors() {
        setErrors(x => []);
    }

    return {
        open: open,
        closeForm: hide,
        saveJournalEntry: save,
        errors: errors,
    };
}