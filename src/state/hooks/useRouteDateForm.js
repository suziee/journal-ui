import React from 'react';
import * as SUB from './subscriptionKeys';
import { useKeyword as id } from './hookNames';
import { addDate } from '../../api';

export default function useRouteDateForm(args) {
    const {messenger} = args;

    messenger.subscribe(id, {
        [SUB.SHOW_DATE_FORM]: show,
        [SUB.HIDE_DATE_FORM]: hide,
    });

    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = React.useState([]);

    function show() {
        setOpen(x => true);
    }

    function hide() {
        clearErrors();
        setOpen(x => false);
    }

    async function save(obj) {
        clearErrors();

        const response = await addDate(obj);
        
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
        errors: errors
    };
}