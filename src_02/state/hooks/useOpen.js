import React from 'react';
import * as COMP from './componentNames';

export default function useOpen(args) {
    const [states, setStates] = React.useState({});
    const [current, setCurrent] = React.useState(null);
    const [lastPage, setLastPage] = React.useState(null);

    function show(name) {
        let newStates = {
            ...states,
            [name]: true,
        };

        if (current) {
            newStates = {
                ...newStates,
                [current]: false,
            };
        }

        if (isForm(name) && current) {
            setLastPage(x => current);
        }

        setStates(x => newStates);
        setCurrent(x => name);
    }

    function get(name) {
        /**
         * Some weird stuff with this console log when the forms had React.useEffect on [useError.isSuccessful]...
         * For some reason only ROUTE_FORM would register at the beginning when you click on SEARCH_PAGE, but not the
         * other forms, even though they all had the same useEffect on isSuccessful. Once you have a failed add, then
         * things get a little weird shortly after, where you'll see "null, null [map]" and then after that you'll see
         * TWO components that are TRUE. In addition to that, you'll also see a [null: false] entry in the map. Oh,
         * just remembered that the null: false entry is when i didn't have the if (current) in show(name). Once i
         * got rid of the useEffect and returned isSuccessful from the api calls, it stopped printing (null, null, map)
        */
        // console.log(lastPage, current, states)

        return states[name];
    }

    function hide(name) {
        let newStates = {
            ...states,
            [name]: false,
        };

        if (isForm(name) && lastPage) {
            newStates = {
                ...newStates,
                [lastPage]: true,
            };
        }

        // this order is important b/c components check for "current" change, and then uses
        // states to get their open flag. could risk getting an old open flag if you set current
        // first. and setLastPage should be last b/c setCurrent uses its value
        setStates(x => newStates);
        setCurrent(x => lastPage ? lastPage : null)
        setLastPage(x => null);
    }

    function isForm(name) {
        return name == COMP.AREA_FORM
        || name == COMP.CRAG_FORM
        || name == COMP.JOURNAL_ENTRY_FORM
        || name == COMP.JOURNAL_ENTRY_ROUTE_FORM
        || name == COMP.ROUTE_FORM;
    }

    return {
        get: get,
        show: show,
        hide: hide,
        current: current,
    }
}