import React from 'react';
import { useAppData
    , hookNames as NAME
    , componentNames as COMP
} from '../../state';
import { setValues, getValueOrDefault } from '../shared';

export function EditJournalEntryRouteForm(props) {
    const {update, journalEntryRoute} = useAppData(NAME.useJournalEntryRoute);
    const {errors} = useAppData(NAME.useError);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        // {ui: "ejerf-area", model: "areaName"},
        // {ui: "ejerf-crag", model: "cragName"},
        // {ui: "ejerf-route", model: "routeName"},
        // {ui: "ejerf-date", model: "date"},
        // {ui: "ejerf-dir", model: "picturesPath"},
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
        show(COMP.JOURNAL_ENTRY_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {
            routeGuid: journalEntryRoute.routeGuid,
            journalEntryGuid: journalEntryRoute.journalEntryGuid,
            picturesDirectory: getValueOrDefault(event.target.picturesDirectory.value),
            notes: getValueOrDefault(event.target.notes.value),
            pitchesClimbed: getValueOrDefault(event.target.pitchesClimbed.value),
            sortId: getValueOrDefault(event.target.sortId.value),
            journalEntryRouteGuid: journalEntryRoute.journalEntryRouteGuid,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) show(COMP.ROUTE_PAGE);
    }

    return (
        <div className={open ? "form" : "hidden"}>
            <header>Edit: {journalEntryRoute?.date} / {journalEntryRoute?.areaName} / {journalEntryRoute?.cragName} / {journalEntryRoute?.routeName}</header>
            <form onSubmit={raiseSubmitEvent}>
                {/* <div>
                    <label>Date:</label>
                    <input name="date" id="ejerf-date" disabled/>
                </div> */}
                {/* <div>
                    <label>Crag:</label>
                    <input name="cragName" id="ejerf-crag" disabled/>
                </div>
                <div>
                    <label>Route:</label>
                    <input name="routeName" id="ejerf-route" disabled/>
                </div> */}
                <div>
                    <label>SortId:</label>
                    <input name="sortId" id="ejerf-sortId" disabled/>
                </div>
                <div>
                    <label>Pitches Climbed:</label>
                    <input name="pitchesClimbed" id="ejerf-pitches"/>
                </div>
                {/* <div>
                    <label>Pictures Path:</label>
                    <input name="picturesPath" id="ejerf-dir"/>
                </div> */}
                <div>
                    <label>Climb Type:</label>
                    <input name="climbType" id="ejerf-type"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="ejerf-notes"></textarea>
                </div>
                <div className="form-buttons">
                    <button className="text-button red" onClick={raiseCancelEvent}>cancel</button>
                    <button className="text-button green" type="submit">save</button>
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