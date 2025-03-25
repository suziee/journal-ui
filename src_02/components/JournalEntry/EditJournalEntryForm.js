import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB } from '../../state';
import { getValueOrDefault, setValues } from '../shared';
import { ErrorContainer } from '../ErrorContainer';

export function EditJournalEntryForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {update: updateJournalEntry, journalEntry} = useAppData(NAME.useJournalEntry);
    const {get: getOpen, current} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);
    const [routes, setRoutes] = React.useState([]);

    const fieldMap = [
        {ui: "jef-date-edit", model: "date"},
        {ui: "jef-dir-edit", model: "picturesPath"},
        {ui: "jef-notes-edit", model: "notes"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_JOURNAL_ENTRY_FORM));
    }, [current]);

    React.useEffect(() => {
        setRoutes(x => journalEntry?.routes ?? []);
    }, [journalEntry]);

    React.useEffect(() => {
        if (journalEntry != null) {
            setValues(fieldMap, journalEntry);
        }
    }, [journalEntry]);

    function raiseCancelEvent(event) {
        event.preventDefault();

        journalEntry?.routes.sort((a, b) => {return a.index - b.index});
        setRoutes(x => routes.sort((a, b) => {return a.index - b.index}));
        setValues(fieldMap, journalEntry);

        messenger.broadcast(SUB.CANCEL_UPDATE_JOURNAL_ENTRY);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            date: getValueOrDefault(event.target.date.value),
            picturesPath: getValueOrDefault(event.target.picturesPath.value),
            notes: getValueOrDefault(event.target.notes.value),
            journalEntryGuid: journalEntry.journalEntryGuid,
            routes: routes
        };

        let isSuccessful = await updateJournalEntry(request);
        if (isSuccessful) messenger.broadcast(SUB.UPDATED_JOURNAL_ENTRY);
    }

    function raiseUpEvent(index) {
        if (index == 0) return;
        let temp = routes[index];
        routes[index] = routes[index - 1];
        routes[index - 1] = temp;
        setRoutes(x => [...routes]);
    }

    function raiseDownEvent(index) {
        if (index == routes.length - 1) return;
        let temp = routes[index];
        routes[index] = routes[index + 1];
        routes[index + 1] = temp;
        setRoutes(x => [...routes]);
    }

    return (
        <div className={open ? "form": "hidden"}>
            <header>Edit Journal Entry</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Date:</label>
                    <input name="date" id="jef-date-edit"/>
                </div>
                <div>
                    <label>Pictures Path:</label>
                    <input name="picturesPath" id="jef-dir-edit"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="jef-notes-edit"></textarea>
                </div>
                <div id="edit-sort-routes">
                    <table>
                        <tbody>
                            {routes.map((route, index) => {
                                return <tr key={route.journalEntryRouteGuid}>
                                    <td className="light">{route.sortId}</td>
                                    {/**this is a little hack... the align-items:flex-end works with one or the other, but not both, when they're the first two td's. */}
                                    <td>
                                        <div className="sort-button">
                                            <span className="material-symbols-outlined"
                                                onClick={() => raiseUpEvent(index)}>keyboard_arrow_up</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="sort-button">
                                            <span className="material-symbols-outlined"
                                                onClick={() => raiseDownEvent(index)}>keyboard_arrow_down</span>
                                        </div>
                                    </td>
                                    <td>{route.routeName}</td>
                                    <td className="light">{route.areaName} / {route.cragName}</td>
                                    <td className="light">{route.grade}</td>
                                    <td className="light">{route.type}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="form-buttons">
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
                </div>
            </form>
            <ErrorContainer />
        </div>
    )
}