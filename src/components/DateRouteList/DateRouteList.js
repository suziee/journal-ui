import React from 'react';
import './dateRouteList.css';
import {
    useAppData,
    hookNames as NAME,
    subscriptionKeys as SUB
} from '../../state';

export default function DateRouteList(props) {
    const { yearEntries } = useAppData(NAME.useCalendar);
    const { updateRoute } = useAppData(NAME.useRoute);
    const messenger = useAppData(NAME.useMessenger);

    function raiseClickEvent(event) {
        let guid = event.target.getAttribute("data-value");
        let route = yearEntries.find(x => x.routeGuid == guid);
        updateRoute(route);
        messenger.broadcast(SUB.HIDE_DATE_FORM);
        messenger.broadcast(SUB.HIDE_ROUTE_FORM);
        messenger.broadcast(SUB.SHOW_ROUTE);
    }

    function buildList() {
        if (yearEntries == null || yearEntries.length == 0) {
            return (
                <div>
                    No results
                </div>
            );
        }

        return yearEntries.map((entry, index) => {
            return (
                <div className="simple-route" key={`simple-route-${index}`}>
                    <div className="simple-route-header" data-value={entry.routeGuid} onClick={raiseClickEvent}>
                        <span className="simple-route-date">
                            {entry.date}
                        </span> {entry.fullName}
                    </div>
                    <div>
                        {entry.notes}
                    </div>
                </div>
            );
        });
    }

    return (
        <React.Fragment>
            {buildList()}
        </React.Fragment>
    );
}