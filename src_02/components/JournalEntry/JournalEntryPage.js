import React from 'react';
import { useAppData, hookNames as NAME, componentNames as COMP, subscriptionKeys as SUB } from '../../state';
import './journalEntryPage.css';
import { DeleteButton, DeleteIcon } from '../Button';
import { ErrorContainer } from '../ErrorContainer';

export function JournalEntryPage(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {journalEntry, delete: deleteJournalEntry} = useAppData(NAME.useJournalEntry);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const {get: getRoute} = useAppData(NAME.useRoute);
    const {get: getJournalEntryRoute, delete: deleteJournalEntryRoute} = useAppData(NAME.useJournalEntryRoute);
    const {showErrors, initError, showError} = useAppData(NAME.useError);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.JOURNAL_ENTRY_PAGE));
        // See useOpen.getOpen for why this commented code is here
        // console.log(current, getOpen(COMP.JOURNAL_ENTRY_PAGE));
    }, [current]);

    React.useEffect(() => {
        if (journalEntry) {
            initError(journalEntry.journalEntryGuid);
            journalEntry.routes.map((route, index) => {
                initError(route.journalEntryRouteGuid);
            });
        }
    }, [journalEntry]);

    function raiseAddEvent(event) {
        messenger.broadcast(SUB.ADD_JOURNAL_ENTRY_ROUTE);
    }

    function raiseEditEvent(event) {
        messenger.broadcast(SUB.UPDATE_JOURNAL_ENTRY);
    }

    async function raiseRouteEvent(event) {
        const guid = event.target.getAttribute("data-value");
        await getRoute(guid);
        messenger.broadcast(SUB.SHOW_ROUTE);
    }

    function raiseJerEditEvent(event) {
        const guid = event.target.getAttribute("data-value");
        getJournalEntryRoute(guid);
        messenger.broadcast(SUB.UPDATE_JOURNAL_ENTRY_ROUTE);
    }

    async function raiseJerDeleteEvent(event) {
        const jerGuid = event.target.getAttribute("data-value");
        showError(jerGuid);
        await deleteJournalEntryRoute(journalEntry.journalEntryGuid, jerGuid);
    }

    async function raiseDeleteEvent(event) {
        showError(journalEntry.journalEntryGuid);
        const isSuccessful = await deleteJournalEntry(journalEntry.journalEntryGuid);
        if (isSuccessful) messenger.broadcast(SUB.DELETED_JOURNAL_ENTRY);
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
                    <DeleteIcon parentType={COMP.JOURNAL_ENTRY_PAGE} eventHandler={raiseDeleteEvent} />
                </div>
            </div>
            {showErrors != null && showErrors[journalEntry.journalEntryGuid] ? <ErrorContainer /> : null}
            <p className="preserved-text">{journalEntry.notes}</p>
            <div id="routes-climbed">
                <header><span className="text-button add" onClick={raiseAddEvent}>add</span> Routes climbed:</header>
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
                                        <span className="text-button edit" data-value={route.journalEntryRouteGuid} onClick={raiseJerEditEvent}>edit</span>&nbsp;
                                        <DeleteButton parentType={COMP.JOURNAL_ENTRY_PAGE} eventHandler={raiseJerDeleteEvent} dataValue={route.journalEntryRouteGuid} />
                                    </td>
                                </tr>
                                {route.notes ? <tr>
                                    <td colSpan="6" className="route-notes preserved-text">{route.notes}</td>
                                </tr> : null}
                                {showErrors != null && showErrors[route.journalEntryRouteGuid] ? <tr>
                                    <td colSpan="6" className="base-errors"><ErrorContainer isPlainText="true"/></td>
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