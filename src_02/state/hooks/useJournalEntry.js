import React from 'react';
import * as API from '../../api/journalEntry';
import * as SUB from './subscriptionKeys';
import { useJournalEntry as id } from './hookNames';

export default function useJournalEntry(args) {
    const {client, useCalendar: {getResults: updateCalendar}} = args;
    const [journalEntry, setJournalEntry] = React.useState(null);

    async function add(journalEntry) {
        const {isSuccessful, json: _journalEntry} = await client.callApi(API.addJournalEntry, journalEntry, true);
        
        if (isSuccessful)
        {
            await updateCalendar();
            setJournalEntry(x => _journalEntry);
        }

        return isSuccessful;
    }

    async function get(guid) {
        const {isSuccessful, json: journalEntry} = await client.callApi(API.getJournalEntry, guid, true);
        if (isSuccessful) setJournalEntry(x => journalEntry);
        return isSuccessful;
    }

    async function update(journalEntry) {
        const {isSuccessful, json: _journalEntry} = await client.callApi(API.updateJournalEntry, journalEntry, true);
        
        if (isSuccessful) {
            setJournalEntry(x => _journalEntry);
            await updateCalendar();
        }
        
        return isSuccessful;
    }

    async function duhlete(guid) {
        const {isSuccessful} = await client.callApi(API.deleteJournalEntry, guid, true);

        if (isSuccessful) {
            setJournalEntry(x => null);
            await updateCalendar();
        }

        return isSuccessful;
    }

    return {
        journalEntry: journalEntry,
        add: add,
        update: update,
        get: get,
        delete: duhlete,
    }
}