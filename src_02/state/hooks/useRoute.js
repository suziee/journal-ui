import React from 'react';
import * as API from '../../api/route';
import * as SUB from './subscriptionKeys';
import { useRoute as id } from './hookNames';

export default function useRoute(args) {
    const {messenger, client, useFormBase} = args;
    const [route, setRoute] = React.useState(null);
    const [routes, setRoutes] = React.useState([]);

    messenger.subscribe(id, {
        [SUB.STARTUP]: getAll,
        [SUB.ADD_ROUTE]: useFormBase.initAddForm,
        [SUB.UPDATE_ROUTE]: useFormBase.initUpdateForm,
    });

    async function getAll() {
        const {isSuccessful, json: routes} = await client.callApi(API.getRoutes);
        if (isSuccessful) setRoutes(x => routes);
    }

    async function add(route) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addRoute, route, true);
        
        if (isSuccessful)
        {
            route.guid = guid;
            await getAll();
            setRoute(x => route);
        }

        return isSuccessful;
    }

    async function get(guid) {
        const {isSuccessful, json: route} = await client.callApi(API.getRoute, guid, true);
        if (isSuccessful) setRoute(x => route);
    }

    async function update(route) {
        const {isSuccessful, json: _route} = await client.callApi(API.updateRoute, route, true);
        if (isSuccessful) setRoute(x => _route);
        return isSuccessful;
    }

    return {
        route: route,
        add: add,
        update: update,
        get: get,
        isAdd: useFormBase.isAddForm,
        routes: routes,
    }
}