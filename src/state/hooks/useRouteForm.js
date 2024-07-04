import React from 'react';
import * as SUB from './subscriptionKeys';
import { useKeyword as id } from './hookNames';
import { addRoute } from '../../api';

export default function useRouteForm(args) {
    const {messenger} = args;

    messenger.subscribe(id, {
        [SUB.SHOW_ROUTE_FORM]: show,
        [SUB.HIDE_ROUTE_FORM]: hide,
    });

    const [open, setOpen] = React.useState(false);

    function show() {
        // broadcast does not work here, but it works in the component (RouteListContainer >> add event)
        // ended up having to move all the broadcast messages from hooks to components
        // messenger.broadcast(SUB.HIDE_DATE_FORM);
        // messenger.broadcast(SUB.HIDE_ROUTE);
        setOpen(x => true);
    }

    function hide() {
        setOpen(x => false);
    }

    function save(obj) {
        async function postDataAsync() {
            await addRoute(obj);
        }

        postDataAsync();
    }

    return {
        open: open,
        closeForm: hide,
        saveJournalEntry: save,
    };
}