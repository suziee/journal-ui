import React from 'react';

export default function useOpen(args) {
    const [states, setStates] = React.useState({});
    const [current, setCurrent] = React.useState({});

    function show(name) {
        const newStates = {
            ...states,
            [name]: true,
            [current]: false,
        };

        setStates(x => newStates);
        setCurrent(x => name);
    }

    function get(name) {
        return states[name];
    }

    function hide(name) {
        const newStates = {
            ...states,
            [name]: false,
        };

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