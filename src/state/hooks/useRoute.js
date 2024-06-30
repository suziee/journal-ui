import React from 'react';
import * as SUB from './subscriptionKeys';
import { useCalendar as id } from './hookNames';
import { getByRoute } from '../../api';

export default function useRoute(args) {
    const { messenger } = args;

    messenger.subscribe(id, {
        [SUB.SHOW_ROUTE]: show,
        [SUB.HIDE_ROUTE]: hide,
    });

    const [open, setOpen] = React.useState(false);
    const [selectedRoute, setSelectedRoute] = React.useState(null);
    const [journalEntries, setJournalEntries] = React.useState([]);

    function show() {
        setOpen(x => true);
    }

    function hide() {
        setOpen(x => false);
    }

    function update(route) {
        setSelectedRoute(x => route);
    }

    React.useEffect(() => {
        if (selectedRoute == null) return;
        getByRouteEntries();
        show();
    }, [selectedRoute]);

    function getByRouteEntries() {
        async function getDataAsync() {
            let journalEntries = await getByRoute(selectedRoute.routeGuid);
            setJournalEntries(x => journalEntries);
        }

        getDataAsync();
    }

    return {
        updateRoute: update,
        selectedRoute: selectedRoute,
        journalEntries: journalEntries,
        open: open,
    };
}