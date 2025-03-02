import React from 'react';
import { useAppData, hookNames as NAME, componentNames as COMP, subscriptionKeys as SUB } from '../../state';
import './journalEntryPage.css';

export function JournalEntryPage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {journalEntry} = useAppData(NAME.useJournalEntry);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const {get: getRoute} = useAppData(NAME.useRoute);
    const {get: getJournalEntryRoute} = useAppData(NAME.useJournalEntryRoute);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.JOURNAL_ENTRY_PAGE));
    }, [current]);

    function raiseAddEvent(event) {
        messenger.broadcast(SUB.ADD_JOURNAL_ENTRY_ROUTE);
        show(COMP.ADD_JOURNAL_ENTRY_ROUTE_FORM);
    }

    function raiseEditEvent(event) {
        show(COMP.EDIT_JOURNAL_ENTRY_FORM);
    }

    async function raiseRouteEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getRoute(guid);
        show(COMP.ROUTE_PAGE);
    }

    function raiseJerEditEvent(event) {
        const guid = event.target.getAttribute("data-value");
        getJournalEntryRoute(guid);
        messenger.broadcast(SUB.UPDATE_JOURNAL_ENTRY_ROUTE);
        show(COMP.EDIT_JOURNAL_ENTRY_ROUTE_FORM);
    }

    function build() {
        if (journalEntry == null) return;

        return <React.Fragment>
            <div className="header">
                <header>
                    Date: {journalEntry.date}
                </header>
                <div className="header-buttons">
                    <span className="material-symbols-outlined size-24 green">photo_camera</span>
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <span className="material-symbols-outlined size-24 red">delete</span>
                </div>
            </div>
            <p>{journalEntry.notes}</p>
            <div id="routes-climbed">
                <header><span className="text-button" onClick={raiseAddEvent}>add</span> Routes climbed:</header>
                <table>
                    <tbody>
                        {journalEntry.routes.map((route, index) => {
                            return <React.Fragment key={index}>
                                <tr className="route-data">
                                    <td className="crumb-nav" data-value={route.routeGuid} onClick={raiseRouteEvent}>{route.routeName}</td>
                                    <td className="light">{route.areaName} / {route.cragName}</td>
                                    <td style={{width: 100}}>{route.grade} {route.type}</td>
                                    <td style={{width: 125}}>{route.pitchesClimbed} / {route.numberOfPitches} pitches</td>
                                    <td style={{width: 75}}>{route.climbType}</td>
                                    <td style={{width: 75}} className="route-buttons">
                                        <span className="text-button" data-value={route.journalEntryRouteGuid} onClick={raiseJerEditEvent}>edit</span>&nbsp;
                                        <span className="text-button red" data-value={route.journalEntryRouteGuid} onClick={raiseJerEditEvent}>delete</span>
                                    </td>
                                </tr>
                                {route.notes ? <tr>
                                    <td colSpan="6" className="route-notes">{route.notes}</td>
                                </tr> : null}
                            </React.Fragment>
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    }

    return (
        <div className={open ? "visible" : "hidden"}>
            {build()}
        </div>
    );
}