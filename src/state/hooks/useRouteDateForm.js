import React from 'react';
import * as SUB from './subscriptionKeys';
import { useKeyword as id } from './hookNames';
import { addJournalEntry } from '../../api';

export default function useRouteDateForm(args) {
    const {messenger} = args;

    messenger.subscribe(id, {
        [SUB.SHOW_DATE_FORM]: show,
        [SUB.HIDE_DATE_FORM]: hide,
    });

    const [open, setOpen] = React.useState(false);

    function show() {
        setOpen(x => true);
    }

    function hide() {
        setOpen(x => false);
    }

    function save(obj) {
        async function postDataAsync() {
            await addJournalEntry(obj);
        }

        postDataAsync();
    }

    return {
        open: open,
        closeForm: hide,
        saveJournalEntry: save,
    };
}