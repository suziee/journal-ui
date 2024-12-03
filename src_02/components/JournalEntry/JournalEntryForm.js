import React from 'react';
import { useAppData, hookNames as NAME, componentNames as COMP } from '../../state';
import { getValueOrDefault, setValues, clearValues } from '../shared';

export function JournalEntryForm(props) {
    const {errors} = useAppData(NAME.useError);
    const {add, update, isAdd, journalEntry} = useAppData(NAME.useJournalEntry);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "jef-date", model: "date"},
        {ui: "jef-dir", model: "picturesDirectory"},
        {ui: "jef-notes", model: "notes"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.JOURNAL_ENTRY_FORM));
    }, [current]);

    React.useEffect(() => {
        if (isAdd) {
            clearValues(fieldMap);
        } else if (journalEntry != null) {
            setValues(fieldMap, journalEntry);
        }
    }, [isAdd, journalEntry]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        if (isAdd) clearValues(fieldMap);
        show(COMP.CALENDAR_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            date: getValueOrDefault(event.target.date.value),
            picturesDirectory: getValueOrDefault(event.target.picturesDirectory.value),
            notes: getValueOrDefault(event.target.notes.value),
        };

        if (!isAdd) {
            request = {...request, journalEntryGuid: journalEntry.journalEntryGuid};
        }

        let isSuccessful = isAdd ? await add(request) : await update(request);
        if (isSuccessful) show(COMP.JOURNAL_ENTRY_PAGE);
    }

    return (
        <div className={open ? "form": "hidden"}>
            <header>Add Journal Entry</header>
            <form onSubmit={raiseSubmitEvent}>
                <div>
                    <label>Date:</label>
                    <input name="date" id="jef-date"/>
                </div>
                <div>
                    <label>Pictures Directory:</label>
                    <input name="picturesDirectory" id="jef-dir"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="jef-notes"></textarea>
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
    )
}