import React from 'react';
import { useAppData, hookNames as NAME, componentNames as COMP } from '../../state';
import { getValueOrDefault, setValues } from '../shared';

export function EditJournalEntryForm(props) {
    const {errors} = useAppData(NAME.useError);
    const {update, journalEntry} = useAppData(NAME.useJournalEntry);
    const {get: getOpen, current, show} = useAppData(NAME.useOpen);
    const [open, setOpen] = React.useState(false);

    const fieldMap = [
        {ui: "jef-date-edit", model: "date"},
        {ui: "jef-dir-edit", model: "picturesDirectory"},
        {ui: "jef-notes-edit", model: "notes"},
    ];

    React.useEffect(() => {
        setOpen(x => getOpen(COMP.EDIT_JOURNAL_ENTRY_FORM));
    }, [current]);

    React.useEffect(() => {
        if (journalEntry != null) {
            setValues(fieldMap, journalEntry);
        }
    }, [journalEntry]);

    function raiseCancelEvent(event) {
        event.preventDefault();
        show(COMP.JOURNAL_ENTRY_PAGE);
    }

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let request = {   
            date: getValueOrDefault(event.target.date.value),
            picturesDirectory: getValueOrDefault(event.target.picturesDirectory.value),
            notes: getValueOrDefault(event.target.notes.value),
            journalEntryGuid: journalEntry.journalEntryGuid,
        };

        let isSuccessful = await update(request);
        if (isSuccessful) show(COMP.JOURNAL_ENTRY_PAGE);
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
                    <label>Pictures Directory:</label>
                    <input name="picturesDirectory" id="jef-dir-edit"/>
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" id="jef-notes-edit"></textarea>
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