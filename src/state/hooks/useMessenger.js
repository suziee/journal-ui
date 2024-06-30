import React from 'react';
import Subscriber from '../subscriber';

export default function useMessenger(args) {
    const [subscribers, setSubscribers] = React.useState([]);

    // 2024-02-24 well this sucks...
    // can call subscribe in use[HookName] but broadcast only works
    // when called in the react component; otherwise, subscribers list
    // is empty...
    // this is why broadcast works in Startup.js, but not in useHeader.js
    // LAME!
    function broadcast(key) {
        //console.log(key, subscribers)

        subscribers.map(x => {
            if (x.subscriptions.hasOwnProperty(key)) {
                const invoke = x.subscriptions[key];
                invoke();
            }
        })
    }

    function subscribe(id, subscriptions) {
        /**
        * WARNING: this is not bulletproof
        * 
        * one duplicate for each ID will go undeteccted, but eventually
        * this will catch on and block remaining dupes. don't know why, but
        * this is better than nothing.
        * 
        * you need this guard clause because without it, some subscriptions
        * will register several times. couldn't figure out a good way to implement
        * subscription otherwise without introducing infinite render loop or
        * no subs at all before startup.
        */
        if (subscribers.find(x => x.id === id)) {
            // console.log(subscribers);
            return;
        }

        const subscriber = new Subscriber({
            id: id,
            subscriptions: subscriptions
        });

        setSubscribers(x => [...x, subscriber]);

        return subscriber;
    }

    return {
        broadcast: broadcast,
        subscribe: subscribe,
    };
}