import React from 'react';
import * as API from '../../api/journalEntryRoute';

export default function useJournalEntryRoute(args) {
    const {client, useJournalEntry: {get: getJournalEntry}} = args;
    const [journalEntryRoute, setJournalEntryRoute] = React.useState(null);

    async function add(journalEntryRoute) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addJournalEntryRoute, journalEntryRoute, true);
        
        if (isSuccessful)
        {
            // journalEntryRoute.guid = guid;
            // await getAll();
            // setJournalEntryRoute(x => journalEntryRoute);
            await getJournalEntry(journalEntryRoute.JournalEntryGuid);
        }
    }

    async function update(journalEntryRoute) {
        const {isSuccessful, json: _journalEntryRoute} = await client.callApi(API.updateJournalEntryRoute, journalEntryRoute, true);
        if (isSuccessful) setJournalEntryRoute(x => _journalEntryRoute);
    }

    return {
        journalEntryRoute: journalEntryRoute,
        add: add,
        update: update,
    }
}