import React from 'react';

export default function useOpen(args) {
    const [states, setStates] = React.useState({});
    const [current, setCurrent] = React.useState(null);

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
        return states[name];
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
        show: show,
        hide: hide,
        current: current,
    }
}