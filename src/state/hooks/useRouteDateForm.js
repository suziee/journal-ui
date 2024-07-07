import React from 'react';
import * as SUB from './subscriptionKeys';
import { useRouteDateForm as id } from './hookNames';
import { addDate } from '../../api';

export default function useRouteDateForm(args) {
    const {messenger, useRoute} = args;

    messenger.subscribe(id, {
        [SUB.SHOW_DATE_FORM]: show,
        [SUB.HIDE_DATE_FORM]: hide,
        [SUB.ADD_JOURNAL_ENTRY]: asAddForm,
        [SUB.UPDATE_JOURNAL_ENTRY]: asUpdateForm,
    });

    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const [isAdd, setIsAdd] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);

    function show() {
        setOpen(x => true);
    }

    function hide() {
        clearErrors();
        useRoute.updateJournalEntry(null);
        setOpen(x => false);
    }

    function asAddForm() {
        setIsAdd(x => true);
        setIsUpdate(x => false);
    }

    function asUpdateForm() {
        setIsUpdate(x => true);
        setIsAdd(x => false);
    }

    async function save(obj) {
        clearErrors();

        let response;
        if (isAdd) {
            response = await addDate(obj);
        } else if (isUpdate) {
            console.log("update")
        } else {
            console.log("invalid save flow")
        }
        
        if (response.isSuccessful) {
            useRoute.updateRoute(obj);
        } else {
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