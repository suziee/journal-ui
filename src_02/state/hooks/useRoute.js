import React from 'react';
import * as API from '../../api/route';

export default function useRoute(args) {
    const {client} = args;
    const [route, setRoute] = React.useState(null);

    async function add(route) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addRoute, route, true);
        
        if (isSuccessful)
        {
            route.guid = guid;
            await getAll();
            setRoute(x => route);
        }
    }

    async function get(guid) {
        const {isSuccessful, json: route} = await client.callApi(API.getRoute, guid, true);
        if (isSuccessful) setRoute(x => route);
    }

    async function update(route) {
        const {isSuccessful, json: _route} = await client.callApi(API.updateRoute, route, true);
        if (isSuccessful) setRoute(x => _route);
    }

    return {
        route: route,
        add: add,
        update: update,
        get: get,
    }
}