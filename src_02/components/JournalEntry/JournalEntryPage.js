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
                    <span className="material-symbols-outlined size-24 green" onClick={raiseEditEvent}>edit</span>
                    <span className="material-symbols-outlined size-24 red">delete</span>
                </div>
            </div>
            <p>{journalEntry.notes}</p>
            <div id="routes-climbed">
                <header><span className="text-button" onClick={raiseAddEvent}>add</span> Routes climbed:</header>
                <table>
                    <colgroup>
                        <col span="1" width="225px" />
                        <col span="1" />
                        <col span="1" width="10px" />
                    </colgroup>
                    <tbody>
                        {journalEntry.routes.map((route, index) => {
                            return <tr key={route.journalEntryRouteGuid}>
                                <td>
                                    <table className="unstyled">
                                        <tbody>
                                            <tr><td className="unstyled crumb-nav" data-value={route.routeGuid} onClick={raiseRouteEvent}>{route.routeName}</td></tr>
                                            <tr><td className="unstyled light">{route.areaName} / {route.cragName}</td></tr>
                                            <tr><td className="unstyled">{route.grade} {route.type}</td></tr>
                                            <tr><td className="unstyled">{route.pitchesClimbed} / {route.numberOfPitches} pitches</td></tr>
                                        </tbody>
                                    </table>
                                </td>                                
                                <td>{route.notes}</td>
                                <td>
                                    <div className="route-buttons light">
                                        <span className="material-symbols-outlined size-24 green">photo_camera</span>
                                        <span className="material-symbols-outlined size-24 green" data-value={route.journalEntryRouteGuid} onClick={raiseJerEditEvent}>edit</span>
                                        <span className="material-symbols-outlined size-24 red">delete</span>
                                    </div>
                                </td>
                            </tr>
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