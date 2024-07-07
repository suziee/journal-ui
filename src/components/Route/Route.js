import React from 'react';
import './route.css';
import {
    useAppData
    , hookNames as NAME
	, subscriptionKeys as SUB
} from '../../state';

export default function Route(props) {
	const {selectedRoute, journalEntries, open, updateJournalEntry} = useAppData(NAME.useRoute);
	const messenger = useAppData(NAME.useMessenger);

	React.useEffect(() => {
		if (selectedRoute == null) return;

		messenger.broadcast(SUB.HIDE_DATE_FORM);
        messenger.broadcast(SUB.HIDE_ROUTE_FORM);
	}, [selectedRoute])

	function getHeader() {
		if (selectedRoute == null) {
			return;
		}

		return (
			<div id="route-header">
				<span id="route-crumbs">{selectedRoute.location} / <span id="route-name">{selectedRoute.routeName}</span></span>
				<br/>
				{selectedRoute.routeType}, {selectedRoute.numberOfPitches} pitches, {selectedRoute.bookGrade} (book), {selectedRoute.mountainProjectGrade} (mp)
			</div>
		);
	}

	function raiseEditEvent(event) {
		const guid = event.target.getAttribute("je-guid");
		const entry = journalEntries.find(x => x.journalEntryGuid == guid);
		updateJournalEntry(entry);
		messenger.broadcast(SUB.HIDE_ROUTE_FORM);
		messenger.broadcast(SUB.HIDE_ROUTE);
		messenger.broadcast(SUB.SHOW_DATE_FORM);
		messenger.broadcast(SUB.UPDATE_JOURNAL_ENTRY);
	}

	function getDates() {
		if (journalEntries == null || journalEntries.length == 0) {
			return;
		}

		return journalEntries.map((entry, index) => {
			return (
				<div className="date-entry" key={`date-entry-${index}`}>
					<div className="date">{entry.date}<div className="custom-button" je-guid={entry.journalEntryGuid} onClick={raiseEditEvent}>Edit</div></div>
					<div><b>Pitches:</b> {entry.pitchesClimbed} / {entry.numberOfPitches}</div>
					<div className="notes">
						<b>Notes:</b> {entry.notes}
					</div>
				</div>
			)
		});
	}

	function raiseAddEvent() {
		messenger.broadcast(SUB.HIDE_ROUTE_FORM);
		messenger.broadcast(SUB.HIDE_ROUTE);
		messenger.broadcast(SUB.SHOW_DATE_FORM);
		messenger.broadcast(SUB.ADD_JOURNAL_ENTRY);
	}

    return (
		<div id={open ? "route-container" : "route-container-hidden"}>
			{getHeader()}
			<div className="custom-button big-custom-button" onClick={raiseAddEvent}>
				Add Date Entry
			</div>
			{getDates()}
		</div>
    );
}