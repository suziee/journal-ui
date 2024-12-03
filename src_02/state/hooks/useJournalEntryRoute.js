import React from 'react';
import * as API from '../../api/journalEntryRoute';
import * as SUB from './subscriptionKeys';
import { useJournalEntry as id } from './hookNames';

export default function useJournalEntryRoute(args) {
    const {client
        , useJournalEntry: {get: getJournalEntry, journalEntry}
        , useFormBase
        , messenger} = args;
    const [journalEntryRoute, setJournalEntryRoute] = React.useState(null);

    messenger.subscribe(id, {
        [SUB.ADD_JOURNAL_ENTRY_ROUTE]: useFormBase.initAddForm,
        [SUB.UPDATE_JOURNAL_ENTRY_ROUTE]: useFormBase.initUpdateForm,
    });

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

    function get(guid) {
        var jer = journalEntry.routes.find(x => x.journalEntryRouteGuid == guid);
        console.log(jer);
        setJournalEntryRoute(x => jer);
    }

    return {
        journalEntryRoute: journalEntryRoute,
        add: add,
        update: update,
        get: get,
        isAdd: useFormBase.isAddForm,
    }
}