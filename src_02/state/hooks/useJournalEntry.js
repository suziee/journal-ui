import React from 'react';
import * as API from '../../api/journalEntry';
import * as SUB from './subscriptionKeys';
import { useJournalEntry as id } from './hookNames';

export default function useJournalEntry(args) {
    const {client, useCalendar: {year}} = args;
    const [journalEntry, setJournalEntry] = React.useState(null);

    // async function getAll() {
    //     if (year == null) {
    //         setJournlEntries(x => []);
    //         return;
    //     }

    //     const {isSuccessful, json: journalEntries} = await client.callApi(API.getJournalEntries, year, true);
    //     if (isSuccessful) {
    //         journalEntries = journalEntries.map(x => new JournalEntry(x));
    //         setJournalEntries(x => journalEntries);
    //     }
    // }

    async function add(journalEntry) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addJournalEntry, journalEntry, true);
        
        if (isSuccessful)
        {
            journalEntry.guid = guid;
            await getAll();
            setJournalEntry(x => journalEntry);
        }
    }

    async function get(guid) {
        const {isSuccessful, json: journalEntry} = await client.callApi(API.getJournalEntry, guid, true);
        if (isSuccessful) setJournalEntry(x => journalEntry);
    }

    async function update(journalEntry) {
        const {isSuccessful, json: _journalEntry} = await client.callApi(API.updateJournalEntry, journalEntry, true);
        if (isSuccessful) setJournalEntry(x => _journalEntry);
    }

    return {
        journalEntry: journalEntry,
        add: add,
        update: update,
        get: get,
    }
}