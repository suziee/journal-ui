import React from 'react';
import * as SUB from './subscriptionKeys';
import { useRoute as id } from './hookNames';
import { getByRoute } from '../../api';
import { JournalEntry, Route } from '../../models';

export default function useRoute(args) {
    const { messenger } = args;

    messenger.subscribe(id, {
        [SUB.SHOW_ROUTE]: show,
        [SUB.HIDE_ROUTE]: hide,
        // [SUB.REFRESH_ROUTE]: getByRouteEntries, // doesn't work b/c selectedRoute is null
    });

    const [open, setOpen] = React.useState(false);
    const [selectedRoute, setRoute] = React.useState(null);
    const [journalEntries, setJournalEntries] = React.useState([]);
    const [selectedJournalEntry, setJournalEntry] = React.useState(null);

    function show() {
        setOpen(x => true);
    }

    function hide() {
        setOpen(x => false);
    }

    function updateRoute(route) {
        if (route == null) {
            setRoute(x => null);
        } else {
            setRoute(x => new Route(route));
        }
    }

    function updateJournalEntry(journalEntry) {
        if (journalEntry == null) {
            setJournalEntry(x => null);
        } else {
            setJournalEntry(x => new JournalEntry(journalEntry));
        }
    }

    React.useEffect(() => {
        if (selectedRoute == null) return;
        getByRouteEntries();
        show();
    }, [selectedRoute]);

    async function getByRouteEntries() {
        let journalEntries = await getByRoute(selectedRoute.routeGuid);
        setJournalEntries(x => journalEntries);
    }

    return {
        updateRoute: updateRoute,
        selectedRoute: selectedRoute,
        journalEntries: journalEntries,
        open: open,
        updateJournalEntry: updateJournalEntry,
        selectedJournalEntry: selectedJournalEntry,
    };
}