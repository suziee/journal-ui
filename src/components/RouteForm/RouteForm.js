import React from 'react';
import {
    useAppData
    , hookNames as NAME
} from '../../state';
import {JournalEntry} from '../../models';

export default function RouteForm(props) {
    const {saveJournalEntry, closeForm, open, errors} = useAppData(NAME.useRouteForm);
    const {keyword} = useAppData(NAME.useKeyword);
    const messenger = useAppData(NAME.useMessenger);

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let journalEntry = new JournalEntry({
            location: event.target.location.value,
            routeName: event.target.routeName.value,
            routeType: event.target.climb_type.value,
            bookGrade: event.target.bookGrade.value,
            mountainProjectGrade: event.target.mountainProjectGrade.value,
            numberOfPitches: event.target.numberOfPitches.value,
            date: event.target.date.value,
            notes: event.target.notes.value,
            sortId: event.target.sortId.value,
            pitchesClimbed: event.target.pitchesClimbed.value,
        });

        let isSuccessful = await saveJournalEntry(journalEntry);

        if (isSuccessful) {
            if (journalEntry.fullName.includes(keyword)) {
                messenger.broadcast(SUB.REFRESH_KEYWORD_ROUTES);
            }
            closeForm();
        }
    }

    function raiseCloseEvent(event) {
        // need to do this or submit event runs
        event.preventDefault();
        closeForm();
    }

    return (
        <form id="route-form" className={open ? "route-form" : "route-form-hidden"} onSubmit={raiseSubmitEvent}>
            <label><div className="required"></div>Location (Geo-tags):</label>
            <input type="text" name="location"/>
            <label><div className="required"></div>Route Name:</label>
            <input type="text" name="routeName"/>
            <div className="climb-type">
                <label><div className="required"></div>Type of Climbing:</label>
                <input type="radio" id="trad" value="Trad" name="climb_type"/>
                <label htmlFor="trad">Trad</label>
                <input type="radio" id="sport" value="Sport" name="climb_type"/>
                <label htmlFor="sport">Sport</label>
            </div>
            <label><div className="sort-of-required"></div>Book Grade:</label>
            <input type="text" name="bookGrade"/>
            <label><div className="sort-of-required"></div>Mountain Project Grade:</label>
            <input type="text" name="mountainProjectGrade"/>
            <label><div className="required"></div>Pitches Climbed:</label>
            <input type="text" name="pitchesClimbed"/>
            <label><div className="required"></div>Pitches Total:</label>
            <input type="text" name="numberOfPitches"/>
            <label><div className="required"></div>Date:</label>
            <input type="text" name="date"/>
            <label>Notes:</label>
            <textarea name="notes"></textarea>
            <label><div className="required"></div>Sort ID:</label>
            <input type="text" name="sortId"/>
            <label>Approach photos absolute path:</label>
            <input type="text" disabled />
            <div className="form-buttons">
                <button onClick={raiseCloseEvent}>Cancel</button>
                <button type="submit">Save</button>
            </div>
            <ul className="form-errors">
                {errors.map((error, index) => {
                    return <li key={`form-error-${index}`}>{error}</li>
                })}
            </ul>
        </form>
    );
}