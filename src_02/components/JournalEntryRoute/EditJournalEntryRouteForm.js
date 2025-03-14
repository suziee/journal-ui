import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
    , subscriptionKeys as SUB
} from '../../state';
import { setValues, getValueOrDefault } from '../shared';

export function EditJournalEntryRouteForm(props) {
    const messenger = useAppData(NAME.useMessenger);
    const {update, journalEntryRoute} = useAppData(NAME.useJournalEntryRoute);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "ejerf-notes", model: "notes"},
        {ui: "ejerf-pitches", model: "pitchesClimbed"},
        {ui: "ejerf-sortId", model: "sortId"},
        {ui: "ejerf-type", model: "climbType"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_JOURNAL_ENTRY_ROUTE_FORM));
    }, [current]);

    React.useEffect(() => {
        if (journalEntryRoute != null) {
            setValues(fieldMap, journalEntryRoute);
        }
    }, [journalEntryRoute])

    function raiseCancelEvent(event) {
        event.preventDefault();
        setValues(fieldMap, journalEntryRoute);
        messenger.broadcast(SUB.CANCEL_UPDATE_JOURNAL_ENTRY_ROUTE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            routeGuid: journalEntryRoute.routeGuid,
            journalEntryGuid: journalEntryRoute.journalEntryGuid,
            notes: getValueOrDefault(event.target.notes.value),
            pitchesClimbed: getValueOrDefault(event.target.pitchesClimbed.value),
            sortId: getValueOrDefault(event.target.sortId.value),
            journalEntryRouteGuid: journalEntryRoute.journalEntryRouteGuid,
            climbType: getValueOrDefault(event.target.climbType.value),
        };

        let isSuccessful = await update(request);
        if (isSuccessful) messenger.broadcast(SUB.UPDATED_JOURNAL_ENTRY_ROUTE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Edit: {journalEntryRoute?.date} / {journalEntryRoute?.areaName} / {journalEntryRoute?.cragName} / {journalEntryRoute?.routeName}</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>SortId:</label>
                    <input name="sortId" id="ejerf-sortId" disabled/>
                </div>
                <div>
                    <label>Pitches Climbed:</label>
                    <input name="pitchesClimbed" id="ejerf-pitches"/>
                </div>
                <div>
                    <label>Climb Type:</label>
                    <input name="climbType" id="ejerf-type"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="ejerf-notes"></textarea>
                </div>
                <div className="form-buttons">
                    <button className="text-button cancel" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button save" type="submit">save</button>
                </div>
            </form>
            <ul className="form-errors">
                {errors.map((error, index) => {
                    return <li key={`form-error-${index}`}>{error}</li>
                })}
            </ul>
        </div>
    );
}