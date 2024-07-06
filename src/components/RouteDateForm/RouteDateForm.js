import React from 'react';
import {
    useAppData
    , hookNames as NAME
    , subscriptionKeys as SUB
} from '../../state';
import {JournalEntry} from '../../models';

export default function RouteDateForm(props) {
    const {selectedRoute, updateRoute} = useAppData(NAME.useRoute);
    const {year} = useAppData(NAME.useCalendar);
    const {saveJournalEntry, closeForm, open, errors} = useAppData(NAME.useRouteDateForm);
    const messenger = useAppData(NAME.useMessenger);

    async function raiseSubmitEvent(event) {
        event.preventDefault();

        let journalEntry = new JournalEntry({
            location: selectedRoute.location,
            routeName: selectedRoute.routeName,
            routeType: selectedRoute.routeType,
            bookGrade: selectedRoute.bookGrade,
            mountainProjectGrade: selectedRoute.mountainProjectGrade,
            numberOfPitches: selectedRoute.numberOfPitches,
            date: event.target.date.value,
            notes: event.target.notes.value,
            sortId: event.target.sortId.value,
            pitchesClimbed: event.target.pitchesClimbed.value,
            routeGuid: selectedRoute.routeGuid
        });

        let isSuccessful = await saveJournalEntry(journalEntry);

        if (isSuccessful) {
            // for some reason selectedRoute is null on broadcast
            // messenger.broadcast(SUB.REFRESH_ROUTE);
            // so instead, calling updateRoute in hook to match useRouteForm
            if (year === new Date(journalEntry.date).getFullYear()) {
                messenger.broadcast(SUB.REFRESH_YEAR_ROUTES);
            }
            closeForm();
            messenger.broadcast(SUB.SHOW_ROUTE);
        }
    }

    function raiseCloseEvent(event) {
        event.preventDefault();
        closeForm();
        messenger.broadcast(SUB.SHOW_ROUTE);
    }

    function getForm() {
        if (selectedRoute == null) {
            return;
        }

        return (
            <form className={open ? "route-form" : "route-form-hidden"} onSubmit={raiseSubmitEvent}>
                <label>Location (Geo-tags):</label>
                <input type="text" value={selectedRoute.location} disabled/>
                <label>Route Name:</label>
                <input type="text" value={selectedRoute.routeName} disabled/>
                <label>Type of Climbing:</label>
                <input type="text" value={selectedRoute.routeType} disabled/>
                <label>Book Grade:</label>
                <input type="text" value={selectedRoute.bookGrade} disabled/>
                <label>Mountain Project Grade:</label>
                <input type="text" value={selectedRoute.mountainProjectGrade} disabled/>
                <label>Pitches Climbed:</label>
                <input type="text" name="pitchesClimbed"/>
                <label>Pitches Total:</label>
                <input type="text" value={selectedRoute.numberOfPitches} disabled/>
                <label>Date:</label>
                <input type="text" name="date"/>
                <label>Notes:</label>
                <textarea name="notes"></textarea>
                <label>Sort ID:</label>
                <input type="text" name="sortId"/>
                <label>Approach photos absolute path:</label>
                <input type="text" disabled/>
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

    return getForm();
}

//https://stackoverflow.com/questions/62003832/how-do-i-make-a-form-submission-save-data-in-a-usestate-hook-variable