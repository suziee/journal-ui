import React from 'react';
import {
    useAppData
    , hookNames as NAME
} from '../../state';
import {JournalEntry} from '../../models';

export default function RouteForm(props) {
    const {saveJournalEntry, closeForm, open, errors} = useAppData(NAME.useRouteForm);

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let location = event.target.location.value;
        let locationCrumbs = location.split("/");
        locationCrumbs = locationCrumbs.map(x => x.trim());

        let journalEntry = new JournalEntry({
            locationCrumbs: locationCrumbs,
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
            closeForm();
        }
    }

    function raiseCloseEvent(event) {
        // need to do this or submit event runs
        event.preventDefault();
        closeForm();
    }

    return (
        <form className={open ? "route-form" : "route-form-hidden"} onSubmit={raiseSubmitEvent}>
            <label>Location (Geo-tags):</label>
            <input type="text" name="location"/>
            <label>Route Name:</label>
            <input type="text" name="routeName"/>
            <div>
                <label>Type of Climbing:</label>
                <input type="radio" id="trad" value="trad" name="climb_type"/>
                <label htmlFor="trad">Trad</label>
                <input type="radio" id="sport" value="sport" name="climb_type"/>
                <label htmlFor="sport">Sport</label>
            </div>
            <label>Book Grade:</label>
            <input type="text" name="bookGrade"/>
            <label>Mountain Project Grade:</label>
            <input type="text" name="mountainProjectGrade"/>
            <label>Pitches Climbed:</label>
            <input type="text" name="pitchesClimbed"/>
            <label>Pitches Total:</label>
            <input type="text" name="numberOfPitches"/>
            <label>Date:</label>
            <input type="text" name="date"/>
            <label>Notes:</label>
            <textarea name="notes"></textarea>
            <label>Sort ID:</label>
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