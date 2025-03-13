import React from 'react';
import { useAppData, hookNames as NAME, componentNames as COMP } from '../../state';
import { getValueOrDefault, clearValues, getControlledValue } from '../shared';

export function AddJournalEntryForm(props) {
    const {errors} = useAppData(NAME.useError);
    const {add} = useAppData(NAME.useJournalEntry);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const {date} = useAppData(NAME.useCalendar);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "jef-date", model: "date"},
        {ui: "jef-dir", model: "picturesPath"},
        {ui: "jef-notes", model: "notes"},
    ];

    React.useEffect(() => {
        let active = getOpen(COMP.ADD_JOURNAL_ENTRY_FORM);
        setOpen(x => active);
        if (active) {
            clearValues(fieldMap);
        }
    }, [current]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        clearValues(fieldMap);
        show(COMP.CALENDAR_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            date: getValueOrDefault(event.target.date.value),
            picturesPath: getValueOrDefault(event.target.picturesPath.value),
            notes: getValueOrDefault(event.target.notes.value),
        };

        let isSuccessful = await add(request);
        if (isSuccessful) show(COMP.JOURNAL_ENTRY_PAGE);
    }

    return (
        <div className={open ? "form": "hidden"}>
            <header>Add Journal Entry</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Date:</label>
                    <input name="date" id="jef-date" value={getControlledValue(date)} disabled/>
                </div>
                <div>
                    <label>Pictures Path:</label>
                    <input name="picturesPath" id="jef-dir"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="jef-notes"></textarea>
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
    )
}