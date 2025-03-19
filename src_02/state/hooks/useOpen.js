import React from 'react';
import * as SUB from './subscriptionKeys';
import * as COMP from './componentNames';
import { useOpen as id } from './hookNames';

export default function useOpen(args) {
    const {messenger} = args;
    const [states, setStates] = React.useState({});
    const [current, setCurrent] = React.useState(null);

    register_subscriptions(messenger, show, hide);

    function show(name) {
        let newStates = {
            ...states,
            [name]: true,
        };

        // don't want to add null current to states
        if (current) {
            newStates = {
                ...newStates,
                [current]: false,
            };
        }

        setStates(x => newStates);
        setCurrent(x => name);
    }

    function get(name) {
        // Even though setStates comes before setCurrent, there were issues after
        // updating the calendar. The states matched up when you clicked on a CalendarResult,
        // but when you clicked on a grid <td>, the state for JOURNAL_ENTRY_PAGE was false even
        // though current was JOURNAL_ENTRY_PAGE. Solution: name === current
        // This seems kind of hacky, because so far nothing else needs it. After this code was
        // added, the states matched up again. Not sure what the deal is, or what react does
        // behind the scenes.
        return name === current || states[name];
    }

    function hide(name) {
        let newStates = {
            ...states,
            [name]: false,
        };

        // this order is important b/c components check for "current" change, and then uses
        // states to get their open flag. could risk getting an old open flag if you set current
        // first
        setStates(x => newStates);
        setCurrent(x => null);
    }

    return {
        get: get,
        current: current,
    }
}

function register_subscriptions(messenger, show, hide) {
    messenger.subscribe(id, {
        [SUB.SHOW_AREA]: () => show(COMP.AREA_PAGE),
        [SUB.ADD_AREA]: () => show(COMP.ADD_AREA_FORM),
        [SUB.ADDED_AREA]: () => show(COMP.AREA_PAGE),
        [SUB.CANCEL_ADD_AREA]: () => hide(COMP.ADD_AREA_FORM),
        [SUB.UPDATE_AREA]: () => show(COMP.EDIT_AREA_FORM),
        [SUB.CANCEL_UPDATE_AREA]: () => show(COMP.AREA_PAGE),
        [SUB.UPDATED_AREA]: () => show(COMP.AREA_PAGE),
        [SUB.DELETED_AREA]: () => hide(COMP.AREA_PAGE),

        [SUB.SHOW_CRAG]: () => show(COMP.CRAG_PAGE),
        [SUB.ADD_CRAG]: () => show(COMP.ADD_CRAG_FORM),
        [SUB.ADDED_CRAG]: () => show(COMP.CRAG_PAGE),
        [SUB.CANCEL_ADD_CRAG]: () => show(COMP.AREA_PAGE),
        [SUB.UPDATE_CRAG]: () => show(COMP.EDIT_CRAG_FORM),
        [SUB.CANCEL_UPDATE_CRAG]: () => show(COMP.CRAG_PAGE),
        [SUB.UPDATED_CRAG]: () => show(COMP.CRAG_PAGE),
        [SUB.DELETED_CRAG]: () => hide(COMP.CRAG_PAGE),

        [SUB.SHOW_ROUTE]: () => show(COMP.ROUTE_PAGE),
        [SUB.ADD_ROUTE]: () => show(COMP.ADD_ROUTE_FORM),
        [SUB.ADDED_ROUTE]: () => show(COMP.ROUTE_PAGE),
        [SUB.CANCEL_ADD_ROUTE]: () => show(COMP.CRAG_PAGE),
        [SUB.UPDATE_ROUTE]: () => show(COMP.EDIT_ROUTE_FORM),
        [SUB.CANCEL_UPDATE_ROUTE]: () => show(COMP.ROUTE_PAGE),
        [SUB.UPDATED_ROUTE]: () => show(COMP.ROUTE_PAGE),
        [SUB.DELETED_ROUTE]: () => hide(COMP.ROUTE_PAGE),

        [SUB.SHOW_JOURNAL_ENTRY]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.ADD_JOURNAL_ENTRY]: () => show(COMP.ADD_JOURNAL_ENTRY_FORM),
        [SUB.ADDED_JOURNAL_ENTRY]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.CANCEL_ADD_JOURNAL_ENTRY]: () => show(COMP.CALENDAR_PAGE),
        [SUB.UPDATE_JOURNAL_ENTRY]: () => show(COMP.EDIT_JOURNAL_ENTRY_FORM),
        [SUB.CANCEL_UPDATE_JOURNAL_ENTRY]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.UPDATED_JOURNAL_ENTRY]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.DELETED_JOURNAL_ENTRY]: () => show(COMP.CALENDAR_PAGE), // technically could have come from route page, but most likely from calendar page

        [SUB.ADD_JOURNAL_ENTRY_ROUTE]: () => show(COMP.ADD_JOURNAL_ENTRY_ROUTE_FORM),
        [SUB.ADDED_JOURNAL_ENTRY_ROUTE]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.CANCEL_ADD_JOURNAL_ENTRY_ROUTE]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.UPDATE_JOURNAL_ENTRY_ROUTE]: () => show(COMP.EDIT_JOURNAL_ENTRY_ROUTE_FORM),
        [SUB.CANCEL_UPDATE_JOURNAL_ENTRY_ROUTE]: () => show(COMP.JOURNAL_ENTRY_PAGE),
        [SUB.UPDATED_JOURNAL_ENTRY_ROUTE]: () => show(COMP.JOURNAL_ENTRY_PAGE),

        [SUB.SHOW_SEARCH]: () => show(COMP.SEARCH_PAGE),
        [SUB.SHOW_CALENDAR]: () => show(COMP.CALENDAR_PAGE),
    });
}