import React from 'react';
import * as API from '../../api/journalEntryRoute';
import * as SUB from './subscriptionKeys';
import { useJournalEntry as id } from './hookNames';

export default function useJournalEntryRoute(args) {
    const {client
        , useJournalEntry: {get: getJournalEntry, journalEntry}
        , useCalendar: {getResults: updateCalendar}} = args;
    const [journalEntryRoute, setJournalEntryRoute] = React.useState(null);

    async function add(journalEntryRoute) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addJournalEntryRoute, journalEntryRoute, true);
        
        if (isSuccessful)
        {
            await getJournalEntry(journalEntryRoute.journalEntryGuid);
            await updateCalendar();
        }

        return isSuccessful;
    }

    async function update(journalEntryRoute) {
        const {isSuccessful} = await client.callApi(API.updateJournalEntryRoute, journalEntryRoute, true);

        if (isSuccessful) {
            await getJournalEntry(journalEntryRoute.journalEntryGuid);
            await updateCalendar();
        }

        return isSuccessful;
    }

    function get(guid) {
        var jer = journalEntry.routes.find(x => x.journalEntryRouteGuid == guid);
        setJournalEntryRoute(x => jer);
    }

    return {
        journalEntryRoute: journalEntryRoute,
        add: add,
        update: update,
        get: get,
    }
}