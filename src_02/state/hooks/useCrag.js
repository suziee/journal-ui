import React from 'react';
import * as SUB from './subscriptionKeys';
import { useCrag as id } from './hookNames';
import * as API from '../../api/crag';

export default function useCrag(args) {
    const {messenger, client, useFormBase} = args;
    const [crags, setCrags] = React.useState([]);
    const [crag, setCrag] = React.useState(null);

    messenger.subscribe(id, {
        [SUB.STARTUP]: getAll,
        [SUB.ADD_CRAG]: useFormBase.initAddForm,
        [SUB.UPDATE_CRAG]: useFormBase.initUpdateForm,
    });

    async function getAll() {
        const {isSuccessful, json: crags} = await client.callApi(API.getCrags);
        if (isSuccessful) setCrags(x => crags);
    }

    async function add(crag) {
        const {isSuccessful, json: { guid }} = await client.callApi(API.addCrag, crag, true);
        
        if (isSuccessful)
        {
            crag.guid = guid;
            await getAll();
            setCrag(x => crag);
        }

        return isSuccessful;
    }

    async function get(guid) {
        const {isSuccessful, json: crag} = await client.callApi(API.getCrag, guid, true);
        if (isSuccessful) setCrag(x => crag);
    }

    async function update(crag) {
        const {isSuccessful, json: _crag} = await client.callApi(API.updateCrag, crag, true);
        if (isSuccessful) setCrag(x => _crag);
        return isSuccessful;
    }

    return {
        crags: crags,
        crag: crag,
        add: add,
        update: update,
        get: get,
        isAdd: useFormBase.isAddForm,
    }
}