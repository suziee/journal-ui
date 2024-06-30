import React from 'react';
import './routeList.css';
import {
    useAppData
    , hookNames as NAME
    , subscriptionKeys as SUB
 } from '../../state';

export default function RouteList(props) {
    const {keywordEntries} = useAppData(NAME.useKeyword);
    const { updateRoute } = useAppData(NAME.useRoute);
    const messenger = useAppData(NAME.useMessenger);

    function raiseClickEvent(event) {
        let guid = event.target.getAttribute("data-value");
        let route = keywordEntries.find(x => x.routeGuid == guid);
        updateRoute(route);
        messenger.broadcast(SUB.HIDE_DATE_FORM);
        messenger.broadcast(SUB.HIDE_ROUTE);
        messenger.broadcast(SUB.SHOW_ROUTE_FORM);
    }

    function buildList() {
        if (keywordEntries == null || keywordEntries.length == 0) {
            return;
        }

        return keywordEntries.map((entry, index) => {
            return (
                <li key={`route-list-item-${index}`} data-value={entry.routeGuid} onClick={raiseClickEvent}>
                    {entry.fullName}
                </li>
            );
        });
    }

    return (
        <ul id="keyword-routes">
            {buildList()}
        </ul>
    );
}