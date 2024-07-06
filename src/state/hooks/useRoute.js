import React from 'react';
import * as SUB from './subscriptionKeys';
import { useRoute as id } from './hookNames';
import { getByRoute } from '../../api';
import { Route } from '../../models';

export default function useRoute(args) {
    const { messenger } = args;

    messenger.subscribe(id, {
        [SUB.SHOW_ROUTE]: show,
        [SUB.HIDE_ROUTE]: hide,
        // [SUB.REFRESH_ROUTE]: getByRouteEntries, // doesn't work b/c selectedRoute is null
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
        setSelectedRoute(x => new Route(route));
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
        updateRoute: update,
        selectedRoute: selectedRoute,
        journalEntries: journalEntries,
        open: open,
    };
}