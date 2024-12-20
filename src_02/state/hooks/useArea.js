import React from 'react';
import * as SUB from './subscriptionKeys';
import { useArea as id } from './hookNames';
import * as API from '../../api/area';

export default function useArea(args) {
    const {messenger, client} = args;
    const [areas, setAreas] = React.useState([]);
    const [area, setArea] = React.useState(null);

    messenger.subscribe(id, {
        [SUB.STARTUP]: getAll,
    });

    async function getAll() {
        const {isSuccessful, json: areas} = await client.callApi(API.getAreas);
        if (isSuccessful) setAreas(x => areas);
    }

    async function add(area) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addArea, area, true);
        
        if (isSuccessful)
        {
            area.guid = guid;
            await getAll();
            setArea(x => area);
        }

        return isSuccessful;
    }

    async function get(guid) {
        const {isSuccessful, json: area} = await client.callApi(API.getArea, guid, true);
        if (isSuccessful) setArea(x => area);
    }

    async function update(area) {
        const {isSuccessful, json: _area} = await client.callApi(API.updateArea, area, true);
        if (isSuccessful) setArea(x => _area);
        return isSuccessful;
    }

    return {
        areas: areas,
        area: area,
        add: add,
        update: update,
        get: get,
    }
}